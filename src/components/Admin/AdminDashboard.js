import { Component } from 'inferno';
import { getAdminDashboardData } from '../../services/ApiService.js';
import Sidebar from '../Sidebar/Sidebar.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalEmployers: 0,
            totalJobs: 0,
            totalCandidates: 0,
            totalApplications: 0,
            latestJobs: [],
            latestApplications: [],
            latestUsers: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentWillMount() {
        const adminData = await getAdminDashboardData();

        if (adminData) {
            this.setState({
                totalEmployers: adminData.totalEmployers,
                totalJobs: adminData.totalJobs,
                totalCandidates: adminData.totalCandidates,
                totalApplications: adminData.totalApplications,
                latestJobs: adminData.latestJobs || [],
                latestApplications: adminData.latestApplications || [],
                latestUsers: adminData.latestUsers || []
            });
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('access-token');
        localStorage.removeItem('role');
        document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        window.location.href = '/';
    };

    render() {
        const {
            totalEmployers,
            totalJobs,
            totalCandidates,
            totalApplications,
            latestJobs,
            latestApplications,
            latestUsers
        } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" class="container-fluid p-4 bg-custom" style="min-height: 100vh;">
                    <h2 class="mb-4 text-dark fw-bold">Admin Dashboard</h2>

                    <h3 className="text-primary fw-bold">Manage</h3>

                    <div class="row mb-5 dashboardCards">
                        {[{
                            title: "Categories",
                            subtitle: "Manage Categories",
                            icon: "fas fa-tags",
                            description: "Create, edit, or remove job categories.",
                            addText: "Add Category",
                            viewText: "View All"
                        }, {
                            title: "Skills",
                            subtitle: "Manage Skills",
                            icon: "fas fa-briefcase",
                            description: "Create, edit, or remove job skills.",
                            addText: "Add Skill",
                            viewText: "View All"
                        }, {
                            title: "Status",
                            subtitle: "Manage Statuses",
                            icon: "fas fa-file-alt",
                            description: "Create, edit, or remove application status.",
                            addText: "Add Status",
                            viewText: "View All"
                        }].map((card, i) => (
                            <div class="col-lg-4 mb-4" key={i}>
                                <div class="card">
                                    <div class="card-body text-center p-4">
                                        <div class="metric-icon mb-3 text-primary">
                                            <i class={card.icon} aria-hidden="true"></i>
                                        </div>
                                        <h6 class="text-primary fw-bold mb-2">{card.title}</h6>
                                        <h5 class="fw-bold mb-3">{card.subtitle}</h5>
                                        <p class="text-muted small mb-4">{card.description}</p>
                                        <div class="d-flex gap-2 justify-content-center">
                                            <a class="btn btn-primary" href="">{card.addText}</a>
                                            <a class="btn btn-secondary" href="">{card.viewText}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-primary fw-bold">Recents</h3>
                    <div class="row g-4 mb-4">
                        {[
                            { title: "Total Employers", value: totalEmployers, icon: "bi-person-badge" },
                            { title: "Total Jobs", value: totalJobs, icon: "bi-briefcase-fill" },
                            { title: "Total Candidates", value: totalCandidates, icon: "bi-people-fill" },
                            { title: "Total Applications", value: totalApplications, icon: "bi-file-earmark-text-fill" }
                        ].map((stat, i) => (
                            <div class="col-md-3" key={i}>
                                <div class="card shadow-sm border-0 h-100 text-center">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-center align-items-center mb-3">
                                            <i class={`bi ${stat.icon} text-primary`} style="font-size: 2rem;"></i>
                                        </div>
                                        <h6 class="card-title text-secondary">{stat.title}</h6>
                                        <h3 class="text-primary">{stat.value !== 0 ? stat.value : "Loading..."}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-primary fw-bold">Analysis</h3>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="card shadow-sm border-0 h-100">
                                <div class="card-header bg-primary text-white">
                                    Jobs
                                </div>
                                <div class="card-body" style="max-height: 300px; overflow-y: auto;">

                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="card shadow-sm border-0 h-100">
                                <div class="card-header bg-primary text-white">
                                    Applications
                                </div>
                                <div class="card-body" style="max-height: 300px; overflow-y: auto;">

                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-primary fw-bold">Recents</h3>
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card shadow-sm border-0 h-100">
                                <div class="card-header bg-primary text-white">
                                    Latest Users
                                </div>
                                <div class="card-body" style="max-height: 300px; overflow-y: auto;">
                                    {latestUsers.length > 0 ? latestUsers.map(users => (
                                        <div class="mb-3 border-bottom pb-2" key={users.id}>
                                            <h6 class="mb-1 text-primary">{users.name}</h6>
                                            <p class="mb-0 text-muted">{users.email} | {users.roleName} </p>
                                            <p class="small">{users.roleName}</p>
                                        </div>
                                    )) : <p>No Users available</p>}
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card shadow-sm border-0 h-100">
                                <div class="card-header bg-primary text-white">
                                    Latest Jobs
                                </div>
                                <div class="card-body" style="max-height: 300px; overflow-y: auto;">
                                    {latestJobs.length > 0 ? latestJobs.map(job => (
                                        <div class="mb-3 border-bottom pb-2" key={job.id}>
                                            <h6 class="mb-1 text-primary">{job.title}</h6>
                                            <p class="mb-0 text-muted">{job.location} | {job.experienceRequired} yrs</p>
                                            <p class="small">{job.description}</p>
                                        </div>
                                    )) : <p>No jobs available</p>}
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card shadow-sm border-0 h-100">
                                <div class="card-header bg-primary text-white">
                                    Latest Applications
                                </div>
                                <div class="card-body" style="max-height: 300px; overflow-y: auto;">
                                    {latestApplications.length > 0 ? latestApplications.map(app => (
                                        <div class="mb-3 border-bottom pb-2" key={app.id}>
                                            <h6 class="mb-1 text-primary">{app.jobTitle}</h6>
                                            <p class="mb-0 text-muted">{app.companyName} | {app.candidateName}</p>
                                            <p class="small">Status: {app.status}</p>
                                        </div>
                                    )) : <p>No applications available</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
