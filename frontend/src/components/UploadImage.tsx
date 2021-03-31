import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";



import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import MediaIcon from "@material-ui/icons/PermMediaOutlined";
import { ImageListItemInterface } from "./AddTweetForm";
import { ImagesList } from './ImagesList';

export const useUploadStyles = makeStyles((theme: Theme) =>
  createStyles({
    addFormIcon: {
      padding: 8,
      "&:hover": {
        backgroundColor: "rgba(29, 161, 242, 0.1)",
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
      "& svg": {
        position: "absolute",
        top: 3,
        right: 3,
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  })
);

interface IUploadImageProps {
  imagesList: ImageListItemInterface[];
  setImagesList: Dispatch<SetStateAction<ImageListItemInterface[]>>
}

export const UploadImage: React.FC<IUploadImageProps> = ({
  imagesList,
  setImagesList,
}) => {
  const classes = useUploadStyles();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const onChange = useCallback((e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const imageObj = new Blob([file]);
      setImagesList((prev) => [
        ...prev,
        {
          blobUrl: URL.createObjectURL(imageObj),
          file,
        },
      ]);
    }
  }, []);

  const removeImage = (url: string) => {
    setImagesList((prev) => prev.filter((image) => url !== image.blobUrl));
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.addEventListener("change", onChange);
    }
    return () => {
      inputRef.current?.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div>
      <label onClick={handleClick}>
        <input ref={inputRef} type="file" hidden />
        <IconButton className={classes.addFormIcon}>
          <MediaIcon color="primary" />
        </IconButton>
      </label>
      <ImagesList imagesList={imagesList} removeImage={removeImage}/>
    </div>
  );
};
