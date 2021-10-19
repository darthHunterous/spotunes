import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import Home from "./pages/Home";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/all" />
        </Route>
        <Route path="/all" exact component={Home} />
        <Route path="/artists" exact component={Home} />
        <Route path="/albums" exact component={Home} />
        <Route path="/genres" exact component={Home} />
        <Route path="/videos" exact component={Home} />
        <Route path="/recent" exact component={Home} />
        <Route path="/playlist/:id" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}