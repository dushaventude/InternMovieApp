// src/contexts/NotificationContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import Notification from "../components/atoms/Notification/Notification";

interface NotificationContextProps {
  showNotification: (
    message: string,
    type?: "success" | "error" | "info"
  ) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showNotification = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setNotification({ message, type });
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="notification-container">
          <Notification
            message={notification.message}
            type={notification.type}
          />
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (p0: string, p1: string): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
