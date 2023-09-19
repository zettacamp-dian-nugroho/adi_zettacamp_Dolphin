/** @format */
const jwt = require('jsonwebtoken');
const GenerateJWTToken = (data) => {
  if (data.email == undefined && data.username == undefined) {
    return 'Input kosong!';
  } else {
    const token = jwt.sign({ email: data.email, username: data.username }, 'secret', { expiresIn: '1h' });
    SaveFileToLocal(token)
    return token;
  }
};

const VerfyJWTToken = (req, res, next) => {
  try {
    const auth = req.headers['authorization'].includes('Bearer') ? true : false;
    const token = auth ? req.headers['authorization'].split(' ')[1] : req.headers['authorization'];
    const isToken = jwt.verify(token, 'secret');
    return isToken;
  } catch (err) {
    if (err.name == 'JsonWebTokenError') {
      return 'Token tidak benar!';
    }
    if (err.name == 'TokenExpiredError') {
      return 'Token kadaluarsa!';
    }
    if (err.name == 'TypeError') {
      return 'Invalid!';
    }
  }
};

const MiddlewareVerifyToken = (req, res, next) => {
  try {
    const auth = req.headers['authorization'].includes('Bearer') ? true : false;
    const token = auth ? req.headers['authorization'].split(' ')[1] : req.headers['authorization'];
    const isToken = jwt.verify(token, 'secret');
    if (isToken) {
      return next();
    }
  } catch (err) {
    if (err.name == 'JsonWebTokenError') {
      res.json({ message: 'Token tidak benar!' });
    }
    if (err.name == 'TokenExpiredError') {
      res.json({ message: 'Token kadaluarsa!' });
    }
    if (err.name == 'TypeError') {
      res.json({ message: 'Invalid!' });
    }
  }
};

const fs = require('fs');
const SaveFileToLocal = (Text) => {
  const InputPerLine = `{"token": "${Text}"}` + '\n';
  const filePath = './data/TokenOutput.json';
  fs.appendFile(filePath, InputPerLine, (err) => {
    if (err) {
      console.error('Gagal menyimpan text:', err);
    } else {
      console.log('Menambahkan Text Kedalam File');
    }
  });
};

module.exports = {
  GenerateJWTToken,
  VerfyJWTToken,
  MiddlewareVerifyToken,
};
