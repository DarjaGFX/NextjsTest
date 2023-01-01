import api from '../services/api';


const PostCreateQuestion = async (params, userToken) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.post("/questions/", params, config);
  return response;
};


const PutUpdateQuestion = async (params, userToken) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.put("/questions/", params, config);
  return response;
};


const DeleteQuestion = async (params, userToken) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.delete("/questions/" + params, config);
  return response;
};


export { PostCreateQuestion, PutUpdateQuestion, DeleteQuestion };
