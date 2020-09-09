import React, { useContext } from "react";
import * as style from "./BooksSearch.module.scss";
import { getBookCoverByOLID } from "../../BooksApi/index";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ProgressBar from "../../components/ProgressBar";
import { BooksContext } from "../../contexts/BooksContext";
import { CollectiosnContext } from "../../contexts/CollectionsContext";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export const BooksSearch = () => {
  const classes = useStyles();
  const { booksList, searchBook, flag, changeHandler } = useContext(
    BooksContext
  );

  const { collections, addBooksToExistingCollection } = useContext(
    CollectiosnContext
  );
  return (
    <Container>
      <Grid className={classes.root}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          type="search"
          required
          onChange={changeHandler}
        />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={searchBook}
        >
          Search
        </Button>
      </Grid>
      <br />
      <Grid spacing={2} container direction="row">
        {flag ? (
          <ProgressBar />
        ) : (
          booksList.map((book, index) => {
            return (
              <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
                <Card className={style.cardActionArea}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {book.title_suggest}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {book.first_publish_year}
                    </Typography>
                  </CardContent>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={
                        book.cover_edition_key
                          ? getBookCoverByOLID(book.cover_edition_key)
                          : "https://unmpress.com/sites/default/files/default_images/no_image_book.jpg"
                      }
                    />
                  </CardActionArea>
                  <ButtonGroup className={classes.root}>
                    <Button
                      onClick={() => {
                        addBooksToExistingCollection(
                          collections[0].toRead,
                          index,
                          book.title_suggest,
                          book.first_publish_year,
                          book.cover_edition_key
                            ? getBookCoverByOLID(book.cover_edition_key)
                            : "https://unmpress.com/sites/default/files/default_images/no_image_book.jpg"
                        );
                      }}
                      variant="contained"
                      color="primary"
                    >
                      to read
                    </Button>
                  </ButtonGroup>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
};
