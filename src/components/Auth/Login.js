import { Component } from 'inferno';
import { login, testToken } from '../../services/ApiService.js';

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

  async componentWillMount() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token != null && role != null) {
      const res = await testToken(token);

      if (res && (res.data.data.role == role)) {
        if (role == 'Employer') {
          window.location.href = '/employer-dashboard';
        } else if (role == 'Candidate') {
          window.location.href = '/candidate-dashboard';
        } else if (role == 'Admin') {
          window.location.href = '/admin-dashboard';
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  componentDidMount() {
    console.log('Login component mounted!');
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
      console.log("respone", res);

      if (!res?.data.token) {
        this.setState({ error: res.Message });
        return;
      }

      const role = res.data.role;

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (role == 'Employer') {
        window.location.href = '/employer-dashboard';
      } else if (role == 'Candidate') {
        window.location.href = '/candidate-dashboard';
      } else if (role == 'Admin') {
        console.log("Admin role detected, redirecting to admin dashboard");
        window.location.href = '/admin-dashboard';
      } else {
        this.setState({ error: 'Unknown role received' });
      }

    } catch (err) {
      this.setState({ error: 'Something went wrong!' });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (

      <div id="login" class="page-section">

        <h1>Job Portal</h1>
        <div class="auth-container">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5 col-md-7">
                <div class="auth-card">
                  <div class="auth-header">
                    <h2><i class="fas fa-sign-in-alt me-2"></i>Welcome Back</h2>
                    <p>Sign in to your account</p>
                  </div>
                  <div class="auth-body">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                      <div class="form-floating">
                        <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="email" value={email} onInput={this.handleInput} />
                        <label for="loginEmail"><i class="fas fa-envelope me-2"></i>Email address</label>
                      </div>
                      <div class="form-floating">
                        <input type="password" class="form-control" id="loginPassword" placeholder="Password" name="password" value={password} onInput={this.handleInput} />
                        <label for="loginPassword"><i class="fas fa-lock me-2"></i>Password</label>
                      </div>
                      <div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                      </div>
                      <button type="submit" class="btn btn-primary w-100">
                        <i class="fas fa-sign-in-alt me-2"></i>Sign In
                      </button>
                    </form>

                    <div class="auth-links">
                      <p>Don`t have an account?</p> <p><a href="/candidate-register">Sign up here as candidate</a></p><p><a href="/employer-register">Sign up here as employer</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
