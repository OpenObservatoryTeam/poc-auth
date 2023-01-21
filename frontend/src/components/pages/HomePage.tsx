import { Link } from "@tanstack/react-location";
import { useUserContext } from "../../contexts/UserContext";

export default function HomePage(): JSX.Element {
  const { userId } = useUserContext();
  console.log(userId);
  return (
    <div>
      <h1>Connecter vous</h1>
      <Link to="/login">Se connecter</Link>
      {userId !== null && (
        <div>
          <Link to="/users/list ">Voir la liste des utilisateurs</Link>
        </div>
      )}
    </div>
  );
}
