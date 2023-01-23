import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const authenticate = useQuery({
    queryKey: ["user", "authenticated"],
    queryFn: auth,
    retry: false,
  });

  useEffect(() => {
    const int = setInterval(() => authenticate.refetch(), 10e3);
    return () => clearInterval(int);
  }, []);

  const logIn = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
  });

  const token = (logIn.data?.authToken ?? authenticate.data?.authToken)!;
  const userId = (logIn.data?.id ?? authenticate.data?.id)!;
  const username = (logIn?.data?.username ?? authenticate.data?.username)!;

  const logOut = useMutation({
    mutationFn: () => logout(token),
    onSuccess: () => {
      queryClient.setQueryData(["user", "authenticated"], undefined);
      queryClient.setQueryData(["login"], undefined);
    },
  });

  return (
    <UserContext.Provider
      value={{
        userId,
        logIn,
        token,
        username,
        logOut,
        loading: authenticate.isInitialLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a AuthContextProvider");
  }
  return context;
};

export { UserContext, UserContextProvider, useUserContext };
