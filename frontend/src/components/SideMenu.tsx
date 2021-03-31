import React, {useState} from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MessageIcon from '@material-ui/icons/MailOutlineOutlined';
import EmailIcon from '@material-ui/icons/AlternateEmailOutlined';
import UserIcon from '@material-ui/icons/PermIdentityOutlined';
import { Link, NavLink } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import  Button from '@material-ui/core/Button';
import LoginModal from "./LoginModal";
import DialogContent from "@material-ui/core/DialogContent";
import { AddTweetForm } from "./AddTweetForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideMenuLogo: {
      fontSize: 34,
    },
    sideMenuList: {
      "& li": {
        cursor: "pointer",
        padding: 0,
       "&:hover": {
        "& a": {
          backgroundColor: "rgba(29, 161, 242, 0.1)",
          color: theme.palette.primary.main
        }
       }
      },
    },
    sideMenuLink: {
      textDecoration: "none",
      color: "black",
      fontWeight: 700,
      fontSize: 20,
      padding: 10,
      borderRadius: 30,
      transition: "all 0.1s ease-in-out",
      display: "flex",
      alignItems: "center",
      "& span": {
        margin: "0px 15px 0 20px"
      },
      "& svg": {
        fontSize: 27
      }
    },
    active: {
      color: theme.palette.primary.main,
    },
    sideMenuWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "end",
      maxWidth: 215
    },
    dialogContent:{
      padding: "0 30px 35px 30px",
      width: 450,
    }
  })
);

interface SideMemuProps {}

export const SideMenu: React.FC<SideMemuProps> = () => {

  const classes = useStyles();

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleCloseModal = () => {
    setIsVisibleModal(false)
  }

  const handleOpenModal = () => {
    setIsVisibleModal(true)
  }

  return (
    <div className={classes.sideMenuWrapper}>
      <IconButton color="primary">
        <Link to="/home">
          <TwitterIcon color="primary" className={classes.sideMenuLogo} />
        </Link>
      </IconButton>
      <List component="nav" className={classes.sideMenuList}>
        <ListItem>
          <NavLink
            exact
            to="/home"
            activeClassName={classes.active}
            className={classes.sideMenuLink}
          >
            <HomeIcon/>
            <span>Главная</span>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            exact
            to="/search"
            activeClassName={classes.active}
            className={classes.sideMenuLink}
          >
            <SearchIcon/>
           <span>Поиск</span>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            exact
            to="/notifications"
            activeClassName={classes.active}
            className={classes.sideMenuLink}
          >
            <NotificationsIcon/>
            <span>Уведомления</span>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            exact
            to="/messages"
            activeClassName={classes.active}
            className={classes.sideMenuLink}
          >
            <MessageIcon/>
            <span>Сообщения</span>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            exact
            to="/i/connect_people"
            activeClassName={classes.active}
            className={classes.sideMenuLink}
          >
            <EmailIcon/>
            <span>На связи</span>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            exact
            to="/profile/asdasd"
            activeClassName={classes.active}
            className={classes.sideMenuLink}
          >
            <UserIcon/>
            <span>Профиль</span>
          </NavLink>
        </ListItem>
      </List>
      <Button variant="contained" color="primary" fullWidth onClick={handleOpenModal}>
        Твитнуть
      </Button>
      <LoginModal visible={isVisibleModal} title="" handleClose={handleCloseModal} fontSizeIcon={"24"} >
      <DialogContent className={classes.dialogContent}>
        <AddTweetForm heightInput={85}/>
        </DialogContent>
      </LoginModal>
    </div>
  );
};
