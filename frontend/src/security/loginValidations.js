const login = (userId, roleId) => {
  localStorage.setItem('userId', userId);
  localStorage.setItem('roleId', roleId);
};

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('roleId');
};

module.exports = {
  login, logout
}