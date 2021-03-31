import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";

import signBg from "../../assets/img/twitter_signin.png";
import LoginModal from "../../components/LoginModal";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";

const useStyles = makeStyles({
  wrapper: {
    height: "100vh",
    display: "flex",
    flexWrap: "wrap",
  },
  leftSide: {
    flex: "0 0 43%",
    position: "relative",
    backgroundImage: `url(${signBg})`,
  },
  rightSide: {
    flex: "0 0 57%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftSideIcon: {
    color: "#fff",
    fontSize: "25vw",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  rightSideContent: {
    padding: 55,
  },
  rightSideIcon: {
    color: "#1da1f2",
    fontSize: 50,
  },
  rightSideTitle: {
    fontWeight: 700,
    fontSize: 65,
    lineHeight: "65px",
    margin: "50px 0",
  },
  rightSideSubTitle: {
    lineHeight: "40px",
    fontSize: 30,
    fontWeight: 700,
  },
  rightSideActions: {
    width: 380,
  },
  dialogContent: {
    padding: "0 30px 35px 30px",
  },
  registerBtn: {
    marginTop: 20,
    position: "absolute",
    top: 4,
    right: 20,
  },
  selectRegBtn: {
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 400,
    padding: 0,
  },
});

type ModalNameType = "signIn" | "signUp" | undefined;

export type SignInStyles = ReturnType<typeof useStyles>
 
export const SignIn = () => {
  const classes = useStyles();
  const [visibleModal, setVisibleModal] = useState<ModalNameType>(undefined);
  

  const handleCloseModal = () => {
    setVisibleModal(undefined);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftSide}>
        <TwitterIcon className={classes.leftSideIcon} />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.rightSideContent}>
          <TwitterIcon className={classes.rightSideIcon} />
          <Typography variant="h2" className={classes.rightSideTitle}>
            В курсе происходящего
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            className={classes.rightSideSubTitle}
          >
            Присоединяйтесь к Твиттеру прямо сейчас!
          </Typography>
          <div className={classes.rightSideActions}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginBottom: 20 }}
              onClick={() => {
                setVisibleModal("signUp");
              }}
            >
              Зарегистрироваться
            </Button>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              onClick={() => {
                setVisibleModal("signIn");
              }}
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
      <LoginModal
        visible={visibleModal === "signIn"}
        handleClose={handleCloseModal}
        title={"Войти в Твиттер"}
      >
        <LoginForm classes={classes}/>
      </LoginModal>
      <LoginModal
        visible={visibleModal === "signUp"}
        handleClose={handleCloseModal}
        fontSizeTitle={25}
        fontSizeIcon={"5vh"}
        title={"Создайте учетную запись"}
      >
        <RegisterForm classes={classes}/>
      </LoginModal>
    </div>
  );
};
