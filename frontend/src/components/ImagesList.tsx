import React from 'react'

import DeleteIcon from "@material-ui/icons/Delete";
import { useUploadStyles } from './UploadImage';
import { ImageListItemInterface } from './AddTweetForm';

interface ImagesListPropsIterface {
    imagesList?: ImageListItemInterface[];
    removeImage: (url: string) => void;
}

export const ImagesList: React.FC<ImagesListPropsIterface> = ({imagesList, removeImage}) => {
    const classes = useUploadStyles();
    return (
        <ul className={classes.imagesList}>
        {imagesList && imagesList.map((image) => (
          <li
            key={image.blobUrl}
            style={{ backgroundImage: `url(${image.blobUrl})` }}
            className={classes.imagesListItem}
          >
            <DeleteIcon
              color="error"
              fontSize="small"
              onClick={() => {
                removeImage(image.blobUrl);
              }}
            />
          </li>
        ))}
      </ul>
    )
}
