import type { Route } from "@tanstack/react-location";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getUsers } from "./api/users/users";
import AuthGuard from "./components/molecules/AuthGuard";
import { useUserContext } from "./contexts/UserContext";

const HomePage = () =>
  import("./components/pages/HomePage").then((p) => (
    <AuthGuard>
      <p.default />
    </AuthGuard>
  ));
const LoginPage = () =>
  import("./components/pages/LoginPage").then((p) => <p.default />);
const RegisterPage = () =>
  import("./components/pages/RegisterPage").then((p) => <p.default />);
const UsersListPage = () =>
  import("./components/pages/UsersListPage").then((p) => (
    <AuthGuard>
      <p.default />
    </AuthGuard>
  ));

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
