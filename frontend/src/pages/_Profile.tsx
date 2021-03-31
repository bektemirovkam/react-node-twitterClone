import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export const Profile: React.FC = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={8}>
      <Paper>Profile</Paper>
      </Grid>
      <Grid item xs={4}>
        Submenu
      </Grid>
    </Grid>
  );
};
