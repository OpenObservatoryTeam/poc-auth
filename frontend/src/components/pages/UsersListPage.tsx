import { ClassNames } from "@emotion/react";
import { Card, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "@tanstack/react-location";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../api/users/users";
import { useUserContext } from "../../contexts/UserContext";

const useStyles = makeStyles({
  cards: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 25,
    flexWrap: "wrap",
  },
  card: {
    width: "25%",
    borderColor: "grey",
  },
});

export default function ProfilPage(): JSX.Element {
  const { token } = useUserContext();
  const [users, setUsers] = useState<Array<any> | null>();
  const navigation = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigation({ to: "/login", replace: true });
    }
  }, []);

  useQuery({
    queryFn: () => getUsers(token),
    onSuccess: (data) => {
      setUsers(data);
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h3" align="center">
        Liste des utilisateurs
      </Typography>
      <div className={classes.cards}>
        {users !== null &&
          users?.length !== 0 &&
          users?.map((u) => (
            <Card key={u.id} className={classes.card}>
              <Typography variant="h6" align="center">
                {u.username}
              </Typography>
              <Divider />
              <Typography variant="body2">{`Prénom : ${u.firstName}`}</Typography>
              <Typography variant="body2">{`Nom de famille : ${u.lastName}`}</Typography>
            </Card>
          ))}
      </div>
    </div>
  );
}
