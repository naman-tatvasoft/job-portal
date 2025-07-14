import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getCategoriesData, deleteCategoryData } from '../../services/ApiService.js';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    async componentWillMount() {
        this.fetchCategories();
    }

    async fetchCategories() {
        const categoryData = await getCategoriesData();
        this.setState({ categories: categoryData || [] });
    }

    handleDeleteCategory = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;
    
        const deleted = await deleteCategoryData(id);
        console.log("delete", deleted);
        if (deleted) {
            this.setState(prevState => ({
                categories: prevState.categories.filter(cat => cat.id !== id)
            }));
        } else {
            alert("Failed to delete category. Please try again.");
        }
    };

    render() {
        const { categories } = this.state;
        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">

                    <div className="d-flex justify-content-between">

                        <h2 className="mb-4 text-primary">Categories</h2>
                        <div>
                            <a className="btn btn-primary" href="/add-edit-category">+ Add Category</a>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Category Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length > 0 ? (
                                            categories.map((category) => (
                                                <tr key={category.id}>
                                                    <td>{category.id}</td>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <a className="" href={`/add-edit-category?categoryId=${category.id}`}><i class="fa-solid me-3 fa-pen"></i></a>
                                                        <i class="fa-solid fa-trash-can" onClick={() => this.handleDeleteCategory(category.id)} ></i>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">No categories found</td>
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
