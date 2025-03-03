// src/components/atoms/Notification/Notification.tsx
import React from "react";
import "./Notification.scss";

export interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "success",
}) => {
  return (
    <div className={`notification notification-${type} show`}>
      {type === "success" && <span>✔️</span>}
      {type === "error" && <span>❌</span>}
      {type === "info" && <span>ℹ️</span>}
      {message}
    </div>
  );
};

export default Notification;
