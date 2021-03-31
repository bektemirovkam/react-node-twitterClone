import React from "react";
import { Link } from "react-router-dom";
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
import { rangeDateFormat } from "../utils/formatData";

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
      },
    },
    tweetLink: {
      textDecoration: "none",
      color: "#000",
      fontSize: 15,
      "&:hover": {
        textDecoration: "underline",
      },
    },
    moreBtn: {
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
      marginTop: 10,
      display: "flex",
      justifyContent: "space-between",
      width: 400,
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
        padding: 5,
        fontSize: 17,
      },
    },
    imagesList: {
      display: "flex",
      alignItems: "center",
      padding: 0,
      margin: 0,
      marginTop: 20,
      listStyle: "none",
    },
    imagesListItem: {
      position: "relative",
      height: 75,
      flex: "0 0 75px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginRight: 10,
      borderRadius: 6,
    }
  })
);

export const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const classes = useStylesTweet();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <Paper className={classes.tweetWrapper} variant="outlined" square>
      <Link to={`/tweets/${tweet._id}`}>
        <Grid container spacing={0}>
          <Grid item xs={2}>
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
          </Grid>
          <Grid item xs={10}>
            <div className={classes.tweetHead}>
              <div className={classes.tweetHeadContent}>
                <Link
                  to={`/${tweet.user.fullname}/status/${tweet._id}`}
                  className={classes.tweetLink}
                >
                  <b>
                    {tweet.user.fullname}{" "}
                    {false && (
                      <CheckCircleIcon
                        color="primary"
                        fontSize="inherit"
                        style={{ marginLeft: 3 }}
                      />
                    )}
                  </b>
                </Link>
                <Typography
                  color="textSecondary"
                  style={{ marginRight: 5, fontSize: 15 }}
                >
                  {tweet.user.username}
                </Typography>
                <div className={classes.tweetLink}>
                  <Typography color="textSecondary" style={{ fontSize: 15 }}>
                    {" "}
                    · {rangeDateFormat(tweet.createdAt)}
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
            <Typography variant="body2">{tweet.text}</Typography>
            <ul className={classes.imagesList}>
              {tweet.images &&
                tweet.images.map((url) => (
                  <li
                    key={url}
                    style={{ backgroundImage: `url(${url})` }}
                    className={classes.imagesListItem}
                  ></li>
                ))}
            </ul>
            <div className={classes.tweetFooter}>
              <div className={classes.actionTweet}>
                <IconButton>
                  <CommentIcon fontSize="inherit" />
                </IconButton>
                <span>1</span>
              </div>
              <div className={classes.actionTweet}>
                <IconButton>
                  <RepeatIcon fontSize="inherit" />
                </IconButton>
                {/* <span>1</span> */}
              </div>
              <div className={classes.actionTweet}>
                <IconButton>
                  <LikeIcon fontSize="inherit" />
                </IconButton>
                {/* <span>1</span> */}
              </div>
              <div className={classes.actionTweet}>
                <IconButton>
                  <RepostIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </Link>
    </Paper>
  );
};
