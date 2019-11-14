import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../elements/Header/Header'
import Home from '../Home/Home'
import Movie from '../Movie/Movie'
import NotFound from '../elements/NotFound/NotFound'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie/:movieId" component={Movie} />
      <Route path="/" component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
