import type { Route } from "@tanstack/react-location";

const HomePage = () =>
  import("./components/pages/HomePage").then((p) => <p.default />);
const LoginPage = () =>
  import("./components/pages/LoginPage").then((p) => <p.default />);
const RegisterPage = () =>
  import("./components/pages/RegisterPage").then((p) => <p.default />);

export default [
  { path: "/", element: HomePage },
  { path: "/login", element: LoginPage },
  { path: "/register", element: RegisterPage },
] satisfies Route[];
