import { Component } from 'inferno';
import { login, testToken } from '../../services/ApiService.js';
import '../../styles/Auth.css';

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
    const token = localStorage.getItem('access-token');
    const role = localStorage.getItem('role');

    if (token != null && role != null) {
      const res = await testToken(token);

      if (res && (res.data.data.role == role)) {

        if (res.data.data.token) {
          localStorage.setItem('access-token', res.data.data.token);
        }

        if (role == 'Employer') {
          window.location.href = '/employer-dashboard';
        } else if (role == 'Candidate') {
          window.location.href = '/candidate-dashboard';
        } else if (role == 'Admin') {
          window.location.href = '/admin-dashboard';
        }

      } else {
        localStorage.removeItem('access-token');
        localStorage.removeItem('role');
      }
    } else {
      localStorage.removeItem('access-token');
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

      if (res.data.refreshToken) {
        document.cookie = `refresh-token=${res.data.refreshToken}; path=/; secure; samesite=strict`;
      }

      const role = res.data.role;

      localStorage.setItem('access-token', res.data.token);
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

      <div id="login" className="auth-section container-fluid">
        <div className="d-flex align-items-center row justify-content-center vh-100">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="h-100">
              <img src="/assets/images/job-hunt.svg" className="img-fluid" alt="Job Portal Illustration" />
            </div>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="auth-container">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-md-10">
                    <div className="auth-card">
                      <div className="auth-header">
                        <h1>Job Portal</h1>
                        <h2><i className="fas fa-sign-in-alt me-2"></i>Welcome Back</h2>
                        <p>Sign in to your account</p>
                      </div>
                      <div className="auth-body">
                        <form id="loginForm" onSubmit={this.handleSubmit}>
                         
                          <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="loginEmail" placeholder="Email" name="email" value={email} onInput={this.handleInput} />
                            <label for="loginEmail"><i className="fas fa-envelope me-2"></i>Email address</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="loginPassword" placeholder="Password" name="password" value={password} onInput={this.handleInput} />
                            <label for="loginPassword"><i className="fas fa-lock me-2"></i>Password</label>
                          </div>
                          <div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                          </div>
                          <button type="submit" className="btn btn-primary w-100 m-1">
                            <i className="fas fa-sign-in-alt me-2"></i>Sign In
                          </button>
                        </form>

                        <div className="auth-links">
                          <p>Don`t have an account?</p> <p><a href="/candidate-register">Sign up here as candidate</a></p><p><a href="/employer-register">Sign up here as employer</a></p>
                        </div>
                      </div>
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
