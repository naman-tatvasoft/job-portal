import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getJobData } from '../../services/ApiService.js';
export default class JobDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobData: []
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("jobId");
        const jobData = await getJobData(id);
        this.setState({ jobData: jobData || [] });
    }
    
    handleBack = (e) => {
        e.preventDefault();
        window.location.href = '/jobs';
    };

    render() {
        const job = this.state.jobData;

        return (
            <div className="main d-flex">
                <Sidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">
                    <h2 className="text-primary mb-0">Job Detail</h2>
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">{job.title || 'Job Title'}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <p><i className="bi bi-geo-alt-fill text-primary me-2"></i><strong>Location:</strong> {job.location}</p>
                                    <p><i className="bi bi-briefcase-fill text-primary me-2"></i><strong>Experience:</strong> {job.experienceRequired} years</p>
                                    <p><i className="bi bi-calendar-event text-primary me-2"></i><strong>Open From:</strong> {new Date(job.openFrom).toLocaleDateString()}</p>
                                </div>
                                <div className="col-md-12 mt-5">
                                    <p><i className="bi bi-people-fill text-primary me-2"></i><strong>Vacancies:</strong> {job.vacancies}</p>
                                    <p><i className="bi bi-tags-fill text-primary me-2"></i><strong>Category:</strong> <span className="badge bg-secondary">{job.categoryName}</span></p>
                                    <p><i className="bi bi-toggle-on text-primary me-2"></i><strong>Status:</strong>
                                        <span className={`badge ${job.isActive ? 'bg-success' : 'bg-danger'} ms-2`}>
                                            {job.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <hr />

                            <div>
                                <h6 className="text-primary">Description</h6>
                                <p>{job.description}</p>
                            </div>

                            <div>
                                <h6 className="text-primary">Skills Required</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {job.skillsRequiredList?.map((s, i) => (
                                        <span className="badge bg-primary-subtle text-primary border border-primary" key={i}>
                                            {s.name}
                                        </span>
                                    )) || <span>No skills listed</span>}
                                </div>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-outline-primary" onClick={this.handleBack}>
                                    ← Back to Jobs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
