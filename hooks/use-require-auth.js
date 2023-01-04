import { useEffect } from "react";
import { useAuth } from "./use-auth.js";
import Router from "next/router.js";


export function useRequireAuth(redirectUrl = "/Auth/login") {
  const auth = useAuth();
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (!auth.user) {
      Router.push(redirectUrl);
    }
  }, [auth, redirectUrl]);
  return auth;
}