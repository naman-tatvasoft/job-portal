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
            location: '',
            experience: 0,
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
        const { search, skill, location, experience, category, pageNumber, pageSize } = this.state;
        const filters = {
            search,
            skill,
            location,
            experience,
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
            jobs, search, skill, location,
            experience, category, pageSize, pageNumber
        } = this.state;

        return (
            <div id="jobs" className="page-section d-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="container mt-4">
                    <h2 className="mb-4">Job Listings</h2>

                    <div className="row mb-4 g-2">
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Search Title" name="search" value={search} onInput={this.handleInputChange} />
                        </div>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="Location" name="location" value={location} onInput={this.handleInputChange} />
                        </div>
                        <div className="col-md-2">
                            <input type="number" className="form-control" placeholder="Experience" name="experience" value={experience} onInput={this.handleInputChange} />
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" name="skill" value={skill} onChange={this.handleInputChange}>
                                <option value="">Select Skill</option>
                                {this.state.skills.map((skill) => (
                                    <option key={skill.id} value={skill.name}>{skill.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" name="category" value={category} onChange={this.handleInputChange}>
                                <option value="">Select Category</option>
                                {this.state.categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title - category</th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.length > 0 ? (
                                    jobs.map((job) => (
                                        <tr key={job.id}  onClick={() => this.handleRedirects(job.id)}>
                                            <td  >{job.id}</td>
                                            <td>{job.title} - {job.categoryName}</td>
                                            <td>{job.description}</td>
                                            <td>{job.location}</td>
                                            <td>{job.experienceRequired} yrs</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No jobs found.</td>
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
