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
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" className="container-fluid p-4 bg-light">
                    <h2 className="mb-4 text-primary">Applications Listing</h2>

                    <div className="mb-4 bg-white border rounded-3 shadow-sm p-3 px-md-4">
                        <h5 className="text-primary mb-3">Filter Applications</h5>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Search</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Job Title or Candidate Name"
                                    name="search"
                                    value={search}
                                    onInput={this.handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 d-flex gap-3 justify-content-end">
                                <div>
                                    <label className="form-label fw-semibold">Status</label>
                                    <select
                                        className="form-select py-2"
                                        name="status"
                                        value={status}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">All</option>
                                        {statusData.map((stat) => (
                                            <option key={stat.id} value={stat.name}>{stat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>ID</th>
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
                                                <tr key={application.id} onClick={() => this.handleRedirects(application.id)} style={{ cursor: "pointer" }}>
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
                                                <td colSpan="7" className="text-center py-4">No applications found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="d-flex align-items-center gap-2">
                            <select className="form-select w-auto" name="pageSize" value={pageSize} onChange={this.handlePageSizeChange}>
                                <option value={2}>2 per page</option>
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                            </select>
                            <span className="ms-2">Page {pageNumber}</span>
                        </div>
                        <div className="d-flex gap-2">
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
