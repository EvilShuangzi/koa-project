const jwt =require('jsonwebtoken');
const serect = 'WFT_DSA'; 
module.exports = (userinfo) => { 
  const token = jwt.sign({
    user: userinfo.username,
    id: userinfo.id,
    time: Date.now(),
    timeout: Date.now() + 60000,
  }, serect, {expiresIn: '1h'});
  return token;
};