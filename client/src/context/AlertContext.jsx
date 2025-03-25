import { CircleAlert, CircleCheck, CircleX } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

const ALERT_TYPES = {
  success: {
    bgColor: "bg-success",
    icon: CircleCheck,
    textColor: "text-success-content",
  },
  error: {
    bgColor: "bg-danger",
    icon: CircleX,
    textColor: "text-danger-content",
  },
  info: {
    bgColor: "bg-info",
    icon: CircleAlert,
    textColor: "text-info-content",
  },
};

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    type: "info",
    message: "",
    isVisible: false,
  });

  const showAlert = (type = "info", message = "") => {
    setAlert({
      type,
      message,
      isVisible: true,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Alert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

const Alert = ({ type = "info", message, isVisible, onClose }) => {
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const { icon: Icon, textColor } = ALERT_TYPES[type];

  return (
    <div
      role="alert"
      className={`absolute top-4 right-4 w-72 alert transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <Icon className={`w-6 h-6 font-bold ${textColor}`} />
      <span>{message}</span>
    </div>
  );
};

export default Alert;
