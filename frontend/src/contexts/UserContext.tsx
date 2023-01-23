import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { auth, login, LoginBody, logout } from "../api/auth/auth";

const UserContext = createContext<{
  logIn: UseMutationResult<
    {
      id: number;
      refreshToken: string;
      authToken: string;
    },
    unknown,
    LoginBody,
    unknown
  >;
  logOut: UseMutationResult<any, unknown, void, unknown>;
  userId: number | null;
  token: string | null;
  username: string | null;
  loading: boolean;
}>(null!);

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const logIn = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (data: {
      id: number;
      refreshToken: string;
      authToken: string;
      username: string;
    }) => {
      setUserId(data.id);
      setToken(data.authToken);
      setUsername(data.username);
    },
  });

  const logOut = useMutation({
    mutationFn: () => logout(token),
    onSuccess: (data: any) => {
      setUserId(null);
      setToken(null);
      setUsername(null);
    },
  });

  const authenticate = useMutation({
    mutationFn: auth,
  });

  useEffect(
    () =>
      authenticate.mutate(undefined, {
        onSuccess: (data: {
          id: number;
          refreshToken: string;
          authToken: string;
          username: string;
        }) => {
          setUserId(data.id);
          setToken(data.authToken);
          setUsername(data.username);
        },
        onError: () => {
          setUserId(null);
          setUsername(null);
          setToken(null);
        },
      }),
    []
  );

  const value = useMemo(
    () => ({
      userId,
      logIn,
      token,
      username,
      logOut,
      loading: !authenticate.isSuccess && !authenticate.isError,
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
