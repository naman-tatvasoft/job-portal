import { Component } from 'inferno';

export default class Applications extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };

    }

    async componentWillMount() {
        
    }

    render() {
    
        return (
            <div id="dashboard" class="page-section">
                <h1>Job Portal</h1>
                <h2>Applications</h2>
                <div className="sidebar">
                    <ul>
                        <li><a href="/admin-dashboard">Dashboard</a></li>
                        <li><a href="/admin-manage-candidates">Users</a></li>
                        <li><a href="/jobs">Jobs</a></li>
                        <li><a href="/applications">Applications</a></li>
                        <li><a href="/logout">logout</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}
