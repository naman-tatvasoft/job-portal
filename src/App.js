import { Component } from 'inferno';
import { BrowserRouter } from 'inferno-router';
import { routes } from './routes.js';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Job Portal</h1>
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}
