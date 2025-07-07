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
        const { totalEmployers, totalJobs, totalCandidates, totalApplications, latestJobs, latestApplications } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" class="page-section">
                    <h2>Admin Dashboard</h2>
                    <div class="dashboard-stats">
                        <div className="stat-item">
                            <h3>Total Employers</h3>
                            <p>{totalEmployers != 0 ? totalEmployers : "Loading..."}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Total Jobs</h3>
                            <p>{totalJobs != 0 ? totalJobs : "Loading..."}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Total Candidates</h3>
                            <p>{totalCandidates != 0 ? totalCandidates : "Loading..."}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Total Applications</h3>
                            <p>{totalApplications != 0 ? totalApplications : "Loading..."}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Latest Jobs</h3>
                            <ul>
                                {latestJobs.length > 0 ? latestJobs.map(job => (
                                    <li key={job.id}>
                                        <strong>{job.title}</strong> - {job.location} ({job.experienceRequired} years exp.)
                                        <p>{job.description}</p>
                                    </li>
                                )) : <p>No jobs available</p>}
                            </ul>
                        </div>
                        <div className="stat-item">
                            <h3>Latest Applications</h3>
                            <ul>
                                {latestApplications.length > 0 ? latestApplications.map(application => (
                                    <li key={application.id}>
                                        <strong>{application.jobTitle}</strong> at {application.companyName} by {application.candidateName}
                                        <p>Status: {application.status}</p>
                                    </li>
                                )) : <p>No applications available</p>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
