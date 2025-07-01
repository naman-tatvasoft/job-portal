import { Component } from 'inferno';
import { login } from '../../services/ApiService.js';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      error: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Login component mounted!');
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ token });
    }
  }

  componentWillUnmount() {
    console.log('Login component is being destroyed');
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await login({ email, password });
      if (!res.ok) {
        const errorMsg = await res.text();
        this.setState({ error: errorMsg, token: '' });
        return;
      }
      const data = await res.json();
      this.setState({ token: data.token, error: '' });
      localStorage.setItem('token', data.token);
    } catch (err) {
      this.setState({ error: 'Something went wrong!' });
    }
  };

  render() {
    const { email, password, token, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <input placeholder="Email" name="email" type="email" value={email} onInput={this.handleInput} />
        <input placeholder="Password" name="password" type="password" value={password} onInput={this.handleInput} />
        <button type="submit">Login</button>
        {token && <p>JWT: {token}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    );
  }
}
