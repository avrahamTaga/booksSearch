import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export const ProgressBar = () => {
  return (
    <Grid container justify="space-evenly">
      <CircularProgress />
    </Grid>
  );
};

export default ProgressBar;
