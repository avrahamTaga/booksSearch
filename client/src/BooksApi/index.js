const getApiSearchUrl = (searchTerm) =>
  `https://openlibrary.org/search.json?q=${searchTerm}`;

export const getBookCoverByOLID = (olid) =>
  `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

export const searchBooks = (searchTerm = "") => {
  return fetch(getApiSearchUrl(searchTerm))
    .then((r) => r.json())
    .catch((err) => {
      console.log(err);
    });
};
