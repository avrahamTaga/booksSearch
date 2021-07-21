import React, { useContext } from "react";
import uuid from "react-uuid";
import { getBookCoverByOLID } from "../../BooksApi/index";
import { BooksContext } from "../../contexts/BooksContext";
import { CollectiosnContext } from "../../contexts/CollectionsContext";
import { makeStyles } from "@material-ui/core/styles";
import { ProgressBar } from "../../components/ProgressBar";
import * as style from "./BooksSearch.module.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export const BooksSearch = () => {
  const classes = useStyles();

  const {
    booksListSearchResults,
    searchBook,
    flag,
    changeSearchTermNameHandler,
  } = useContext(BooksContext);

  const { collections, addBookToCollectionHandler } = useContext(
    CollectiosnContext
  );

  return (
    <Container>
      <Grid className={classes.root}>
        <p>Currently Collections: {collections.length}</p>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          type="search"
          required
          onChange={changeSearchTermNameHandler}
        />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={searchBook}
        >
          Search Book
        </Button>
      </Grid>
      <Grid spacing={2} container direction="row">
        {flag ? (
          <ProgressBar />
        ) : (
          booksListSearchResults.map((book) => {
            return (
              <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
                <Card className={style.cardActionArea}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Collections Names
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {collections.length ? (
                        collections.map((collection) => (
                          <Button
                            key={uuid()}
                            onClick={() => {
                              addBookToCollectionHandler(
                                collection.books,
                                uuid(),
                                book.title,
                                book.first_publish_year,
                                book.cover_edition_key
                                  ? getBookCoverByOLID(book.cover_edition_key)
                                  : "https://unmpress.com/sites/default/files/default_images/no_image_book.jpg"
                              );
                            }}
                            color="primary"
                          >
                            {collection.collectionName}
                          </Button>
                        ))
                      ) : (
                        <p>
                          Go To Collections Tab And Create Your First Collection
                        </p>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {book.title}
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
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
};
