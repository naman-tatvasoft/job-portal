import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';

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
            <div id="dashboard" class="page-section d-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div>
                    <h2>Applications</h2>
                </div>
            </div>
        );
    }
}
