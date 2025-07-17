import { Component } from 'inferno';
import EmployerSidebar from '../Sidebar/EmployerSidebar.js';
import { getCreatedJobsData, getSkillsData, getCategoriesData, deleteJobData, addJobData, editJobData } from '../../services/ApiService.js';
import debounce from 'lodash/debounce.js';

export default class CreatedJobs extends Component {
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
                id: 0,
                title: '',
                location: '',
                experienceRequired: '',
                description: '',
                categoryId: 0,
                skillsRequiredList: [],
                vacancies: 0,
                openFrom: '',
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
        const jobsData = await getCreatedJobsData(filters);
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
        window.location.href = `/created-job?jobId=${id}`;
    };

    changePage = (direction) => {
        const newPage = this.state.pageNumber + direction;
        if (newPage < 1) return;
        this.setState({ pageNumber: newPage }, () => this.fetchJobs());
    };

    handleDeleteJob = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        const deleted = await deleteJobData(id);
        if (deleted) {
            this.setState(prevState => ({
                jobs: prevState.jobs.filter(job => job.id !== id)
            }));
        } else {
            alert("Failed to delete skill. Please try again.");
        }
    };

    handleShowModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({
            showModal: false, form: {
                id: 0,
                title: '',
                location: '',
                experienceRequired: '',
                description: '',
                categoryId: 0,
                skillsRequiredList: [],
                vacancies: 0,
                openFrom: ''
            },
            validationError: ''
        });
    };

    handleFormChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = (name === 'categoryId' || name === 'experienceRequired' || name === 'vacancies')
            ? (value === '' ? 0 : parseInt(value))
            : value;

        this.setState(prev => ({
            form: {
                ...prev.form,
                [name]: parsedValue
            }
        }));
    };

    handleCheckboxChange = (e, skill) => {
        const { checked } = e.target;

        this.setState((prev) => {
            const updatedSkills = checked
                ? [...prev.form.skillsRequiredList, { id: skill.id, name: skill.name }]
                : prev.form.skillsRequiredList.filter(s => s.id !== skill.id);

            return {
                form: {
                    ...prev.form,
                    skillsRequiredList: updatedSkills
                }
            };
        });
    };

    handleSubmitJob = async () => {
        const { title, location, experienceRequired, categoryId } = this.state.form;

        if (!title || !location || !experienceRequired || !categoryId) {
            this.setState({ validationError: 'Please fill all required fields.' });
            return;
        }

        const { skillsRequiredList } = this.state.form;
        if (skillsRequiredList.length === 0) {
            this.setState({ validationError: 'Please select at least one skill.' });
            return;
        }

        const success = await addJobData(this.state.form);
        if (success) {
            this.setState({
                showModal: false,
                form: {
                    id: 0,
                    title: '',
                    location: '',
                    experienceRequired: '',
                    description: '',
                    categoryId: 0,
                    skillsRequiredList: [],
                    vacancies: 0,
                    openFrom: ''
                },
                validationError: ''
            });
            this.fetchJobs();
        } else {
            alert('Failed to add job. Please try again.');
        }
    };

    handleEditJob = async (jobId) => {
        const { title, location, experienceRequired, categoryId } = this.state.form;

        if (!title || !location || !experienceRequired || !categoryId) {
            this.setState({ validationError: 'Please fill all required fields.' });
            return;
        }

        const { skillsRequiredList } = this.state.form;
        if (skillsRequiredList.length === 0) {
            this.setState({ validationError: 'Please select at least one skill.' });
            return;
        }

        const success = await editJobData(jobId, this.state.form);
        if (success) {
            this.setState({
                showModal: false,
                form: {
                    id: 0,
                    title: '',
                    location: '',
                    experienceRequired: '',
                    description: '',
                    categoryId: 0,
                    skillsRequiredList: [],
                    vacancies: 0,
                    openFrom: ''
                },
                validationError: ''
            });
            this.fetchJobs();
        } else {
            alert('Failed to add job. Please try again.');
        }
    }

    handleEditShowModal = (id) => {
        this.setState({ form: { id: id } })
        const job = this.state.jobs.find(job => job.id === this.state.form.id);
        if (job) {
            this.setState({
                showModal: true,
                form: {
                    ...job
                }
            });
        }
    }

    render() {
        const {
            jobs, search, skill, category, pageSize, pageNumber
        } = this.state;

        return (
            <div class="main d-flex">
                <EmployerSidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">
                    <div className="d-flex justify-content-between">
                        <h2 className="mb-4 text-primary">Created Jobs</h2>
                        <div>
                            <button className="btn btn-primary" onClick={this.handleShowModal}>+ Add Job</button>
                        </div>
                    </div>
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
                                                <div className="d-flex gap-2 justify-content-between align-items-center mt-2">
                                                    <h5 className="card-title text-primary fw-bold">{job.title} - {job.categoryName} </h5>
                                                    <div className="d-flex gap-2 justify-content-end align-items-center mt-2">
                                                        <button className="btn btn-outline-primary btn-sm" onClick={() => this.handleEditShowModal(job.id)}>Edit</button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => this.handleDeleteJob(job.id)} >
                                                            <i class="fa-solid fa-trash-can"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <h6 className="text-muted mb-2">{job.companyName || "Company Name"}</h6>
                                                <div className="mb-2 text-muted">
                                                    <i className="bi bi-geo-alt"></i> {job.location} &nbsp; | &nbsp;
                                                    <i className="bi bi-briefcase"></i> {job.experienceRequired || 0} + &nbsp; | &nbsp;
                                                    <i className="bi bi-cash-coin"></i> {job.salaryRange || "Not disclosed"}
                                                </div>

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
                                {this.state.form.id != 0 ? <h5>Edit Job</h5> : <h5>Add Job</h5>}
                                <button onClick={this.handleCloseModal} className="close-btn">×</button>
                            </div>
                            <div className="custom-modal-body">
                                <label>Job Title *</label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    name="title"
                                    value={this.state.form.title}
                                    onInput={this.handleFormChange}
                                />

                                <label>Location *</label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    name="location"
                                    value={this.state.form.location}
                                    onInput={this.handleFormChange}
                                />

                                <label>Experience (years) *</label>
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    name="experienceRequired"
                                    value={this.state.form.experienceRequired}
                                    onInput={this.handleFormChange}
                                />

                                <label>Category *</label>
                                <select
                                    name="categoryId"
                                    className="form-select mb-2"
                                    value={this.state.form.categoryId}
                                    onChange={this.handleFormChange}
                                >
                                    <option value="" >Select Category</option>
                                    {this.state.categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>

                                <label>Description</label>
                                <textarea
                                    className="form-control mb-2"
                                    name="description"
                                    value={this.state.form.description}
                                    onInput={this.handleFormChange}
                                />

                                <label>vacancies*</label>
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    name="vacancies"
                                    value={this.state.form.vacancies}
                                    onInput={this.handleFormChange}
                                />

                                <label>Open From*</label>
                                <input
                                    type="date"
                                    className="form-control mb-2"
                                    name="openFrom"
                                    value={this.state.form.openFrom}
                                    onInput={this.handleFormChange}
                                />

                                <label>Skills *</label>
                                <div className="skills-checkbox-group mb-2">
                                    {this.state.skills.map((skill) => {
                                        const isChecked = this.state.form.skillsRequiredList.some(s => s.id === skill.id);
                                        return (
                                            <label key={skill.id} className="d-block">
                                                <input
                                                    type="checkbox"
                                                    value={skill.id}
                                                    checked={isChecked}
                                                    onChange={(e) => this.handleCheckboxChange(e, skill)}
                                                />
                                                {' '}
                                                {skill.name}
                                            </label>
                                        );
                                    })}
                                </div>

                                {this.state.validationError && (
                                    <div className="text-danger mb-2">{this.state.validationError}</div>
                                )}

                                {this.state.form.id != 0 ?
                                    <button className="btn btn-primary mt-2" onClick={() => this.handleEditJob(this.state.form.id)}>
                                        Edit Job
                                    </button> :
                                    <button className="btn btn-primary mt-2" onClick={this.handleSubmitJob}>
                                        Add Job
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                )}
            </div>


        );
    }
}
