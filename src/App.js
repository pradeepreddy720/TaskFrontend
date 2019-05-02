import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./containers/storefront/home/Home";
import confirmation from "./containers/storefront/home/confirmation";

class App extends Component {
  render() {
    return ( 
      <div className="App">
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/confirmation/:id" component={confirmation} />
         </Switch>
      </div>
    );
  }
}

export default App;