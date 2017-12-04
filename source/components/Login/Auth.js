
class AuthService {

  login(netId, password) {
    var PythonShell = require('python-shell');
    PythonShell.run('auth.py', function (err) {
      console.log('finished');
    });


  }
}

export default new AuthService()