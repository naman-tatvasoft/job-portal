import { Component } from 'inferno';
import Sidebar from '../Sidebar/Sidebar.js';
import { getSkillsData } from '../../services/ApiService.js';

export default class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        };
    }

    async componentWillMount() {
        this.fetchSkills();
    }

    async fetchSkills() {
        const skillsData = await getSkillsData();
        this.setState({ skills: skillsData || [] });
    }

    render() {
        const { skills } = this.state;
        return (
            <div class="main d-flex">
                <Sidebar />
                <div id="dashboard" className="container-fluid p-4 bg-custom">

                    <div className="d-flex justify-content-between">

                        <h2 className="mb-4 text-primary">Skills</h2>
                        <div>
                            <a className="btn btn-primary" href="/add-edit-skill">+ Add Skill</a>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Skill Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {skills.length > 0 ? (
                                            skills.map((skill) => (
                                                <tr key={skill.id}>
                                                    <td>{skill.id}</td>
                                                    <td>{skill.name}</td>
                                                    <td>
                                                        <a className="" href={`/add-edit-skill?skillId=${skill.id}`}><i class="fa-solid me-3 fa-pen"></i></a>
                                                        <i class="fa-solid fa-trash-can" ></i>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">No skills found</td>
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
