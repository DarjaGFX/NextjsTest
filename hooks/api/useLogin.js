import { useAtom } from "jotai";
import * as apiLogin from "../../api/apiLogin";
import { userTokenAtom } from "../../store";
import { useMutation } from "react-query";

const usePostLoginAccessToken = () => {
  const [userToken] = useAtom(userTokenAtom);
  return useMutation(
    (props) => apiLogin.postLoginAccessToken(props, userToken),
    {
      onSuccess: (_, { Id }) => {},
    }
  );
};

export { usePostLoginAccessToken };
