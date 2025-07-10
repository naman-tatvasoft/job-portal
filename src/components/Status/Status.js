import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getStatusData } from '../../services/ApiService.js';

export default class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: []
        };
    }

    async componentWillMount() {
        this.fetchStatuses();
    }

    async fetchStatuses() {
        const statusData = await getStatusData();
        this.setState({ statuses: statusData || [] });
    }

    render() {
        const { statuses } = this.state;
        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">

                    <div className="d-flex justify-content-between">

                        <h2 className="mb-4 text-primary">Statuses</h2>
                        <div>
                            <a className="btn btn-primary" href="/add-edit-status">+ Add status</a>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Status Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statuses.length > 0 ? (
                                            statuses.map((status) => (
                                                <tr key={status.id}>
                                                    <td>{status.id}</td>
                                                    <td>{status.name}</td>
                                                    <td>
                                                        <a className="" href={`/add-edit-status?statusId=${status.id}`}><i class="fa-solid me-3 fa-pen"></i></a>
                                                        <i class="fa-solid fa-trash-can" ></i>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">No status found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
