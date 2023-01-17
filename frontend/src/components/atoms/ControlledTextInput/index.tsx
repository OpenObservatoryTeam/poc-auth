import { ClassNames } from "@emotion/react";
import { TextField, TextFieldProps, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Control, Controller, FieldError } from "react-hook-form";
import { TypeOf } from "yup";
import { LoginBody, RegisterBody } from "../../../api/auth/auth";

const useStyles = makeStyles({
  textinput: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        borderRadius: 20,
      },
    },
    display: "flex",
    flexDirection: "column",
  },
  error: {
    paddingLeft: "1em",
    marginBottom: "0.5em",
  },
});

export default function ControlledTextInput({
  control,
  error,
  name,
  errorMessage,
  ...props
}: {
  control: Control<any, any>;
  error: boolean;
  name: string;
  errorMessage?: string | undefined;
} & TextFieldProps): JSX.Element {
  const classes = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={classes.textinput}>
          <TextField
            id={name}
            variant="outlined"
            onChange={field.onChange}
            error={error}
            margin="dense"
            {...props}
          />
          {error && (
            <Typography color="red" variant="caption" className={classes.error}>
              {errorMessage}
            </Typography>
          )}
        </div>
      )}
    />
  );
}
