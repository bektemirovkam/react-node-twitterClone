import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStylesHeaderFeed = makeStyles((theme: Theme) =>
  createStyles({
    headerFeedWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    headerFeedTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 52,
      padding: "0px 15px",
      "& span": {
        fontSize: 20,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
      },
    },
    headerFeedContent: {
      borderRight: "none",
      borderLeft: "none",
      padding: "10px 15px",
    },
    goBackBtn: {
      marginRight: 20
    }
  })
);

interface HeaderFeedProps {
  title: "Последние твиты" | "Уведомления" | "Сообщения" | "Твитнуть";
  goBack?: boolean;
  Icon?: React.FC;
  onClickIcon?: () => void;
  goBackHandler?: () => void;
  children?: React.ReactElement;
}

export const HeaderFeed: React.FC<HeaderFeedProps> = ({
  title,
  Icon,
  onClickIcon,
  children,
  goBack,
  goBackHandler,
}) => {
  const classes = useStylesHeaderFeed();
  return (
    <div className={classes.headerFeedWrapper}>
      <div className={classes.headerFeedTop}>
        <span>
          {goBack && (
            <IconButton onClick={goBackHandler} color="primary" className={classes.goBackBtn}>
              <ArrowBackIcon />
            </IconButton>
          )}
          {title}
        </span>
        {Icon && (
          <IconButton color="primary" onClick={onClickIcon}>
            <Icon />
          </IconButton>
        )}
      </div>
      {children && (
        <Paper variant="outlined" className={classes.headerFeedContent} square>
          {children}
        </Paper>
      )}
    </div>
  );
};
