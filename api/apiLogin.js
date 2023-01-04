import api from '../services/api';

const PostLoginRequestVerificationCode = async (params) => {
  const data = await api.post("/user/request_verification_code", params);
  return data;
};


const PostLogin = async (username, password) => {
  const body_data = [
    'username=' + username,
    'password=' + password
  ];
  const params = body_data.join('&');
  const data = await api.post("/user/login", params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return data;
};


const PostVerifyToken = async (userToken) => {
  const data = await api.post("/user/verify_token",null , {
    headers: {
      'Authorization' : "Bearer " + userToken
    },
  });
  return data;
};


export { PostVerifyToken, PostLogin, PostLoginRequestVerificationCode };
