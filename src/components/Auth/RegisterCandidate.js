import { Component } from 'inferno';
import { registerCandidate } from '../../services/ApiService.js';

export default class RegisterCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('RegisterCandidate component mounted!');
  }

  componentWillUnmount() {
    console.log('RegisterCandidate component is being destroyed');
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    try {
      const res = await registerCandidate({ name, email, password });
      const msg = await res.text();
      this.setState({ message: msg });
    } catch {
      this.setState({ message: 'Something went wrong' });
    }

  };

  render() {
    const { name, email, password, message } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register Candidate</h2>
        <input placeholder="Name" value={name} onInput={this.handleInput} />
        <input placeholder="Email" type="email" value={email} onInput={this.handleInput} />
        <input placeholder="Password" type="password" value={password} onInput={this.handleInput} />
        <button type="submit">Register</button>
        <p>{message}</p>
      </form>
    );
  }
}
