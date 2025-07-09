import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getJobsData, getSkillsData, getCategoriesData } from '../../services/ApiService.js';
import debounce from 'lodash/debounce.js';

export default class Jobs extends Component {
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
            pageSize: 2
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
        window.location.href = `/job?jobId=${id}`;
    };

    changePage = (direction) => {
        const newPage = this.state.pageNumber + direction;
        if (newPage < 1) return;
        this.setState({ pageNumber: newPage }, () => this.fetchJobs());
    };

    render() {
        const {
            jobs, search, skill, category, pageSize, pageNumber
        } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" className="container-fluid p-4 bg-light">
                    <h2 className="mb-4 text-primary">Job Listings</h2>

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

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Title - Category</th>
                                            <th>Description</th>
                                            <th>Location</th>
                                            <th>Experience</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.length > 0 ? (
                                            jobs.map((job) => (
                                                <tr key={job.id} onClick={() => this.handleRedirects(job.id)} style={{ cursor: "pointer" }}>
                                                    <td>{job.id}</td>
                                                    <td>{job.title} - {job.categoryName}</td>
                                                    <td>{job.description}</td>
                                                    <td>{job.location}</td>
                                                    <td>{job.experienceRequired} yrs</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">No jobs found.</td>
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
