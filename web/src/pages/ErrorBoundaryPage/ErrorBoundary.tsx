import React, { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setError(event.error);
      event.preventDefault();
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong.</h2>
        <p>{error.message || "An unexpected error occurred."}</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
