"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import React, { use, useEffect, useState } from "react";
import Notification from "../../../../../../components/modals/card-modal/notifications";
import { useUser } from "@clerk/nextjs";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  useEffect(() => {
    const getNotificationByCardId = async () => {
      try {
        const response = await fetch(
          `/api/message/notification/getByCardId/${data.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const notificationsData = await response.json();
        setNotifications(
          notificationsData.map((notif: any) => ({
            ...notif,
            type: "message",
          }))
        );
        localStorage.setItem(
          "notifications",
          JSON.stringify(notificationsData)
        );
      } catch (error) {
        console.error("Failed to update message:", error);
      }
    };

    getNotificationByCardId();
  }, [data.id, data.title]);

  const { user } = useUser();

  const cardModal = useCardModal();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isCardOpened, setIsCardOpened] = useState(false);

  useEffect(() => {
    if (cardModal.isOpen) {
      setIsCardOpened(true);
    }
  }, [cardModal.isOpen]);

  useEffect(() => {
    const ws = new WebSocket("wss://koperasicks.store/ws");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const userReadId = message.userReadId
        ? message.userReadId.split(",")
        : [];

      if (
        message.type === "notification" &&
        message.cardId === data.id &&
        !userReadId.includes(user?.id)
      ) {
        const notifications = JSON.parse(
          localStorage.getItem("notifications") || "[]"
        );
        notifications.push(message);
        localStorage.setItem("notifications", JSON.stringify(notifications));

        if (!cardModal.isOpen) {
          setNotifications(notifications);
        }
      }
    };

	ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [data.id, cardModal.isOpen, user?.id]);

  const handleClearNotifications = () => {
    const storedNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    console.log("storedNotifications", storedNotifications);

    const updatedNotifications = storedNotifications.map(
      (notification: any) => {
        if (notification.cardId === data.id) {
          const userReadId = notification.userReadId;
          const userReadIdArray = userReadId.split(",");
          if (!userReadIdArray.includes(user?.id)) {
            userReadIdArray.push(user?.id);
            console.log("userReadIdArray", userReadIdArray);
            updatedNotificationDB(notification.messageId);
          }
          notification.userReadId = userReadIdArray.join(",");
        }
        return notification;
      }
    );
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications);
  };

  const updatedNotificationDB = async (messageId: string) => {
    const response = await fetch(`/api/message/notification/${messageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const updatedNotification = await response.json();
      console.log("updatedNotification", updatedNotification);
    }
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => {
            cardModal.onOpen(data.id), handleClearNotifications();
          }}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
          {notifications.length > 0 && (
            <Notification
              messages={notifications.filter(
                (notification) =>
                  notification.cardId === data.id &&
                  !notification.userReadId.split(",").includes(user?.id)
              )}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};
