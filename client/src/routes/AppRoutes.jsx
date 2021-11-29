import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminBooksMain } from "../views/AdminBooksMain";
import { AdminNewEditScreen } from "../views/AdminNewEditScreen";
import LoginAndRegister from "../views/LoginAndRegister";
import { UserBooksContainer } from "../views/UserBooksContainer";
import { UserBooksMain } from "../views/UserBooksMain";

export const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginAndRegister />
        </Route>
        <Route exact path="/register">
          <LoginAndRegister />
        </Route>
        <Route exact path="/admin/books">
          <AdminBooksMain />
        </Route>
        <Route exact path="/admin/book/new">
          <AdminNewEditScreen />
        </Route>
        <Route exact path="/admin/book/edit/:id">
          <AdminNewEditScreen />
        </Route>
        <Route exact path="/user/books">
          <UserBooksMain />
        </Route>
        <Route exact path="/user/book/:id">
          <UserBooksContainer />
        </Route>
      </Switch>
    </Router>
  );
};
