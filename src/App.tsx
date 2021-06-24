import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from './pages/container'
import Login from './pages/login'
const App: FC = () => (
  <Router>
    <Switch>
    <Route exact path="/login" component={Login} />
    <Route
      path="/"
      key="container"
      render={(props: unknown) => {
        return <Container {...props} />
      }}
    />
    </Switch>
  </Router>
)

export default App
