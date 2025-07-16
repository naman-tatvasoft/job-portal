import { Component } from 'inferno';
import { getEmployerDashboardData, getId } from '../../services/ApiService.js';
import EmployerSidebar from '../Sidebar/EmployerSidebar.js';

export default class EmployerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalJobs: 0,
            totalApplications: 0,
            newApplications: 0,
            latestJobs: [],
            latestApplications: []
        };

    }

    async componentWillMount() {
        const token = localStorage.getItem('access-token');
        const employerId = await getId(token)
        console.log("Employer ID:", employerId.data);
        const employerData = await getEmployerDashboardData(employerId.data);

        if (employerData) {
            this.setState({
                totalJobs: employerData.totalJobs,
                totalApplications: employerData.totalApplications,
                newApplications: employerData.newApplications,
                latestJobs: employerData.latestJobs || [],
                latestApplications: employerData.latestApplications || []
            });
        }
    }

    render() {
        const {
            totalJobs,
            totalApplications,
            newApplications,
            latestJobs,
            latestApplications
        } = this.state;

        return (
            <div class="main d-flex">
                <EmployerSidebar />
                <div id="dashboard" class="container-fluid p-4 bg-custom" style="min-height: 100vh;">
                    <h2 class="mb-4 text-dark fw-bold">Employer Dashboard</h2>

                  
                    <h3 className="text-primary fw-bold">Analysis</h3>
                    <div class="row g-4 mb-4">
                        {[
                            { title: "Jobs Created", value: totalJobs, icon: "bi-briefcase-fill" },
                            { title: "Applications", value: totalApplications, icon: "bi-file-earmark-text-fill" },
                            { title: "Open Applications", value: newApplications, icon: "bi-file-earmark-text-fill" }
                        ].map((stat, i) => (
                            <div class="col-md-4" key={i}>
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

                    <h3 className="text-primary fw-bold">Recents</h3>
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
