import { Component } from 'inferno';
import CamdidateSidebar from '../Sidebar/CandidateSidebar.js';
import { getJobsData, getSkillsData, getCategoriesData, applyApplication } from '../../services/ApiService.js';
import debounce from 'lodash/debounce.js';

export default class ApplyJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            skills: [],
            categories: [],
            search: '',
            skill: '',
            category: '',
            pageNumber: 1,
            pageSize: 2,
            showModal: false,
            form: {
                jobId: null,
                experience: '',
                noteForEmployer: '',
                coverLetter: null,
                resume: null
            },
            validationError: ''
        };
        this.debouncedFetchJobs = debounce(this.fetchJobs.bind(this), 500);
    }

    async componentWillMount() {
        this.fetchJobs();
        const skillsData = await getSkillsData();
        this.setState({ skills: skillsData || [] });
        const categoriesData = await getCategoriesData();
        this.setState({ categories: categoriesData || [] });
    }

    componentWillUnmount() {
        this.debouncedFetchJobs.cancel();
    }

    async fetchJobs() {
        const { search, skill, category, pageNumber, pageSize } = this.state;
        const filters = {
            search,
            skill,
            category,
            pageNumber,
            pageSize
        };
        const jobsData = await getJobsData(filters);
        this.setState({ jobs: jobsData || [] });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.debouncedFetchJobs();
        });
    };

    handlePageSizeChange = (e) => {
        this.setState({ pageSize: parseInt(e.target.value), pageNumber: 1 }, () => this.fetchJobs());
    };

    handleRedirects = (id) => {
        window.location.href = `/apply-job?jobId=${id}`;
    };

    changePage = (direction) => {
        const newPage = this.state.pageNumber + direction;
        if (newPage < 1) return;
        this.setState({ pageNumber: newPage }, () => this.fetchJobs());
    };

    handleShowModal = (jobId) => {
        this.setState({ form: { jobId: jobId }, showModal: true });
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false,
            form: {
                jobId: null,
                experience: '',
                noteForEmployer: '',
                coverLetter: null,
                resume: null
            },
            validationError: ''
        });
    };

    handleFormChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    };

    handleFileChange = (e) => {
        const { name, files } = e.target;
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: files[0]
            }
        }));
    };

    handleApplyJob = async () => {
        const { jobId, experience, noteForEmployer, coverLetter, resume } = this.state.form;

        if (!experience || !coverLetter || !resume) {
            this.setState({ validationError: 'Please fill all required fields.' });
            return;
        }

        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('experience', experience);
        formData.append('noteForEmployer', noteForEmployer || '');
        formData.append('coverLetter', coverLetter);
        formData.append('resume', resume);

        const success = await applyApplication(formData);
        if (success) {
            this.setState({
                showModal: false,
                form: {
                    jobId: null,
                    experience: '',
                    noteForEmployer: '',
                    coverLetter: null,
                    resume: null
                },
                validationError: ''
            });
            this.fetchJobs();
        } else {
            alert('Failed to apply job. Please try again.');
        }
    };

    render() {
        const {
            jobs, search, skill, category, pageSize, pageNumber
        } = this.state;

        return (
            <div class="main d-flex">
                <CamdidateSidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">
                    <h2 className="mb-4 text-primary">Apply Jobs</h2>

                    <div className="mb-4 bg-white border rounded-3 shadow-sm p-3 px-md-4">
                        <h5 className="text-primary mb-3">Filter Jobs</h5>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Search Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Software Engineer"
                                    name="search"
                                    value={search}
                                    onInput={this.handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 d-flex gap-3 justify-content-end">
                                <div>
                                    <label className="form-label fw-semibold">Skill</label>
                                    <select
                                        className="form-select py-2"
                                        name="skill"
                                        value={skill}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">All</option>
                                        {this.state.skills.map((s) => (
                                            <option key={s.id} value={s.name}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label fw-semibold">Category</label>
                                    <select
                                        className="form-select py-2"
                                        name="category"
                                        value={category}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">All</option>
                                        {this.state.categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div className="col-md-6 mb-4" key={job.id}>
                                    <div className="card h-100 shadow-sm border-0">
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="card-title text-primary fw-bold">{job.title} - {job.categoryName} </h5>
                                                <h6 className="text-muted mb-2">{job.companyName || "Company Name"}</h6>
                                                <div className="mb-2 text-muted">
                                                    <i className="bi bi-geo-alt"></i> {job.location} &nbsp; | &nbsp;
                                                    <i className="bi bi-briefcase"></i> {job.experienceRequired || 0} + &nbsp; | &nbsp;
                                                    <i className="bi bi-cash-coin"></i> {job.salaryRange || "Not disclosed"}
                                                </div>
                                                <p className="text-muted small">{job.description.slice(0, 100)}...</p>

                                                <div className="mb-2">
                                                    {(job.skills || []).slice(0, 4).map((s, i) => (
                                                        <span className="badge bg-light text-dark border me-1" key={i}>{s}</span>
                                                    ))}
                                                </div>
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
                                            <div className="d-flex justify-content-end align-items-center mt-2">
                                                {job.isApplied ? (
                                                     <button className="btn btn-outline-primary btn-sm me-2" disabled>
                                                     Applied
                                                 </button>
                                                ) : <button className="btn btn-outline-primary btn-sm me-2" onClick={() => this.handleShowModal(job.id)}>
                                                    Apply
                                                </button>}

                                                <button className="btn btn-primary btn-sm" onClick={() => this.handleRedirects(job.id)}>
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-4">
                                <p>No jobs found.</p>
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
                                <h5>Apply Job</h5>
                                <button onClick={this.handleCloseModal} className="close-btn">×</button>
                            </div>
                            <div className="custom-modal-body">
                                <label>Experience (years) *</label>
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    name="experience"
                                    value={this.state.form.experience || ''}
                                    onInput={this.handleFormChange}
                                />

                                <label>Note for Employer</label>
                                <textarea
                                    className="form-control mb-2"
                                    name="noteForEmployer"
                                    value={this.state.form.noteForEmployer || ''}
                                    onInput={this.handleFormChange}
                                />

                                <label>Cover Letter *</label>
                                <input
                                    type="file"
                                    className="form-control mb-2"
                                    name="coverLetter"
                                    onChange={this.handleFileChange}
                                />

                                <label>Resume *</label>
                                <input
                                    type="file"
                                    className="form-control mb-2"
                                    name="resume"
                                    onChange={this.handleFileChange}
                                />

                                {this.state.validationError && (
                                    <div className="text-danger mb-2">{this.state.validationError}</div>
                                )}

                                <button className="btn btn-primary mt-2" onClick={this.handleApplyJob}>
                                    Apply
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
