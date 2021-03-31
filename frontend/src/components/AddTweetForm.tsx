import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import GifIcon from "@material-ui/icons/GifOutlined";
import SmileIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import CalendarIcon from "@material-ui/icons/DateRangeOutlined";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddTweet, setStatusAddTweetState } from "../store/ducks/tweets/actionCreators";
import { selectStatusAddTweetState } from "./../store/ducks/tweets/selectors";
import { LoadingStatus } from "../store/types";
import { UploadImage } from './UploadImage';
import { uploadFiles } from './../utils/uploadFiles';

export const useStylesAddTweetForm = makeStyles((theme: Theme) =>
  createStyles({
    addFormWrapper: {},
    addForm: {
      "& textarea": {
        width: "100%",
      },
    },
    addFormFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "10px 0",
    },
    addFormActions: {
      flex: "0 0 185px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    addFormAction: {
      padding: 8,
      "&:hover": {
        backgroundColor: "rgba(29, 161, 242, 0.1)",
      },
    },
    addFormProgress: {
      display: "flex",
      alignItems: "center",
      "& button": {
        marginLeft: 20,
      },
    },
    progressWrapper: {
      position: "relative",
    },
    progressStatic: {
      "&  svg": {
        color: "#ebeef0",
      },
    },
    progressAbsolute: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    addFormLink: {
      padding: 3,
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    input: {
      fontSize: 20,
      fontWeight: 400,
      outline: "none",
      border: "none",
      resize: "none",
      height: "100%",
    },
  })
);

interface AddTweetFormPropsInterface {
  heightInput?: number;
}

export interface ImageListItemInterface {
  file: File;
  blobUrl: string;
}

export interface AddTweetFormDataInterface {
  text: string,
  images: ImageListItemInterface[]
}

export const AddTweetForm: React.FC<AddTweetFormPropsInterface> = ({
  heightInput,
}) => {
  const classes = useStylesAddTweetForm();
  const dispatch = useDispatch();

  const [formText, setFormText] = useState("");
  const [imagesList, setImagesList] = useState<ImageListItemInterface[]>([]); // не больше 5 картинок, а то ломается верстка

  const addTweetStatus = useSelector(selectStatusAddTweetState);

  const handleFormInputText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormText(e.currentTarget.value);
  };

  const handleAddBtnClick = async () => {
    dispatch(setStatusAddTweetState(LoadingStatus.LOADING))
    let imageUrls = []

    for (let i = 0; i < imagesList.length; i++) {
     const data = await uploadFiles(imagesList[i].file)
     imageUrls.push(data.result.url)
    }
    dispatch(fetchAddTweet({
      text: formText,
      images: imageUrls
    }));
    setFormText("");
    setImagesList([]);
  };

  return (
    <Grid container spacing={0} className={classes.addFormWrapper}>
      <Grid item xs={2}>
        <IconButton className={classes.addFormLink}>
          <Link to="/asdasd">
            <Avatar
              className={classes.avatar}
              src="https://twitter.com/03EvVLcOEDvg8fL/photo"
            />
          </Link>
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <form className={classes.addForm}>
          <TextareaAutosize
            className={classes.input}
            placeholder="Что происходит?"
            value={formText}
            maxLength={300}
            onChange={handleFormInputText}
            style={{ height: heightInput }}
          />
          <div className={classes.addFormFooter}>
            <div className={classes.addFormActions}>
              <UploadImage imagesList={imagesList} setImagesList={setImagesList}/>
              <IconButton className={classes.addFormAction}>
                <GifIcon color="primary" />
              </IconButton>
              <IconButton className={classes.addFormAction}>
                <SmileIcon color="primary" />
              </IconButton>
              <IconButton className={classes.addFormAction}>
                <CalendarIcon color="primary" />
              </IconButton>
            </div>
            <div className={classes.addFormProgress}>
              {formText && (
                <div className={classes.progressWrapper}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={30}
                    className={classes.progressStatic}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={Math.round(formText.length / 3)}
                    size={30}
                    className={classes.progressAbsolute}
                  />
                </div>
              )}
              <Button
                variant="contained"
                color="primary"
                disabled={
                  addTweetStatus === LoadingStatus.LOADING ||
                  formText.length <= 0
                }
                onClick={handleAddBtnClick}
              >
                {addTweetStatus === LoadingStatus.LOADING ? (
                  <CircularProgress color="primary" size={20} />
                ) : (
                  "Твитнуть"
                )}
              </Button>
            </div>
          </div>
        </form>
        {addTweetStatus === LoadingStatus.ERROR && (
          <Alert severity="error">
            Произошла ошибка при добавлении нового твитта
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};
