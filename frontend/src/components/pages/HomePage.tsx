import { Link, useNavigate } from "@tanstack/react-location";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
});

export default function HomePage(): JSX.Element {
  const { username, logOut } = useUserContext();
  const navigation = useNavigate();
  const classes = useStyles();

  const handleLogout = () => {
    logOut.mutate(undefined, {
      onSettled: (data: any) => {
        navigation({ to: "login", replace: true });
      },
    });
  };

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
