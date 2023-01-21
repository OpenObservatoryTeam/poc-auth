import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { login, LoginBody } from "../api/auth/auth";

const UserContext = createContext<{
  auth: UseMutationResult<
    {
      id: number;
      refreshToken: string;
      authToken: string;
    },
    unknown,
    LoginBody,
    unknown
  >;
  userId: number | null;
  token: string | null;
  username: string | null;
}>(null!);

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const auth = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (data: {
      id: number;
      refreshToken: string;
      authToken: string;
      username: string;
    }) => {
      console.log(data.id, data.authToken, data.refreshToken);
      setUserId(data.id);
      setToken(data.authToken);
      setRefreshToken(data.refreshToken);
      setUsername(data.username);
    },
  });

  useEffect(() => {
    if (refreshToken) {
    }
  }, []);

  const value = useMemo(
    () => ({
      userId,
      auth,
      token,
      username,
    }),
    [userId, token, username]
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
