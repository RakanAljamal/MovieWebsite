import React from 'react';
import Home from './Home';
import { Route, Switch } from 'react-router-dom'
import Movie from './Movie'
import "./Home.css"
import "./All.css"
import SingleMovie from './SingleMovie'
import SearchedMovies from './SearchedMovies';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/movie/:id' render={(routeProps) => <SingleMovie id={routeProps.match.params.id} />} />
        <Route exact path='/smovie/:moviename' render={(routeProps) => <SearchedMovies name={routeProps.match.params.moviename} />} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
