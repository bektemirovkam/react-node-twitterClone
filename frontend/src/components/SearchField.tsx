import React from 'react';
import {
  createStyles,
  makeStyles,
  fade,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1)
    },
    input: {
      borderRadius: 30,
      position: 'relative',
      zIndex: 1,
      backgroundColor: "#ebeef0",
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 12px 10px 40px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) => createStyles({
  searchLabel: {
    zIndex: 2,
    top: 13,
    left: 9,
    "& svg": {
      fontSize: 40,
      fontWeight: 400
    }
  },
  searchFormControl: {
    width: "100%",
  }
}))

export const SearchField = () => {
  const classes = useStyles()
  return (
    <form noValidate>
      <FormControl className={classes.searchFormControl}>
        <InputLabel shrink htmlFor="search-input" className={classes.searchLabel} >
          <SearchIcon/>
        </InputLabel>
        <SearchInput id="search-input" placeholder="Поиск в Твиттере" />
      </FormControl>
    </form>
  );
}
