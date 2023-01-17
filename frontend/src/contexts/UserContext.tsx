import { createContext, useContext, useMemo, useState } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { login, LoginBody } from "../api/auth/auth";

const UserContext = createContext<{
  auth: UseMutationResult<
    {
      id: string;
      refreshToken: string;
      token: string;
    },
    unknown,
    LoginBody,
    unknown
  >;
  userId: string;
}>(null!);

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const auth = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (data: { id: string; refreshToken: string; token: string }) => {
      setUserId(data.id);
      setToken(data.token);
      setRefreshToken(data.refreshToken);
    },
  });

  const value = useMemo(
    () => ({
      userId,
      auth,
    }),
    [userId, auth]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a AuthContextProvider");
  }
  return context;
};

export { UserContext, UserContextProvider, useUserContext };
