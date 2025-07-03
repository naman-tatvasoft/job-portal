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
  }).then(_verifyResponse).catch(_handleError) ;
}

export async function testToken(token) {
  return fetch(`${API_BASE}/auth/test/token?token=${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(_verifyResponse).catch(_handleError) ;
}


export async function getAdminDashboardData(){
  return fetch(`${API_BASE}/dashboard/admin`, {
    method: 'GET',
    headers: _authHeaders(),
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
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function _verifyResponse(res) {
  let data = await res.json();
  const contentType = res.headers.get('content-type');

  if (res.status === 401) {
    localStorage.removeItem('token');
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
  return error;
}
