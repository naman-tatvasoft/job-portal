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
            latestApplications: []
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
                latestApplications: adminData.latestApplications || []
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
            latestApplications
        } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" class="container-fluid p-4 bg-light" style="min-height: 100vh;">
                    <h2 class="mb-4 text-primary">Admin Dashboard</h2>

                    <div class="row g-4 mb-4">
                        {[
                            { title: "Total Employers", value: totalEmployers },
                            { title: "Total Jobs", value: totalJobs },
                            { title: "Total Candidates", value: totalCandidates },
                            { title: "Total Applications", value: totalApplications }
                        ].map((stat, i) => (
                            <div class="col-md-3" key={i}>
                                <div class="card shadow-sm border-0 h-100 text-center">
                                    <div class="card-body">
                                        <h6 class="card-title text-secondary">{stat.title}</h6>
                                        <h3 class="text-primary">{stat.value !== 0 ? stat.value : "Loading..."}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6">
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

                        <div class="col-md-6">
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
