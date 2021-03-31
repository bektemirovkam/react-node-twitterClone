import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import RepeatIcon from "@material-ui/icons/RepeatOutlined";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import RepostIcon from "@material-ui/icons/AssessmentOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TweetInterface } from "../store/ducks/tweets/contracts/state";
import { Tweet } from "./Tweet";

interface TweetProps {
  tweet: TweetInterface;
}

export const useStylesTweet = makeStyles((theme: Theme) =>
  createStyles({
    tweetWrapper: {
      cursor: "pointer",
      transition: "background-color 0.2s ease-in-out",
      padding: "5px 15px",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.03)",
      },
      "& a": {
        color: "inherit",
        textDecoration: "none",
      },
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    profileLink: {
      padding: 3,
    },
    tweetHead: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 10,
    },
    tweetHeadContent: {
      display: "flex",
      alignItems: "center",
      "& b": {
        display: "flex",
        alignItems: "center",
        marginRight: 5,
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
    tweetLink: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      color: "#000",
      fontSize: 15,
      marginLeft: 10,
    },
    moreBtn: {
      height: 30,
      transition: "background-color 0.2s ease-in-out",
      padding: 3,
      "&:hover": {
        backgroundColor: "rgba(29, 161, 242, 0.1)",
        "& svg": {
          "& path": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    tweetFooter: {
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      marginTop: 10,
      paddingTop: 4,
      display: "flex",
      justifyContent: "space-around",
    },
    tweetCounters: {
      display: "flex",
      alignItems: "center",
      marginTop: 10,
      paddingTop: 10,
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    },
    tweetCounter: {
      paddingRight: 20,
      "& span": {
        fontWeight: 900,
        color: "#000",
      },
    },
    tweetInfo: {
      "& span": {
        paddingRight: 4,
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
    tweetText: {
      fontSize: 26,
    },
    actionTweet: {
      transition: "background-color 0.2s ease-in-out",
      "&:hover": {
        "& button": {
          backgroundColor: "rgba(29, 161, 242, 0.1)",
          "& svg": {
            "& path": {
              color: theme.palette.primary.main,
            },
          },
        },
        "& span": {
          color: theme.palette.primary.main,
        },
      },
      "& button": {
        padding: 10,
        fontSize: 23,
      },
    },
  })
);

export const FullTweet: React.FC<TweetProps> = ({ tweet }) => {
  const classes = useStylesTweet();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Paper className={classes.tweetWrapper} variant="outlined" square>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className={classes.tweetHead}>
            <div className={classes.tweetHeadContent}>
              <IconButton className={classes.profileLink}>
                <div data-to={`/${tweet.user.fullname}`}>
                  <Avatar
                    className={classes.avatar}
                    src={
                      tweet.user.avatarSrc
                        ? tweet.user.avatarSrc
                        : "https://twitter.com/03EvVLcOEDvg8fL/photo"
                    }
                  />
                </div>
              </IconButton>
              <div
                data-to={`/${tweet.user.fullname}`}
                className={classes.tweetLink}
              >
                <b>
                  {tweet.user.fullname}{" "}
                  {true && (
                    <CheckCircleIcon
                      color="primary"
                      fontSize="inherit"
                      style={{ marginLeft: 3 }}
                    />
                  )}
                </b>
                <Typography
                  color="textSecondary"
                  style={{ marginRight: 5, fontSize: 15 }}
                >
                  {tweet.user.username}
                </Typography>
              </div>
            </div>
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.moreBtn}
              >
                <MoreHorizIcon color="action" />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                <MenuItem onClick={handleClose}>Удалить</MenuItem>
              </Menu>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.tweetText}>
            {tweet.text}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.tweetInfo}
          >
            <span>3:50 PM · 11 мар. 2021 г.</span>·<span> TargetingS</span>
          </Typography>
          <div className={classes.tweetCounters}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.tweetCounter}
            >
              <span>3</span> ретвита
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.tweetCounter}
            >
              <span>1</span> Цитировать твит
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.tweetCounter}
            >
              <span>41</span> отметка «Нравится»
            </Typography>
          </div>
          <div className={classes.tweetFooter}>
            <div className={classes.actionTweet}>
              <IconButton>
                <CommentIcon fontSize="inherit" />
              </IconButton>
            </div>
            <div className={classes.actionTweet}>
              <IconButton>
                <RepeatIcon fontSize="inherit" />
              </IconButton>
            </div>
            <div className={classes.actionTweet}>
              <IconButton>
                <LikeIcon fontSize="inherit" />
              </IconButton>
            </div>
            <div className={classes.actionTweet}>
              <IconButton>
                <RepostIcon fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
    <Tweet
        tweet={{
          _id: "6049f26534a14d091450c5c3",
          text: "sadad",
          user: {
            username: "Kama",
            fullname: "Kamil",
          },
          createdAt: "2021-03-11T10:35:17.014Z",
          updatedAt: "2021-03-11T10:35:17.014Z",
        }}
      />
    </>
  );
};
