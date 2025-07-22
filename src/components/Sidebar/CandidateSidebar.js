import { Component } from 'inferno';

export default class CandidateSidebar extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('access-token');
        localStorage.removeItem('role');
        document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
        window.location.href = '/';
    };

    render() {
        return (
            <div className="main-sidebar bg-white shadow-lg" style="min-height: 100vh;">

                <aside className="aside p-3">
                    <div className="logo-div d-flex align-items-center mb-4">
                        <img src="/assets/images/logo.jfif" alt="Logo"
                            className="cmp-logo img-fluid me-2 rounded"
                            style="width: 50px; height: 50px;" />
                        <span className="logo-name-aside fs-5 fw-bold text-primary">Job Portal</span>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item py-2 border-0">
                            <a className="text-decoration-none text-dark d-block" href="/apply-jobs">
                                <i className="bi bi-briefcase me-2"></i> Jobs
                            </a>
                        </li>
                        <li className="list-group-item py-2 border-0">
                            <a className="text-decoration-none text-dark d-block" href="/my-applications">
                                <i className="bi bi-file-earmark-text me-2"></i>My Applications
                            </a>
                        </li>
                        <li className="list-group-item py-2 border-0">
                            <a className="text-decoration-none text-danger d-block" onClick={this.handleClick} href="#">
                                <i className="bi bi-box-arrow-right me-2"></i> Logout
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
        );
    }
}
