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

    render() {
        return (
            <div id="job-detail" className="page-section d-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="container mt-4">
                    <h2 className="mb-4">Job Detail</h2>
                    <div className="job-detail">
                        <h3>{this.state.jobData.title}</h3>
                        <p><strong>Description:</strong> {this.state.jobData.description}</p>
                        <p><strong>Location:</strong> {this.state.jobData.location}</p>
                        <p><strong>Experience Required:</strong> {this.state.jobData.experienceRequired} years</p>
                        <p><strong>Status:</strong> {this.state.jobData.isActive ? 'Active' : 'Inactive'}</p>
                        <p><strong>Open From:</strong> {new Date(this.state.jobData.openFrom).toLocaleDateString()}</p>
                        <p><strong>Vacancies:</strong> {this.state.jobData.vacancies}</p>
                        <p><strong>Skills Required:</strong> {this.state.jobData.skillsRequiredList?.map(skill => skill.name).join(', ')}</p>
                        <p><strong>Category:</strong> {this.state.jobData.categoryName}</p>
                    </div>
                </div>
            </div>
        );
    }
}
