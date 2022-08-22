export default function authHeader() {
  debugger
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (user && token) {
    return { Authorization: token };
  } else {
    return {};
  }
}
