import React, { useContext } from "react";
import * as style from "./Collections.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import { CollectiosnContext } from "../../contexts/CollectionsContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export const Collections = () => {
  const classes = useStyles();
  const { collections, collectionName } = useContext(CollectiosnContext);
  return (
    <Container>
      <section>
        <h1>Books Collections</h1>
      </section>
      <Grid
        spacing={3}
        container
        direction="row"
      >
        {collections[0].toRead.map((book, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card className={style.cardActionArea}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {book.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {book.year}
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia component="img" image={book.img} />
                </CardActionArea>
                <ButtonGroup className={classes.root}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
