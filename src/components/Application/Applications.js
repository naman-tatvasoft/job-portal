import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getApplicationsData, getStatusData } from '../../services/ApiService.js';
import debounce from 'lodash/debounce.js';
export default class Applications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            statusData: [],
            search: '',
            status: '',
            pageNumber: 1,
            pageSize: 2
        };
        this.debouncedFetchApplications = debounce(this.fetchApplications.bind(this), 500);
    }

    async componentWillMount() {
        this.fetchApplications();
        const statusData = await getStatusData();
        this.setState({ statusData: statusData || [] });
    }

    componentWillUnmount() {
        this.debouncedFetchApplications.cancel();
    }

    async fetchApplications() {
        const { search, status, pageNumber, pageSize } = this.state;
        const filters = {
            search,
            status,
            pageNumber,
            pageSize
        };
        const applicationsData = await getApplicationsData(filters);
        this.setState({ applications: applicationsData || [] });
    }


    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.debouncedFetchApplications();
        });
    };

    handlePageSizeChange = (e) => {
        this.setState({ pageSize: parseInt(e.target.value), pageNumber: 1 }, () => this.fetchApplications());
    };

    handleRedirects = (id) => {
        window.location.href = `/application?applicationId=${id}`;
    };

    changePage = (direction) => {
        const newPage = this.state.pageNumber + direction;
        if (newPage < 1) return;
        this.setState({ pageNumber: newPage }, () => this.fetchApplications());
    };

    render() {
        const { applications, search, status, statusData, pageSize, pageNumber } = this.state;
        return (
            <div id="applications" className="page-section d-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="container mt-4">
                    <h2 className="mb-4">Applications Listing</h2>
                    <div className="row mb-4 g-2">
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Search..." name="search" value={search} onInput={this.handleInputChange} />
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" name="status" value={status} onChange={this.handleInputChange}>
                                <option value="">Select Status</option>
                                {statusData.map((stat) => (
                                    <option key={stat.id} value={stat.name}>{stat.name}</option>
                                ))}
                            </select>
                        </div>
                        
                    </div>

                    <div className="table-responsive">
                    
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Job Title</th>
                                    <th>Company Name</th>
                                    <th>Job Location</th>
                                    <th>Candidate ID</th>
                                    <th>Candidate Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length > 0 ? (
                                    applications.map((application) => (
                                        <tr key={application.id} onClick={() => this.handleRedirects(application.id)} >
                                            <td>{application.id}</td>
                                            <td>{application.jobTitle}</td>
                                            <td>{application.companyName}</td>
                                            <td>{application.jobLocation}</td>
                                            <td>{application.candidateId}</td>
                                            <td>{application.candidateName}</td>
                                            <td>{application.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No applications found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="col-md-8">
                                <select className="form-select" name="pageSize" value={pageSize} onChange={this.handlePageSizeChange} id="temp">
                                    <option value={2}>2 page</option>
                                    <option value={5}>5 page</option>
                                    <option value={10}>10 page</option>
                                    <option value={20}>20 page</option>
                                </select>
                            </div>
                            <span>Page {pageNumber}</span>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary" onClick={() => this.changePage(-1)} disabled={pageNumber <= 1}>
                                ← Previous
                            </button>
                            <button className="btn btn-outline-primary" onClick={() => this.changePage(1)}>
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
