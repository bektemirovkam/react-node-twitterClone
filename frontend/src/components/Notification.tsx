import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import Alert, { Color } from "@material-ui/lab/Alert/Alert";

interface NotificationProps {
  children: (
    callback: (config: INotificationConfig) => void
  ) => React.ReactElement;
}

export interface INotificationConfig {
  text: string;
  type: Color;
}

export const Notification: React.FC<NotificationProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [
    notificationConfig,
    setNotificationConfig,
  ] = React.useState<INotificationConfig>();

  const handleClose = () => {
    setOpen(false);
  };

  const openNotification = (config: INotificationConfig) => {
      setOpen(true)
    setNotificationConfig(config);
  };

  return (
    <>
      {children(openNotification)}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notificationConfig?.type}>
          {notificationConfig?.text}
        </Alert>
      </Snackbar>
    </>
  );
};
