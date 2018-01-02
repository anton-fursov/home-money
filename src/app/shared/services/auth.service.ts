export class AuthService {
  private isAuthentificated = (() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user && user.token) {
      return true;
    }
    return false;
  })();

  login() {
    this.isAuthentificated = true;
  }

  logout() {
    this.isAuthentificated = false;
    window.localStorage.clear();
    location.reload();
  }

  isLoggedIn() {
    return this.isAuthentificated;
  }
}
