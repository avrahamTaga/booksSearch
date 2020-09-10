import React, { useContext } from "react";
import * as style from "./Collections.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import { CollectiosnContext } from "../../contexts/CollectionsContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import uuid from "react-uuid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export const Collections = () => {
  const classes = useStyles();

  const {
    collections,
    collectionName,
    changeCollectionNameHandler,
    createCollectionHandler,
    deleteCollectionHandler,
    deleteBookFromCollectionHandker,
  } = useContext(CollectiosnContext);

  return (
    <Container>
      <Grid className={classes.root}>
        <p>Currently Collections: {collections.length}</p>
        <TextField
          onChange={changeCollectionNameHandler}
          id="standard-basic"
          label="Collection Name"
          variant="outlined"
          size="small"
          type="text"
          required
        />
        <Button
          onClick={() => {
            createCollectionHandler(collectionName, uuid());
          }}
          variant="contained"
          size="medium"
          color="primary"
        >
          Create Collection
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Collection Name</TableCell>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Books</TableCell>
                <TableCell align="right">Edit Books</TableCell>
                <TableCell align="right">Edit Collection</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections.map((collection, index) => (
                <TableRow key={uuid()}>
                  <TableCell component="th" scope="row">
                    {collection.collectionName}
                  </TableCell>
                  <TableCell align="right">{collection.id}</TableCell>
                  <TableCell align="right">{collection.books.length}</TableCell>

                  <TableCell align="right">
                    <Grid className={classes.root} container direction="row">
                      {collection.books.map((book, index) => {
                        return (
                          <Grid
                            key={uuid()}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={2}
                            container
                          >
                            <Card className={style.cardActionArea}>
                              <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                  {book.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                  {book.first_publish_year}
                                </Typography>
                              </CardContent>
                              <CardActionArea>
                                <CardMedia component="img" image={book.img} />
                              </CardActionArea>
                              <IconButton
                                onClick={() =>
                                  deleteBookFromCollectionHandker(
                                    collection.collectionName,
                                    book.id
                                  )
                                }
                                aria-label="delete"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteCollectionHandler(collection.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <EditOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
};
