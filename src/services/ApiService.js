const API_BASE = 'http://localhost:5246/api';

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


export async function getAdminDashboardData() {
  return fetch(`${API_BASE}/dashboard/admin`, {
    method: 'GET',
    headers: _authHeaders(),
  }).then(_verifyResponse).catch(_handleError);
}

export async function getCandidateDashboardData() {
  return fetch(`${API_BASE}/dashboard/candidate`, {
    method: 'GET',
    headers: _authHeaders(),

  }).then(_verifyResponse).catch(_handleError);
}

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

export async function getSkillsData() {
  return fetch(`${API_BASE}/skills`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getCategoriesData() {
  return fetch(`${API_BASE}/categories`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

export async function getRolesData() {
  return fetch(`${API_BASE}/roles`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}


export async function getApplicationsData(filters = {}){
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

export async function getStatusData() {
  return fetch(`${API_BASE}/statuses`, {
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

export async function getJobData(id) {
  return fetch(`${API_BASE}/job/${id}`, {
    method: 'GET',
    headers: _authHeaders()
  }).then(_verifyResponse).catch(_handleError);
}

// function _post(url, data) {
//   return fetch(url, {
//     method: 'POST',
//     headers: _authHeaders(),
//     body: JSON.stringify(data),
//   }).then(_verifyResponse).catch(_handleError);
// }

function _authHeaders() {

  const token = localStorage.getItem('access-token');
  const headers = {
    'Content-Type': 'application/json',
  };

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
