import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getApplicationData } from '../../services/ApiService.js';

export default class ApplicationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationData: []
        };
    }
    async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("applicationId");
        const applicationData = await getApplicationData(id);
        this.setState({ applicationData: applicationData || [] });
    }

    render() {
        return (
            <div id="application-detail" className="page-section d-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="container mt-4">
                    <h2 className="mb-4">Application Detail</h2>
                </div>
            </div>
        );
    }
}
