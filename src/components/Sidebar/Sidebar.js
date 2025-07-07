import { Component } from 'inferno';

export default class Sidebar extends Component {
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
            <div class="main-sidebar">
                <aside class="aside">
                    <div class="logo-div d-flex m-3">
                        <img src="~/assets/logos/job-portal.png" alt="Logo" class="cmp-logo"
                            style="width: 55px; height: 45px;" />
                        <span class="logo-name-aside align-self-center">Job Portal</span>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <span class="icon-name"><a class="text-decoration-none" href="/admin-dashboard">Dashboard</a></span>
                        </li>
                        <li
                            class="list-group-item">
                            <span class="icon-name"><a class="text-decoration-none" href="/admin-manage-candidates">Users</a></span>
                        </li>
                        <li
                            class="list-group-item">
                            <span class="icon-name"><a class="text-decoration-none" href="/jobs">Jobs</a></span>
                        </li>
                        <li
                            class="list-group-item">
                            <span class="icon-name"><a class="text-decoration-none" href="/applications">Applications</a></span>
                        </li>
                        <li
                            class="list-group-item">
                            <span class="icon-name"><a class="text-decoration-none" onClick={this.handleClick} >logout</a></span>
                        </li>


                    </ul>
                </aside>
                <div class="main-content vh-100">
                    <div class="navbar-header d-flex justify-content-between">
                        <div>
                            <button class="btn off-canvas-btn " type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                                <img src="~/assets/icons/menu-bar.svg" alt="" class="menu-icon" />here
                            </button>
                            <div class="offcanvas offcanvas-start offcanvas-class" data-bs-scroll="true"
                                data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
                                aria-labelledby="offcanvasScrollingLabel">
                                <div class="offcanvas-header">
                                    <div class="logo-div d-flex align-items-center justify-content-center m-3">
                                        <img src="~/assets/logos/pizzashop_logo.png" alt="Logo" class="cmp-logo"
                                            style="width: 55px; height: 45px;" />
                                        <span class="logo-name-aside">PIZZASHOP</span>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <span class="icon-name"><a class="text-decoration-none" href="/admin-dashboard">Dashboard</a></span>
                                    </li>
                                    <li
                                        class="list-group-item">
                                        <span class="icon-name"><a class="text-decoration-none" href="/admin-manage-candidates">Users</a></span>
                                    </li>
                                    <li
                                        class="list-group-item">
                                        <span class="icon-name"><a class="text-decoration-none" href="/jobs">Jobs</a></span>
                                    </li>
                                    <li
                                        class="list-group-item">
                                        <span class="icon-name"><a class="text-decoration-none" href="/applications">Applications</a></span>
                                    </li>
                                    <li
                                        class="list-group-item">
                                        <span class="icon-name"><a class="text-decoration-none" onClick={this.handleClick} >logout</a></span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}
