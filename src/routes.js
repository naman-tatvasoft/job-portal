import { Route } from 'inferno-router';
import Login from './components/Auth/Login.js';
import RegisterEmployer from './components/Auth/RegisterEmployer.js';
import RegisterCandidate from './components/Auth/RegisterCandidate.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import Jobs from './components/Job/Jobs.js';
import Applications from './components/Application/Applications.js';
import ApplicationDetail from './components/Application/ApplicationDetails.js';
import JobDetail from './components/Job/JobDetails.js';
import Users from './components/User/Users.js';
import Category from './components/Category/Category.js';
import AddEditCategory from './components/Category/AddEditCategory.js';
import Skill from './components/Skill/Skill.js';
import AddEditSkill from './components/Skill/AddEditSkill.js';
import Status from './components/Status/Status.js';
import AddEditStatus from './components/Status/AddEditStatus.js';
import EmployerDashboard from './components/Employer/EmployerDashboard.js';
import CreatedJobs from './components/Job/CreatedJobs.js';
import CreatedJobDetails from './components/Job/CreatedJobDetails.js';
import AppliedApplications from './components/Application/AppliedApplications.js';

export const routes = [
  <Route key="login" path="/" component={Login} exact />,
  <Route key="employer" path="/employer-register" component={RegisterEmployer} />,
  <Route key="candidate" path="/candidate-register" component={RegisterCandidate} />,
  <Route key="admin-dashboard" path="/admin-dashboard" component={AdminDashboard} />,
  <Route key="jobs" path="/jobs" component={Jobs} />,
  <Route key="applications" path="/applications" component={Applications} />,
  <Route key="application-detail" path="/application" component={ApplicationDetail} />,
  <Route key="job-detail" path="/job" component={JobDetail} />,
  <Route key="users" path="/users" component={Users} />,
  <Route key="category" path="/category" component={Category} />,
  <Route key="add-edit-category" path="/add-edit-category" component={AddEditCategory} />,
  <Route key="skill" path="/skill" component={Skill} />,
  <Route key="add-edit-skill" path="/add-edit-skill" component={AddEditSkill} />,
  <Route key="status" path="/status" component={Status} />,
  <Route key="add-edit-status" path="/add-edit-status" component={AddEditStatus} />,
  <Route key="employer-dashboard" path="/employer-dashboard" component={EmployerDashboard}/>,
  <Route key="created-jobs" path='/created-jobs' component={CreatedJobs}/>,
  <Route key="created-job-detail" path="/created-job" component={CreatedJobDetails} />,
  <Route key="applied-applications" path="/applied-applications" component={AppliedApplications} />
];