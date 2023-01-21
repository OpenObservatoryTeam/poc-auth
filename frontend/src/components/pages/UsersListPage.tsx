import { isOptionGroup } from "@mui/base";
import { useNavigate } from "@tanstack/react-location";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../api/users/users";
import { useUserContext } from "../../contexts/UserContext";

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

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {users !== null &&
        users?.length !== 0 &&
        users?.map((u) => <h1>{u.firstname}</h1>)}
    </div>
  );
}
