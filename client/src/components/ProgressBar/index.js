import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

export const ProgressBar = () => {
  return (
    <Grid container justify="space-evenly">
      <CircularProgress />
    </Grid>
  );
};
