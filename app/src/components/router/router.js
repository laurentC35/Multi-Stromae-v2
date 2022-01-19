import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Visualizer } from 'components/orchestrator/visualizer';

const Router = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route path="/visualize" component={Visualizer} />
      {!pathname.startsWith('/authentication') && <Redirect to="/visualize" />}
    </Switch>
  );
};

export default Router;
