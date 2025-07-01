import { Component } from 'inferno';
import { registerEmployer } from '../../services/ApiService.js';

export default class RegisterEmployer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      companyName: '',
      password: '',
      message: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('RegisterEmployer component mounted!');
  }
  componentWillUnmount() {
    console.log('RegisterEmployer component is being destroyed');
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    try {
      const res = await registerEmployer({ name, email, password });
      const msg = await res.text();
      this.setState({ message: msg });
    } catch {
      this.setState({ message: 'Something went wrong' });
    }
  };

  render() {
    const { name, email, companyName, password, message } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register Employer</h2>
        <input placeholder="Name" value={name} onInput={this.handleInput} />
        <input placeholder="Email" type="email" value={email} onInput={this.handleInput} />
        <input placeholder="companyName" type="text" value={companyName} onInput={this.handleInput} />
        <input placeholder="Password" type="password" value={password} onInput={this.handleInput} />
        <button type="submit">Register</button>
        <p>{message}</p>
      </form>
    );
  }
}
