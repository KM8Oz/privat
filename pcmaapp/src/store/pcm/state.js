export default function () {
  return {
    status: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('username') || ''
  }
}
