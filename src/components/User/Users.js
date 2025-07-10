import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import debounce from 'lodash/debounce.js';
import { getUsersData, getRolesData } from '../../services/ApiService.js';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            role: '',
            search: '',
            pageNumber: 1,
            pageSize: 2
        };
        this.debouncedFetchUsers = debounce(this.fetchUsers.bind(this), 500);
    }

    async componentWillMount() {
        this.fetchUsers();
        const rolesData = await getRolesData();
        this.setState({ roles: rolesData || [] });
    }

    componentWillUnmount() {
        this.debouncedFetchUsers.cancel();
    }

    async fetchUsers() {
        const { search, role, pageSize, pageNumber } = this.state;
        const filters = {
            search,
            role,
            pageSize,
            pageNumber
        };
        const usersData = await getUsersData(filters);
        this.setState({ users: usersData || [] });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.debouncedFetchUsers();
        });
    };

    handlePageSizeChange = (e) => {
        this.setState({ pageSize: parseInt(e.target.value), pageNumber: 1 }, () => this.fetchUsers());
    };

    changePage = (direction) => {
        const newPage = this.state.pageNumber + direction;
        if (newPage < 1) return;
        this.setState({ pageNumber: newPage }, () => this.fetchUsers());
    };

    render() {
        const {
            users, search, roles, role, pageNumber, pageSize
        } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">
                    <h2 className="mb-4 text-primary">Users Listings</h2>
                    <div className="mb-4 bg-white border rounded-3 shadow-sm p-3 px-md-4">
                        <h5 className="text-primary mb-3">Filter Users</h5>
                        <div className="row align-items-end">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Search Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Name or Email"
                                    name="search"
                                    value={search}
                                    onInput={this.handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 d-flex gap-3 justify-content-end">
                                <div>
                                    <label className="form-label fw-semibold">Roles</label>
                                    <select
                                        className="form-select py-2"
                                        name="role"
                                        value={role}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">All</option>
                                        {roles.map((r) => (
                                            <option key={r.id} value={r.name}>{r.name}</option>
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
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <tr key={user.id} >
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.roleName}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">No users found.</td>
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
