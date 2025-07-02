"use client";

import { toast } from "sonner";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useRef, ElementRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ChatMessage {
    type: string;
    id: string;
    message: string;
    sender: string;
    cardId?: string;
    userId?: string;
    time: Date | string;
    profileImageUrl?: string;
}

interface DescriptionProps {
    data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
    const historyChat = data.messages.map((msg) => ({
        ...msg,
        type: "message",
    }));
    const params = useParams();
    const queryClient = useQueryClient();
    const { user } = useUser();

    const [isEditing, setIsEditing] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(historyChat || []);
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState<File | null>(data.file ? data.file[0] : null);
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editingMessageText, setEditingMessageText] = useState("");

    const formRef = useRef<ElementRef<"form">>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    useEffect(() => {
        const ws = new WebSocket("wss://koperasicks.store/ws");

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = (event) => {
            let messageReceived = JSON.parse(event.data);
            if (messageReceived.type === "message") {
                setMessages((prevMessages) => [...prevMessages, messageReceived]);
                updateMessageReadAdmin(messageReceived.id);
            } else if (messageReceived.type === "delete" && messageReceived.cardId === data.id) {
                setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageReceived.messageId));
            } else if (messageReceived.type === "update" && messageReceived.cardId === data.id && messageReceived.authorId !== user?.id) {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) => (msg.id === messageReceived.messageId ? { ...msg, message: messageReceived.message } : msg))
                );
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();
        };
    }, [data.id, user?.id]);

    const updateMessageReadAdmin = async (messageId: string) => {
        await fetch(`/api/message/readAdmin/${messageId}`, {
            method: "PUT",
        });
    };

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, FieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });
            toast.success(`Card \"${data.title}\" updated`);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({
            id: data.id,
            description,
            boardId,
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            saveFileDB(uploadedFile);
            setFile(uploadedFile);
        }
    };

    const saveFileDB = async (file: File) => {
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("url", file);
        formData.append("type", file.type);
        formData.append("cardId", data.id);

        try {
            const response = await fetch("/api/file", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error saving file to DB:", error);
        }
    };

    const downloadFile = () => {
        if (file instanceof File) {
            const url = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
        } else if (data.file) {
            const url = (data.file[0] as any).url;
            const a = document.createElement("a");
            a.href = `${process.env.BASE_URL}${url}`;
            a.download = data.file[0].name;
            a.click();
        } else {
            console.error("Invalid file object");
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "" || !user) return;

        const timestamp = new Date().toISOString();

        const message: ChatMessage = {
            id: "", // Temporary id, will be replaced by the id from the database
            message: newMessage,
            sender: user.fullName || "Anonymous",
            time: timestamp,
            profileImageUrl: user.imageUrl || "",
            cardId: data.id,
            userId: user.id,
            type: "message",
        };

        try {
            const savedMessage = await sendMessageDB(message);
            if (!savedMessage) throw new Error("Failed to save message to DB");
            message.id = savedMessage.id;

            const ws = new WebSocket("wss://koperasicks.store/ws");
            ws.onopen = () => {
                ws.send(JSON.stringify(message));
                ws.close();
            };

            setNewMessage("");

            const notification = {
                type: "notification",
                messageId: savedMessage.id,
                cardId: data.id,
                userReadId: user.id,
            };

            const wsNotification = new WebSocket("wss://koperasicks.store/ws");
            wsNotification.onopen = () => {
                wsNotification.send(JSON.stringify(notification));
                wsNotification.close();
            };

            await notificationDB(notification);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const sendMessageDB = async (messageToDB: ChatMessage) => {
        try {
            const response = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageToDB),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error saving message to DB:", error);
        }
    };

    const notificationDB = async (notification: any) => {
        try {
            const response = await fetch("/api/message/notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(notification),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error saving notification to DB:", error);
        }
    };

    const handleEditMessage = async (id: string, text: string) => {
        try {
            const updatedMessageWS = {
                type: "update",
                messageId: id,
                message: text,
                cardId: data.id,
                authorId: user?.id,
            };

            //kirim ke ws
            try {
                const ws = new WebSocket("wss://koperasicks.store/ws");
                ws.onopen = () => {
                    ws.send(JSON.stringify(updatedMessageWS));
                    ws.close();
                };
            } catch (error) {
                console.error("Error sending message:", error);
            }

            // Update pesan di database melalui API
            const response = await fetch(`/api/message/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedMessage = await response.json();

            // Update state messages dengan data terbaru
            setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === updatedMessage.id ? { ...msg, message: updatedMessage.message } : msg)));

            // Reset editing state
            setEditingMessageId(null);
            setEditingMessageText("");
        } catch (error) {
            console.error("Error updating message:", error);
        }
    };

    const handleDeleteMessage = async (id: string) => {
        const updatedMessages = messages.filter((msg) => msg.id !== id);
        setMessages(updatedMessages);

        const ws = new WebSocket("wss://koperasicks.store/ws");
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "delete", messageId: id, cardId: data.id }));
            ws.close();
        };

        await deleteMessageDB(id);
    };

    async function deleteMessageDB(id: string): Promise<void> {
        await fetch(`/api/message/delete/${id}`, {
            method: "DELETE",
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-x-3 w-full">
                <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
                <div className="w-full">
                    <p className="font-semibold text-neutral-700 mb-2">Description</p>
                    {isEditing ? (
                        <form action={onSubmit} ref={formRef} className="space-y-2">
                            <FormTextarea
                                id="description"
                                className="w-full mt-2"
                                placeholder="Add a more detailed description"
                                defaultValue={data.description || undefined}
                                errors={FieldErrors}
                                ref={textareaRef}
                            />
                            <div className="flex items-center gap-x-2">
                                <FormSubmit className="bg-blue-500 text-white hover:bg-blue-600 transition">Save</FormSubmit>
                                <Button className="bg-gray-500 text-white hover:bg-gray-600 transition" onClick={disableEditing}>
                                    Cancel
                                </Button>
                            </div>
                            <input type="file" id="file-upload" onChange={handleFileUpload} />
                            {file && (
                                <div className="flex justify-between mt-2">
                                    <p>{file.name}</p>
                                    <div className="flex items-center gap-x-1">
                                        <Button
                                            className="bg-red-500 text-white hover:bg-green-600 transition"
                                            onClick={() => {
                                                document.getElementById("file-upload")?.setAttribute("type", "text");
                                                document.getElementById("file-upload")?.setAttribute("type", "file");
                                                setFile(null);
                                            }}>
                                            Hapus
                                        </Button>
                                        <Button className="bg-green-500 text-white hover:bg-green-600 transition" onClick={downloadFile}>
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    ) : (
                        <div
                            onClick={enableEditing}
                            role="button"
                            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md cursor-pointer">
                            {data.description || "Add a more detailed description..."}
                        </div>
                    )}
                </div>
            </div>

            <div className="ml-7 flex flex-col">
                <ReactQuill theme="snow" value={newMessage} onChange={setNewMessage} className="h-32" />
                <br />
                <br />
                <Button className="bg-blue-500 text-white hover:bg-blue-600 transition mt-2" onClick={handleSendMessage}>
                    Send
                </Button>
                <div className="mt-4 mb-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={"flex items gap-2 mb-2 justify-end"}>
                            {msg.sender === user?.fullName && (
                                <>
                                    <div className="flex justify-start items-center space-x-4 w-full">
                                        {/* Profile image */}
                                        <Image
                                            src={
                                                msg.profileImageUrl ||
                                                "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9"
                                            } // Use default if no profile image
                                            alt={`${msg.sender}'s profile`}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                            onError={(e) =>
                                                (e.currentTarget.src =
                                                    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9")
                                            } // Fallback to default if image fails to load
                                        />
                                        {/* Content container */}

                                        {editingMessageId === msg.id ? (
                                            <>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={editingMessageText}
                                                    onChange={(val) => {
                                                        setEditingMessageText(val);
                                                    }}
                                                    className="h-20"
                                                />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <Button
                                                    className="bg-blue-500 text-white hover:bg-blue-600 transition"
                                                    onClick={() => handleEditMessage(msg.id, editingMessageText)}>
                                                    Save
                                                </Button>
                                                <Button
                                                    className="bg-gray-500 text-white hover:bg-gray-600 transition"
                                                    onClick={() => {
                                                        setEditingMessageId(null);
                                                        setEditingMessageText("");
                                                    }}>
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-gray-100 p-3 rounded-lg w-full text-left">
                                                    <p className="font-semibold">{msg.sender}</p> {/* Display sender name */}
                                                    <div dangerouslySetInnerHTML={{ __html: msg.message }}></div> {/* Display message */}
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(msg.time).toLocaleString()} {/* Display time */}
                                                    </p>
                                                </div>
                                                {/* Buttons */}
                                                <div className="flex flex-col space-y-1">
                                                    <Button
                                                        className="bg-yellow-500 text-white hover:bg-yellow-600 transition text-xs py-1 px-2"
                                                        onClick={() => {
                                                            setEditingMessageId(msg.id);
                                                            setEditingMessageText(msg.message);
                                                        }}>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="bg-red-500 text-white hover:bg-red-600 transition text-xs py-1 px-2"
                                                        onClick={() => handleDeleteMessage(msg.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            {msg.sender != user?.fullName && (
                                <>
                                    <div className="flex justify-end items-center space-x-4">
                                        {/* Content container */}
                                        <div className="bg-gray-100 p-3 rounded-lg w-full text-left">
                                            <p className="font-semibold">{msg.sender}</p> {/* Display sender name */}
                                            <div className="text-left" dangerouslySetInnerHTML={{ __html: msg.message }} /> {/* Display message */}
                                            <p className="text-sm text-gray-500">
                                                {new Date(msg.time).toLocaleString()} {/* Display time */}
                                            </p>
                                        </div>
                                        {/* Profile image */}
                                        <Image
                                            src={
                                                msg.profileImageUrl ||
                                                "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9"
                                            } // Use default if no profile image
                                            alt={`${msg.sender}'s profile`}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                            onError={(e) =>
                                                (e.currentTarget.src =
                                                    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9")
                                            } // Fallback to default if image fails to load
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-[78px] bg-neutral-200" />
            </div>
        </div>
    );
};
