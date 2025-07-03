import { Route } from 'inferno-router';
import Login from './components/Auth/Login.js';
import RegisterEmployer from './components/Auth/RegisterEmployer.js';
import RegisterCandidate from './components/Auth/RegisterCandidate.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import Jobs from './components/Job/Jobs.js';
import Applications from './components/Application/Applications.js';

export const routes = [
  <Route key="login" path="/" component={Login} exact />,
  <Route key="employer" path="/employer-register" component={RegisterEmployer} />,
  <Route key="candidate" path="/candidate-register" component={RegisterCandidate} />,
  <Route key="admin-dashboard" path="/admin-dashboard" component={AdminDashboard} />,
  <Route key="jobs" path="/jobs" component={Jobs} />,
  <Route key="applications" path="/applications" component={Applications} />,

];