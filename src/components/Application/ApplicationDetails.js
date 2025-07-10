import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getApplicationData } from '../../services/ApiService.js';

export default class ApplicationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationData: []
        };
    }
    
    async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("applicationId");
        const applicationData = await getApplicationData(id);
        this.setState({ applicationData: applicationData || [] });
    }
    
    handleBack = (e) => {
        e.preventDefault();
        window.location.href = '/applications';
    };

    render() {
        const { applicationData } = this.state;
        const API_BASE = 'http://localhost:5246';
        return (
            <div id="application-detail" className="page-section d-flex">
                    <Sidebar />
                <div className="container-fluid p-4 bg-custom">
                    <h2 className="mb-4">Application Detail</h2>
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">{applicationData.jobTitle || 'Job Title'}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <p><i className="bi bi-building text-primary me-2"></i><strong>Company:</strong> {applicationData.companyName}</p>
                                    <p><i className="bi bi-geo-alt-fill text-primary me-2"></i><strong>Location:</strong> {applicationData.jobLocation}</p>
                                    <p><i className="bi bi-person-fill text-primary me-2"></i><strong>Candidate:</strong> {applicationData.candidateName}</p>
                                    <p><i className="bi bi-envelope-fill text-primary me-2"></i><strong>Email:</strong> {applicationData.candidateEmail}</p>
                                    <p><i className="bi bi-calendar-event text-primary me-2"></i><strong>Application Date:</strong> {new Date(applicationData.applicationDate).toLocaleDateString()}</p>
                                </div>
                                <div className="col-md-12 mt-5">
                                    <p><i className="bi bi-file-text-fill text-primary me-2"></i><strong>Experience:</strong> {applicationData.experience} years</p>
                                    <p><i className="bi bi-chat-left-text-fill text-primary me-2"></i><strong>Note for Employer:</strong> {applicationData.noteForEmployer}</p>
                                    <p><i className="bi bi-file-earmark-pdf-fill text-primary me-2"></i><strong>Status:</strong> {applicationData.status}</p>
                                </div>
                            </div>

                            <hr />

                            <div>
                                <h6 className="text-primary">Cover Letter</h6>
                                {/* downloadable coverletter */}
                                

                                {applicationData.coverLetterName ? (
                                    <a href={`${API_BASE}/uploads/CoverLetters/${applicationData.coverLetterName}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        View Cover Letter
                                    </a>
                                ) : (
                                    <p className="text-muted">No cover letter provided</p>
                                )}
                            </div>
                            <div>
                                <h6 className="text-primary">Resume</h6>
                                {applicationData.resumeName ? (
                                    <a href={`${API_BASE}/uploads/resumes/${applicationData.resumeName}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        View Resume
                                    </a>
                                ) : (
                                    <p className="text-muted">No Resume provided</p>
                                )}
                            </div>
                            <div className="text-end">
                                <button className="btn btn-outline-primary" onClick={this.handleBack}>
                                    ← Back to Applications
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
