"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { ElementRef, useEffect, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";
import { useAuth } from "@clerk/nextjs";

interface ListItemProps {
    data: ListWithCards;
    index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const [isEditing, setIsEditing] = useState(false);
    const { orgRole } = useAuth();
    const [loadingCardMembersLoading, setLoadingCardMembersLoading] = useState(true);
    const [cardMembers, setCardMembers] = useState<string[]>([]);

    const disabledEditing = () => {
        setIsEditing(false);
    };

    const enabledEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    useEffect(() => {
        loadCardMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCardMembers = async () => {
        setLoadingCardMembersLoading(true);

        fetch(`/api/access-cards`)
            .then((res) => res.json())
            .then((response) => {
                const cardIds = response.map((e: any) => e.cardId);
                setCardMembers(cardIds);
            })
            .finally(() => {
                setLoadingCardMembersLoading(false);
            });
    };

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li {...provided.draggableProps} ref={provided.innerRef} className="shrink-0 h-full w-[272px] select-none">
                    <div {...provided.dragHandleProps} className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                        <ListHeader onAddCard={enabledEditing} data={data} />
                        <Droppable droppableId={data.id} type="card">
                            {(provided) => (
                                <ol
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards.length > 0 ? "mt-2" : "mt-0")}>
                                    {!loadingCardMembersLoading ? (
                                        <>
                                            {data.cards
                                                .filter((card, index) => {
                                                    return cardMembers.includes(card.id) || orgRole?.includes("admin");
                                                })
                                                .map((card, index) => (
                                                    <CardItem index={index} key={card.id} data={card} />
                                                ))}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        {orgRole?.includes("admin") ? (
                            <CardForm
                                listId={data.id}
                                ref={textareaRef}
                                isEditing={isEditing}
                                enabledEditing={enabledEditing}
                                disabledEditing={disabledEditing}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </li>
            )}
        </Draggable>
    );
};
