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
                    <div class="logo-div d-flex m-3 ">
                        <img src="/assets/images/logo.jfif" alt="Logo" className="cmp-logo img-fluid"
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
            </div>

        );
    }
}
