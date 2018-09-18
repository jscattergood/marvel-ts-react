import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css'
import CharacterDetailPage from './CharacterDetailPage';
import CharactersPage from './CharactersPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/characters' component={CharactersPage}/>
      <Route path='/character/:id' component={CharacterDetailPage}/>
      <Route component={CharactersPage}/>
    </Switch>
  </BrowserRouter>
);

export default App;
