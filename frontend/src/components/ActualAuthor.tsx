import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthorsItems } from "../store/ducks/authors/selectors";
import { fetchAuthors } from "../store/ducks/authors/actionCreators";

const useStylesActual = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: "#f7f9fa",
      borderRadius: 15,
      margin: "15px 0",
      padding: "10px 0",
      "& h2": {
        fontWeight: 800,
        fontSize: 19,
        padding: "10px 15px",
      },
    },
    actualList: {
      "& li": {
        padding: 0,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      },
    },
    actualLink: {
      textDecoration: "none",
      padding: 10,
      display: "flex",
      alignItems: "center",
      width: "100%",
      transition: "all 0.1s ease-in-out",
      "&:hover": {
        backgroundColor: "#ebeef0",
      },
      "& h6": {
        color: "#000",
      },
    },
    authorName: {
      flex: "1 1 auto",
      marginLeft: 10,
      display: "flex",
      flexDirection: "column",
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    profileLink: {
      padding: 3,
    },
    tweetLink: {
      textDecoration: "none",
      color: "#000",
      display: "flex",
      alignItems: "center",
      "& b": {
        marginRight: 5,
      },
      "&:hover": {
        textDecoration: "underline",
      },
    },
    readBtn: {
      flex: "0 0 83px",
      height: 30,
      fontWeight: "bold",
    },
  })
);

interface ActualAuthorInterface {
  title: string;
}

export const ActualAuthor: React.FC<ActualAuthorInterface> = ({ title }) => {
  const classes = useStylesActual();

  const authors = useSelector(selectAuthorsItems);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAuthors())
  }, [])

  return (
    <Paper variant="elevation" className={classes.wrapper}>
      <Typography variant="h2">{title}</Typography>
      <List component="nav" className={classes.actualList}>
        {authors.map((author) => (
          <ListItem key={author._id}>
            <div className={classes.actualLink}>
              <IconButton className={classes.profileLink}>
                <Avatar
                  className={classes.avatar}
                  src="https://pbs.twimg.com/profile_images/1126375627760779264/cWj4ZgNi_400x400.jpg"
                />
              </IconButton>
              <div className={classes.authorName}>
                <Link to={`/profile/${author._id}`} className={classes.tweetLink}>
                  <b>{author.username}</b>
                  {true && (
                    <CheckCircleIcon color="primary" fontSize="inherit" />
                  )}
                </Link>
                <Typography color="textSecondary" style={{ marginRight: 5 }}>
                  {author.email}
                </Typography>
              </div>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.readBtn}
              >
                Читать
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
