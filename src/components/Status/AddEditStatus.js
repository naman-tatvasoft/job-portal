import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import {
    getStatusById,
    addStatusData,
    updateStatusData
} from '../../services/ApiService.js';

export default class AddEditStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusId: null,
            statusName: '',
            validationError: '',
            showToast: false,
            isEdit: false
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("statusId");

        if (id) {
            const data = await getStatusById(id);
            if (data) {
                this.setState({
                    statusId: id,
                    statusName: data.name,
                    isEdit: true
                });
            }
        }
    }

    handleChange = (e) => {
        this.setState({ statusName: e.target.value, validationError: '' });
    };

    handleSubmit = async () => {
        const { statusId, statusName, isEdit } = this.state;

        if (statusName.trim() === '') {
            this.setState({ validationError: 'status name is required' });
            return;
        }

        const payload = { name: statusName };

        const success = isEdit
            ? await updateStatusData(statusId, payload)
            : await addStatusData(payload);
        
        if (success) {
            this.setState({
                showToast: true,
                validationError: ''
            });

            setTimeout(() => {
                window.location.href = "/status";
            }, 1000);
        } else {
            this.setState({ validationError: "Operation failed. Try again." });
        }
    };

    render() {
        const {
            statusName,
            validationError,
            showToast,
            isEdit
        } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="add-edit-category" className="container-fluid p-4 bg-custom">

                    <div className="d-flex justify-content-between">
                        <h2 className="mb-4 text-primary">{isEdit ? 'Edit' : 'Add'} Status</h2>
                        <a class="btn btn-primary h-50 mt-2" href="/status">← Back to Status</a>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <label htmlFor="statusName" className="form-label">Status Name</label>
                            <input
                                type="text"
                                className={`form-control ${validationError ? 'is-invalid' : ''}`}
                                id="statusName"
                                value={statusName}
                                onInput={this.handleChange}
                                placeholder="Enter status name"
                            />
                            {validationError && (
                                <div className="invalid-feedback d-block">{validationError}</div>
                            )}

                            <div className="mt-4 text-end">
                                <button className="btn btn-primary" onClick={this.handleSubmit}>
                                    {isEdit ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {showToast && (
                        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
                            <div className="toast show bg-success text-white" role="alert">
                                <div className="toast-body">
                                    Status {isEdit ? 'updated' : 'added'} successfully!
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
