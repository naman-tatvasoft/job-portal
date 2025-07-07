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
      <div id="register-candidate" class="auth-section container-fluid">
        <div class="d-flex align-items-center row justify-content-center vh-100">
          <div class="col-lg-6 d-none d-lg-block">
            <div class="h-100">
              <img src="/assets/images/job-hunt.svg" class="img-fluid" alt="Job Portal Illustration" />
            </div>
          </div>
          <div class="col-lg-6 col-md-8">
            <div class="auth-container">
              <div class="container-fluid">
                <div class="row justify-content-center">
                  <div class="col-lg-8 col-md-10">
                    <div class="auth-card">
                      <div class="auth-header">
                        <h1>Job Portal</h1>
                        <h2><i class="fas fa-sign-in-alt me-2"></i>Welcome,</h2>
                        <p>Sign up as an candidate</p>
                      </div>
                      <div class="auth-body">
                        <form id="signUpCandidateForm" onSubmit={this.handleSubmit}>
                          <h2>Register Candidate</h2>
                          <div class="form-floating m-1">
                            <input type="name" class="form-control" id="SignUpName" placeholder="Name" name="name" value={name} onInput={this.handleInput} />
                            <label for="SignUpName"><i class="fas fa-envelope me-2"></i>Name</label>
                          </div>
                          <div class="form-floating m-1">
                            <input type="email" class="form-control" id="SignUpEmail" placeholder="Email" name="email" value={email} onInput={this.handleInput} />
                            <label for="SignUpEmail"><i class="fas fa-envelope me-2"></i>Email address</label>
                          </div>
                          <div class="form-floating m-1">
                            <input type="password" class="form-control" id="SignUpPassword" placeholder="Password" name="password" value={password} onInput={this.handleInput} />
                            <label for="SignUpPassword"><i class="fas fa-lock me-2"></i>Password</label>
                          </div>
                          <div>
                            {message && <p style={{ color: 'red' }}>{message}</p>}
                          </div>
                          <button type="submit" class="btn btn-primary w-100 m-1">
                            <i class="fas fa-sign-up-alt me-2"></i>Sign Up
                          </button>
                        </form>
                        <div class="auth-links">
                          <p>Already have an account?<a href="/">Login here</a></p>
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
