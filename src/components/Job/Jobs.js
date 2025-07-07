import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getJobsData, getSkillsData, getCategoriesData  } from '../../services/ApiService.js';
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

    }

    async componentWillMount() {
        this.fetchJobs();
        const skillsData = await getSkillsData();
        this.setState({ skills: skillsData || [] });
        const categoriesData = await getCategoriesData();
        this.setState({ categories: categoriesData || [] });
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
        this.setState({ [name]: value }, () => this.fetchJobs());
    };

    handlePageSizeChange = (e) => {
        this.setState({ pageSize: parseInt(e.target.value), pageNumber: 1 }, () => this.fetchJobs());
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
            <div id="dashboard" class="page-section d-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div class="container mt-4">
                    <h2 class="mb-4">Job Listings</h2>

                    {/* Filters Row */}
                    <div class="row mb-4 g-2">
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Search Title" name="search" value={search} onInput={this.handleInputChange} />
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control" placeholder="Location" name="location" value={location} onInput={this.handleInputChange} />
                        </div>
                        <div class="col-md-2">
                            <input type="number" class="form-control" placeholder="Experience" name="experience" value={experience} onInput={this.handleInputChange} />
                        </div>
                        <div class="col-md-2">
                            <select class="form-select" name="skill" value={skill} onChange={this.handleInputChange}>
                                <option value="">Select Skill</option>
                                {this.state.skills.map((skill) => (
                                    <option key={skill.id} value={skill.name}>{skill.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="form-select" name="category" value={category} onChange={this.handleInputChange}>
                                <option value="">Select Category</option>
                                {this.state.categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Jobs Table */}
                    <div class="table-responsive">
                        <table class="table table-striped">
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
                                        <tr key={job.id}>
                                            <td>{job.id}</td>
                                            <td>{job.title} - {job.categoryName}</td>
                                            <td>{job.description}</td>
                                            <td>{job.location}</td>
                                            <td>{job.experienceRequired} yrs</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" class="text-center">No jobs found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div class="d-flex justify-content-between">
                        <div>
                            <div class="col-md-8">
                                <select class="form-select" name="pageSize" value={pageSize} onChange={this.handlePageSizeChange}>
                                    <option value="2">2 / page</option>
                                    <option value="5">5 / page</option>
                                    <option value="10">10 / page</option>
                                    <option value="20">20 / page</option>
                                </select>
                            </div>
                            <span>Page {pageNumber}</span>
                        </div>
                        <div>
                            <button class="btn btn-outline-primary" onClick={() => this.changePage(-1)} disabled={pageNumber <= 1}>
                                ← Previous
                            </button>
                            <button class="btn btn-outline-primary" onClick={() => this.changePage(1)}>
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
