import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TwitterIcon from "@material-ui/icons/Twitter";

import DialogContent from "@material-ui/core/DialogContent";

interface LoginModalProps {
  handleClose: () => void;
  visible?: boolean;
  children?: React.ReactElement;
  title: string;
  fontSizeTitle?: number;
  fontSizeIcon?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  handleClose,
  visible = false,
  children,
  title,
  fontSizeIcon = "8vh",
  fontSizeTitle = 32,
}): React.ReactElement => {
  return (
    <Dialog onClose={handleClose} open={visible}>
      <DialogContent style={{ position: "relative" }}>
        <TwitterIcon style={{ color: "#1da1f2", fontSize: fontSizeIcon }} />
      </DialogContent>
      <DialogTitle id="simple-dialog-title">
        <b style={{ fontSize: fontSizeTitle }}>{title}</b>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default LoginModal;
