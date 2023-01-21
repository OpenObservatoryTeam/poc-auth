import type { Route } from "@tanstack/react-location";
import { QueryClient, useQuery } from "react-query";
import { getUsers } from "./api/users/users";
import { useUserContext } from "./contexts/UserContext";

const HomePage = () =>
  import("./components/pages/HomePage").then((p) => <p.default />);
const LoginPage = () =>
  import("./components/pages/LoginPage").then((p) => <p.default />);
const RegisterPage = () =>
  import("./components/pages/RegisterPage").then((p) => <p.default />);
const UsersListPage = () =>
  import("./components/pages/UsersListPage").then((p) => <p.default />);

const queryClient = new QueryClient();
export default [
  { path: "/", element: HomePage },
  { path: "/login", element: LoginPage },
  { path: "/register", element: RegisterPage },
  {
    path: "/users/list",
    element: UsersListPage,
  },
] satisfies Route[];
