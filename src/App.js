import { Component } from 'inferno';
import './App.css'
import { BrowserRouter } from 'inferno-router';
import { routes } from './routes.js';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}
