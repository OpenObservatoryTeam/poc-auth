import { Link, useNavigate } from "@tanstack/react-location";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
});

export default function HomePage(): JSX.Element {
  const { username, token } = useUserContext();
  const navigation = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigation({ to: "login", replace: true });
    }
  }, []);

  const handleLogout = () => {};

  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="h3"
        align="center"
      >{`Bienvenue ${username} !!`}</Typography>
      <div className={classes.container}>
        <Button variant="contained" onClick={handleLogout}>
          Se déconnecter
        </Button>
        <Link
          to="/users/list"
          style={{
            textDecoration: "none",
          }}
        >
          <Button variant="contained">Voir la liste des utilisateurs</Button>
        </Link>
      </div>
    </div>
  );
}
