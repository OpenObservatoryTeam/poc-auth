import { Link } from "@tanstack/react-location";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <h1>Connecter vous</h1>
      <Link to="/login">Se connecter</Link>
    </div>
  );
}
