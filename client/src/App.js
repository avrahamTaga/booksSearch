import React from "react";
import * as style from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import { Collections } from "./pages/Collections";
import { BooksSearch } from "./pages/BooksSearch";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { BooksContextProvide } from "./contexts/BooksContext";
import { CollectiosnContextProvide } from "./contexts/CollectionsContext";

const App = () => {
  return (
    <div className={style.app}>
      <Header />
      <main>
        <BooksContextProvide>
          <CollectiosnContextProvide>
            <Switch>
              <Route exact path="/home" render={() => <Home />} />
              <Route exact path="/search" render={() => <BooksSearch />} />
              <Route exact path="/collections" render={() => <Collections />} />
              <Route path="/" render={() => <Home />} />
            </Switch>
          </CollectiosnContextProvide>
        </BooksContextProvide>
      </main>
    </div>
  );
};

export default App;
