import { BellIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface NotificationProps {
  messages: { content: string; read: boolean }[];
}

const NotificationButton: React.FC<NotificationProps> = ({ messages }) => {
  const [notifications, setNotifications] = useState(messages);

  const handleNotificationClick = () => {
    // Menandai semua pesan sebagai sudah dibaca
    const updatedNotifications = notifications.map((msg) => ({
      ...msg,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Hitung jumlah pesan yang belum dibaca
  const unreadCount = notifications.filter((msg) => !msg.read).length;

  return (
    <div className="relative inline-block ml-2 float-right">
      {/* Tombol Notifikasi */}
      {!unreadCount ? (
        <div className="text-gray-500 text-sm flex justify-center items-center mt-1">
          <EyeIcon className="h-4 w-4 mr-1" />
          <span>Terbaca</span>
        </div>
      ) : (
        <button
          onClick={handleNotificationClick}
          className="relative p-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-full shadow-lg hover:from-yellow-500 hover:to-red-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <BellIcon className="h-6 w-6" /> {/* Ikon lonceng */}
          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-600 text-white rounded-full text-xs font-bold">
            {unreadCount}
          </span>
        </button>
      )}
    </div>
  );
};

export default NotificationButton;


