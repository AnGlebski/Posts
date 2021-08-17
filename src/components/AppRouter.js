import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import Error from '../pages/Error';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/posts">
        <Posts />
      </Route>
      <Route exact path="/posts/:id">
        <PostIdPage />
      </Route>
      <Route path="/error">
        <Error />
      </Route>
      <Redirect to="/error" />
    </Switch>
  );
};

export default AppRouter;
