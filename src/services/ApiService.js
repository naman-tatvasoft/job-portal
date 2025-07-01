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

// function _post(url, data) {
//   return fetch(url, {
//     method: 'POST',
//     headers: _authHeaders(),
//     body: JSON.stringify(data),
//   }).then(_verifyResponse).catch(_handleError);
// }

// function _authHeaders() {
//   const token = localStorage.getItem('token');
//   const headers = {
//     'Content-Type': 'application/json',
//   };
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }
//   return headers;
// }

function _verifyResponse(res) {
  const contentType = res.headers.get('content-type');

  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
    return;
  }

  if (!res.ok) {
    return res.text().then((msg) => {
      throw new Error(msg || 'Request failed');
    });
  }

  if (contentType && contentType.includes('application/json')) {
    return res.json();
  } else {
    throw new Error('Response was not JSON');
  }
}

function _handleError(error) {
  console.error('An API error occurred:', error.message || error);
  throw error;
}
