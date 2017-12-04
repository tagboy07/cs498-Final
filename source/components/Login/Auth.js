
class AuthService {

  login(netId, password) {
    $.ajax({
       url: "./Auth.py",
       success: function(response) {
       }
    });
  }
}

export default new AuthService()