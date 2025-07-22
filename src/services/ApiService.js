const API_BASE = 'http://localhost:5246/api';

//auth
export async function registerEmployer(data) {
  return fetch(`${API_BASE}/auth/employer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function registerCandidate(data) {
  return fetch(`${API_BASE}/auth/candidate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function login(data) {
  return fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function testToken(token) {
  return fetch(`${API_BASE}/auth/test/token?token=${token}`, {
    method: 'GET',
    headers: _authHeaders(),
  }).then(_verifyResponse).catch(_handleError);
}

export async function getRolesData() {
  return fetch(`${API_BASE}/roles`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

//User
export async function getUsersData(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== 0 && value != null) {
      params.append(key, value);
    }
  });

  return fetch(`${API_BASE}/users?${params.toString()}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

//Dashboard
export async function getAdminDashboardData() {
  return fetch(`${API_BASE}/dashboard/admin`, {
    method: 'GET',
    headers: _authHeaders(),
  }).then(_verifyResponse).catch(_handleError);
}

export async function getEmployerDashboardData(employerId) {
  return fetch(`${API_BASE}/dashboard/employer/${employerId}`, {
    method: 'GET',
    headers: _authHeaders(),

  }).then(_verifyResponse).catch(_handleError);
}

export async function getId(token) {
  return fetch(`${API_BASE}/token/user-id?token=${token}`, {
    method: 'GET',
    headers: _authHeaders(),
  }).then(_verifyResponse).catch(_handleError);
}

//Jobs
export async function getJobsData(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== 0 && value != null) {
      params.append(key, value);
    }
  });

  return fetch(`${API_BASE}/jobs?${params.toString()}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getJobData(id) {
  return fetch(`${API_BASE}/job/${id}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getCreatedJobsData(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== 0 && value != null) {
      params.append(key, value);
    }
  });

  return fetch(`${API_BASE}/created-jobs?${params.toString()}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function deleteJobData(id) {
  return fetch(`${API_BASE}/delete/job/${id}`, {
    method: 'PUT',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function addJobData(job) {
  return fetch(`${API_BASE}/job`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify(job),
  }).then(_verifyResponse).catch(_handleError);
}

export async function editJobData(jobId, job) {
  return fetch(`${API_BASE}/job/${jobId}`, {
    method: 'PUT',
    headers: _authHeaders(),
    body: JSON.stringify(job),
  }).then(_verifyResponse).catch(_handleError);
}


//Applications
export async function getApplicationsData(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== 0 && value != null) {
      params.append(key, value);
    }
  });

  return fetch(`${API_BASE}/applications?${params.toString()}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getApplicationData(id) {
  return fetch(`${API_BASE}/application/${id}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function updateApplicationStatus(id, statusId) {
  return fetch(`${API_BASE}/application/${id}/change-status/${statusId}`, {
    method: 'PUT',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function applyApplication(jobData) {
  return fetch(`${API_BASE}/application/`, {
    method: 'POST',
    headers: _authHeaders(true),
    body: jobData,
  }).then(_verifyResponse).catch(_handleError);
}

export async function getMyApplicationsData(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== 0 && value != null) {
      params.append(key, value);
    }
  });

  return fetch(`${API_BASE}/applications-by-candidate?${params.toString()}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function withdrawApplication(id) {
  return fetch(`${API_BASE}/application/withdraw-application/${id}`, {
    method: 'PUT',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}



// category
export async function getCategoriesData() {
  return fetch(`${API_BASE}/categories`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getCategoryById(id) {
  return fetch(`${API_BASE}/category/${id}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function addCategoryData(data) {
  return fetch(`${API_BASE}/category`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function updateCategoryData(categoryId, data) {
  return fetch(`${API_BASE}/category/${categoryId}`, {
    method: 'PUT',
    headers: _authHeaders(),
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function deleteCategoryData(id) {
    return fetch(`${API_BASE}/category/${id}`, {
      method: 'DELETE',
      headers: _authHeaders()
    }).then(_verifyResponse).catch(_handleError);
}


//skills
export async function getSkillsData() {
  return fetch(`${API_BASE}/skills`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getSkillById(id) {
  return fetch(`${API_BASE}/skill/${id}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function addSkillData(data) {
  return fetch(`${API_BASE}/skill`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function updateSkillData(skillId, data) {
  return fetch(`${API_BASE}/skill/${skillId}`, {
    method: 'PUT',
    headers: _authHeaders(),
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function deleteSkillData(id) {
  return fetch(`${API_BASE}/skill/${id}`, {
    method: 'DELETE',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}


//status
export async function getStatusData() {
  return fetch(`${API_BASE}/statuses`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getStatusById(id) {
  return fetch(`${API_BASE}/status/${id}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function addStatusData(data) {
  return fetch(`${API_BASE}/status`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function updateStatusData(statusId, data) {
  return fetch(`${API_BASE}/status/${statusId}`, {
    method: 'PUT',
    headers: _authHeaders(),
    body: JSON.stringify(data),
  }).then(_verifyResponse).catch(_handleError);
}

export async function deleteStatusData(id) {
  return fetch(`${API_BASE}/status/${id}`, {
    method: 'DELETE',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}


//token
function _authHeaders(isFormData = false) {
  const token = localStorage.getItem('access-token');
  const headers = {};

   if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refresh-token='));
  if (refreshToken) {
    headers['refresh-Token'] = refreshToken.split('=')[1];
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function _verifyResponse(res) {
  let data = await res.json();
  const contentType = res.headers.get('content-type');
  console.log('Response status:', res.status);

  if (res.status == 403 || res.status == 401) {
    window.location.href = '/';
    return;
  }

  if (!res.ok && res.status != 201) {
    console.log("in error call from apiServices");
    _handleError(data);
  }

  if (contentType && contentType.includes('application/json')) {
    console.log('Response is JSON', data);
    return data;
  } else {
    throw new Error('Response was not JSON');
  }
}

function _handleError(error) {
  console.log("eeee" + error);
  return error;
}
