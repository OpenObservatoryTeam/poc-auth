import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { register, RegisterBody } from "../../api/auth/auth";
import ControlledTextInput from "../atoms/ControlledTextInput";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "@tanstack/react-location";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "40%",
    padding: 20,
    border: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 30,
  },
});

export default function RegisterPage(): JSX.Element {
  const { auth } = useUserContext();
  const navigation = useNavigate();
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Ce champs est obligatoire"),
    lastName: Yup.string().required("Ce champs est obligatoire"),
    username: Yup.string().required("Ce champs est obligatoire"),
    password: Yup.string()
      .min(8, "Le mot de passe n'est pas assez long")
      .required("Ce champs est obligatoire"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne sont pas identiques"
    ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterBody>({
    resolver: yupResolver(validationSchema),
  });

  const save = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      auth.mutate({
        username: data.username,
        password: data.password,
      });
    },
  });

  const onSubmit = (values: RegisterBody) => {
    save.mutate(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          navigation({ to: "/" });
        },
        onError: () => {
          console.log("échouer");
        },
      }
    );
  };

  return (
    <div>
      <h1 className={classes.title}>Register Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <ControlledTextInput
          name="firstName"
          control={control}
          error={!!errors.firstName}
          label="Prénom"
          errorMessage={errors.firstName?.message}
        />
        <ControlledTextInput
          name="lastName"
          control={control}
          error={!!errors.lastName}
          label="Nom"
          errorMessage={errors.lastName?.message}
        />
        <ControlledTextInput
          name="username"
          control={control}
          error={!!errors.username}
          label="Username"
          errorMessage={errors.username?.message}
        />
        <ControlledTextInput
          name="password"
          control={control}
          error={!!errors.password}
          label="Password"
          type="password"
          errorMessage={errors.password?.message}
        />
        <ControlledTextInput
          name="confirmPassword"
          control={control}
          error={!!errors.confirmPassword}
          label="Confirm Password"
          type="password"
          errorMessage={errors.confirmPassword?.message}
        />
        <Button
          variant="contained"
          style={{ marginTop: "1em", marginBottom: "0.5em" }}
          type="submit"
          color="inherit"
        >
          S'inscrire
        </Button>
      </form>
    </div>
  );
}
