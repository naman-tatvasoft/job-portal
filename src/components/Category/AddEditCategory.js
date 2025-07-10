import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import {
    getCategoryById,
    addCategoryData,
    updateCategoryData
} from '../../services/ApiService.js';

export default class AddEditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: null,
            categoryName: '',
            validationError: '',
            showToast: false,
            isEdit: false
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("categoryId");

        if (id) {
            const data = await getCategoryById(id);
            if (data) {
                this.setState({
                    categoryId: id,
                    categoryName: data.name,
                    isEdit: true
                });
            }
        }
    }

    handleChange = (e) => {
        this.setState({ categoryName: e.target.value, validationError: '' });
    };

    handleSubmit = async () => {
        const { categoryId, categoryName, isEdit } = this.state;

        if (categoryName.trim() === '') {
            this.setState({ validationError: 'Category name is required' });
            return;
        }

        const payload = { name: categoryName };

        const success = isEdit
            ? await updateCategoryData(categoryId, payload)
            : await addCategoryData(payload);

        console.log(success,"success");
        
        
        
        
        
        
        
        
        
        if (success) {
            this.setState({
                showToast: true,
                validationError: ''
            });

            setTimeout(() => {
                window.location.href = "/category";
            }, 1000);
        } else {
            this.setState({ validationError: "Operation failed. Try again." });
        }
    };

    render() {
        const {
            categoryName,
            validationError,
            showToast,
            isEdit
        } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="add-edit-category" className="container-fluid p-4 bg-custom">

                    <div className="d-flex justify-content-between">
                        <h2 className="mb-4 text-primary">{isEdit ? 'Edit' : 'Add'} Category</h2>
                        <a class="btn btn-primary h-50 mt-2" href="/category">← Back to Categories</a>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <label htmlFor="categoryName" className="form-label">Category Name</label>
                            <input
                                type="text"
                                className={`form-control ${validationError ? 'is-invalid' : ''}`}
                                id="categoryName"
                                value={categoryName}
                                onInput={this.handleChange}
                                placeholder="Enter category name"
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
                                    Category {isEdit ? 'updated' : 'added'} successfully!
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
