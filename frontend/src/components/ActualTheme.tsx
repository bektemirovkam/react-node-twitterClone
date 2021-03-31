import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { selectTopicsItems } from "../store/ducks/topics/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "../store/ducks/topics/actionCreators";

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
      display: "block",
      width: "100%",
      transition: "all 0.1s ease-in-out",
      "&:hover": {
        backgroundColor: "#ebeef0",
      },
      "& h6": {
        color: "#000",
        fontWeight: "bold",
      },
    },
  })
);

export const ActualTheme: React.FC = () => {
  const classes = useStylesActual();
  const topics = useSelector(selectTopicsItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);


  return (
    <Paper variant="elevation" className={classes.wrapper}>
      <Typography variant="h2">Актуальные темы для вас</Typography>
      <List component="nav" className={classes.actualList}>
        {topics?.map((topic) => (
          <ListItem key={topic._id}>
            <Link to={`/search?q=${topic.name}`} className={classes.actualLink}>
              <Typography variant="body2" color="textSecondary">
                Актуальные темы: {topic.about}
              </Typography>
              <Typography variant="subtitle1">{topic.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Твитов: {topic.count}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
