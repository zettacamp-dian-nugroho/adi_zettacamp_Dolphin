/** @format */

const CheckBasicAuthorization = (req, res, next) => {
  //get the authorization header that was sent by the client
  const auth = req.headers['authorization'];

  /*
    auth = "Basic <encoded username:password>"
    get userpass via split and access index 1
    */
  const userpass = auth.split(' ')[1];

  //decode userpass to "username:password"
  const text = Buffer.from(userpass, 'base64').toString('ascii');

  //get username and password individually
  const username = text.split(':')[0];
  const password = text.split(':')[1];

  if (username == 'dianadi021' && password == 'dianadi021') {
    //auth successful, access to the route is granted
    return next();
  } else {
    //username and password is wrong, auth unsuccessful
    return res.json('Akses ditolak! username and password salah!');
  }
};

module.exports = CheckBasicAuthorization;
