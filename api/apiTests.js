import api from '../services/api';


const GetAllTests = async (params = null, userToken = null) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.get("/tests/", params, config);
  return response;
};


const GetTestByNameID = async (params, userToken = null) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.get("tests/" + params, config);
  return response;
};


const GetTestQuestions = async (params, userToken = null) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.get("tests/" + params + "/questions", config);
  return response;
};


const DeleteTestByID = async (params, userToken) => {
  const config = userToken ? {
    headers: {
      'Authorization': "Bearer " + userToken
    },
  } : {};
  const response = await api.delete("tests/" + params, config);
  return response;
};



export { GetAllTests, GetTestByNameID, DeleteTestByID, GetTestQuestions };
