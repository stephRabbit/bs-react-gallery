import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from '../components/Grid';
import Photo from '../components/Photo';
import NotFound from '../components/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Grid} />
      <Route path="/photo/:id" component={Photo} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;