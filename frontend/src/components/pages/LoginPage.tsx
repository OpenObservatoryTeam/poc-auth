import { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import ControlledTextInput from "../atoms/ControlledTextInput";
import { makeStyles } from "@mui/styles";
import { LoginBody } from "../../api/auth/auth";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "@tanstack/react-location";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Ce champs est obligatoire"),
  password: Yup.string().required("Ce champs est obligatoire"),
});

const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    margin: "auto",
    border: "1px",
    borderStyle: "solid",
    borderColor: "grey",
    padding: 25,
    borderRadius: 20,
  },
  button: {
    "& .MuiButtonBase-root": {
      marginTop: "1em",
      color: "white",
      backgroundColor: "grey",
    },
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

function LoginPage(): JSX.Element {
  const { logIn } = useUserContext();
  const navigation = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginBody>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: LoginBody) => {
    setError(false);
    logIn.mutate(values, {
      onSuccess: () => navigation({ to: "/" }),
      onError: () => {
        setError(true);
      },
    });
  };

  const classes = useStyles();

  if (isSubmitting) {
    return <CircularProgress className={classes.loading} />;
  }

  return (
    <div>
      <h1 className={classes.title}>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <ControlledTextInput
          name="username"
          control={control}
          error={!!errors.username}
          type="text"
          label="Username"
          placeholder="Username"
          errorMessage={errors.username?.message}
        />
        <ControlledTextInput
          name="password"
          control={control}
          error={!!errors.password}
          type="password"
          label="Password"
          placeholder="Password"
          errorMessage={errors.password?.message}
        />
        {error && (
          <Typography variant="caption" color="red" align="center">
            Les identifiants sont incorrectes
          </Typography>
        )}
        <Button
          className={classes.button}
          color="inherit"
          type="submit"
          variant="contained"
          style={{ marginTop: "1em", marginBottom: "0.5em" }}
          disabled={isSubmitting}
        >
          Se connecter
        </Button>
        <a href="/register">Pas encore de compte ? Inscrivez-vous</a>
      </form>
    </div>
  );
}

export default LoginPage;
