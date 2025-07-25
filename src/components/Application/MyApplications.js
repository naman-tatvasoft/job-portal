import { Component } from 'inferno';
import CandidateSidebar from '../Sidebar/CandidateSidebar.js';
import { getMyApplicationsData, getStatusData, withdrawApplication } from '../../services/ApiService.js';
import debounce from 'lodash/debounce.js';

export default class MyApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            statusData: [],
            search: '',
            status: '',
            pageNumber: 1,
            pageSize: 5,
            changeStatusApplicationId: 0,
            showModal: false
        };
        this.debouncedFetchApplications = debounce(this.fetchApplications.bind(this), 500);
    }

    async componentWillMount() {
        this.fetchApplications();
        const statusData = await getStatusData();
        this.setState({ statusData: statusData });
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
        console.log(filters);
        const applicationsData = await getMyApplicationsData(filters);
        this.setState({ applications: applicationsData || [] });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.debouncedFetchApplications();
        });
    };

    handleStatusChange = (e) => {
        this.setState({ changeStatusId: parseInt(e.target.value) });
    };

    handlePageSizeChange = (e) => {
        this.setState({ pageSize: parseInt(e.target.value), pageNumber: 1 }, () => this.fetchApplications());
    };


    handleRedirects = (id) => {
        window.location.href = `/my-application?applicationId=${id}`;
    };

    changePage = (direction) => {
        const newPage = this.state.pageNumber + direction;
        if (newPage < 1) return;
        this.setState({ pageNumber: newPage }, () => this.fetchApplications());
    };


    handleShowModal = (id) => {
        this.setState({ showModal: true, changeStatusApplicationId: id });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, changeStatusApplicationId: 0 });
    };

    handleUpdateStatus = async () => {
        const { changeStatusApplicationId } = this.state;
        if (changeStatusApplicationId) {
            const isUpdated = await withdrawApplication(changeStatusApplicationId);
            if (isUpdated) {
                this.setState({ showModal: false, changeStatusApplicationId: 0 }, () => this.fetchApplications());
            }
        }
    };

    render() {
        const { applications, search, status, statusData, pageSize, pageNumber } = this.state;
        return (
            <div class="main d-flex">
                <CandidateSidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">
                    <h2 className="mb-4 text-primary">My Applications</h2>
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
                    <div className="row">
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <div className="col-md-6 mb-4" key={application.id}>
                                    <div className="card h-100 shadow-sm border-0">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between" style={{ cursor: 'pointer' }} onClick={() => this.handleRedirects(application.id)}>
                                                <p className="mb-1"><i className="bi bi-briefcase-fill"></i> <strong>{application.jobTitle}</strong> @ {application.companyName}</p>

                                                <span className="badge bg-secondary pt-2">{application.status}</span>
                                            </div>
                                            <p className="mb-1"><i className="bi bi-geo-alt-fill"></i> {application.jobLocation}</p>
                                            <p className="mb-1"><i className="bi bi-clock-history"></i> Applied on: {new Date(application.applicationDate).toLocaleDateString()}</p>
                                            <p className="mb-2"><i className="bi bi-person-workspace"></i> {application.experience} yrs experience</p>
                                            {application.noteForEmployer && (
                                                <p className="text-muted fst-italic small mb-2">Note: {application.noteForEmployer}</p>
                                            )}
                                            <div className="d-flex gap-2 justify-content-end align-items-center mt-2">
                                                <button className="btn btn-primary btn-sm" onClick={() => this.handleRedirects(application.id)}>
                                                    View
                                                </button>
                                                {application.status == 'Withdrawn' ? null :
                                                    <button className="btn btn-outline-primary btn-sm" onClick={() => this.handleShowModal(application.id, application.statusId)}>
                                                        Withdraw application
                                                    </button>

                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">No applications found.</p>
                            </div>
                        )}
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
                {this.state.showModal && (
                    <div className="custom-modal-backdrop">
                        <div className="custom-modal">
                            <div className="custom-modal-header">
                                <h5>Are you sure you want to Withdraw?</h5>
                                <button onClick={this.handleCloseModal} className="close-btn">×</button>
                            </div>
                            <div className="custom-modal-body d-flex justify-content-center gap-2">
                                <button className="btn btn-primary mt-2" onClick={() => this.handleUpdateStatus()}>
                                    Yes
                                </button>
                                <button className="btn btn-danger mt-2" onClick={this.handleCloseModal}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
