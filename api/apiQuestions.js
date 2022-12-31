import api from '../services/api';


const DeleteQuestion = async (params, userToken) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.delete("/questions/" + params, config);
  return response;
};


export { DeleteQuestion };
