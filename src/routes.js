import { Route } from 'inferno-router';
import Login from './components/Auth/Login.js';
import RegisterEmployer from './components/Auth/RegisterEmployer.js';
import RegisterCandidate from './components/Auth/RegisterCandidate.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import Jobs from './components/Job/Jobs.js';
import Applications from './components/Application/Applications.js';
import CandidateDashboard from './components/Candidate/CandidateDashboard.js';
import ApplicationDetail from './components/Application/ApplicationDetails.js';
import JobDetail from './components/Job/JobDetails.js';

export const routes = [
  <Route key="login" path="/" component={Login} exact />,
  <Route key="employer" path="/employer-register" component={RegisterEmployer} />,
  <Route key="candidate" path="/candidate-register" component={RegisterCandidate} />,
  <Route key="admin-dashboard" path="/admin-dashboard" component={AdminDashboard} />,
  <Route key="jobs" path="/jobs" component={Jobs} />,
  <Route key="applications" path="/applications" component={Applications} />,
  <Route key="candidate-dashboard" path="/candidate-dashboard" component={CandidateDashboard} />,
  <Route key="application-detail" path="/application" component={ApplicationDetail} />,
  <Route key="job-detail" path="/job" component={JobDetail} />

];