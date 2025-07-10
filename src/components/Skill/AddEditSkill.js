import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import {
    getSkillById,
    addSkillData,
    updateSkillData
} from '../../services/ApiService.js';

export default class AddEditSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skillId: null,
            skillName: '',
            validationError: '',
            showToast: false,
            isEdit: false
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("skillId");

        if (id) {
            const data = await getSkillById(id);
            if (data) {
                this.setState({
                    skillId: id,
                    skillName: data.name,
                    isEdit: true
                });
            }
        }
    }

    handleChange = (e) => {
        this.setState({ skillName: e.target.value, validationError: '' });
    };

    handleSubmit = async () => {
        const { skillId, skillName, isEdit } = this.state;

        if (skillName.trim() === '') {
            this.setState({ validationError: 'Category name is required' });
            return;
        }

        const payload = { name: skillName };

        const success = isEdit
            ? await updateSkillData(skillId, payload)
            : await addSkillData(payload);

        console.log(success,"success");
        
        
        
        
        
        
        
        
        
        if (success) {
            this.setState({
                showToast: true,
                validationError: ''
            });

            setTimeout(() => {
                window.location.href = "/skill";
            }, 1000);
        } else {
            this.setState({ validationError: "Operation failed. Try again." });
        }
    };

    render() {
        const {
            skillName,
            validationError,
            showToast,
            isEdit
        } = this.state;

        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="add-edit-skill" className="container-fluid p-4 bg-custom">

                    <div className="d-flex justify-content-between">
                        <h2 className="mb-4 text-primary">{isEdit ? 'Edit' : 'Add'} skill</h2>
                        <a class="btn btn-primary h-50 mt-2" href="/skill">← Back to skills</a>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <label htmlFor="skillName" className="form-label">Skill Name</label>
                            <input
                                type="text"
                                className={`form-control ${validationError ? 'is-invalid' : ''}`}
                                id="skillName"
                                value={skillName}
                                onInput={this.handleChange}
                                placeholder="Enter Skill name"
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
                                    Skill {isEdit ? 'updated' : 'added'} successfully!
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
