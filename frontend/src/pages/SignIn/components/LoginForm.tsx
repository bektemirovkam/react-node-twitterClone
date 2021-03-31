import React, { useEffect, useRef } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { SignInStyles } from "..";
import { LoginDataInterface } from "../../../services/api/authApi";
import {
  INotificationConfig,
  Notification,
} from "./../../../components/Notification";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoadingStatus } from "../../../store/types";
import { selectLoadingUserState } from "../../../store/ducks/user/selectors";
import { fetchSignIn } from "../../../store/ducks/user/actionCreators";

interface LoginFormProps {
  classes: SignInStyles;
}

const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Минимальное количество символов 6"),
});

export const LoginForm: React.FC<LoginFormProps> = ({ classes }) => {
  const {
    handleSubmit,
    control,
    register,
    errors,
  } = useForm<LoginDataInterface>({
    resolver: yupResolver(signinSchema),
  });

  const loadingStatus = useSelector(selectLoadingUserState);
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginDataInterface) => {
    dispatch(fetchSignIn(data));
  };


  return (
    <DialogContent className={classes.dialogContent}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={() => (
            <TextField
              inputRef={register}
              label="Номер телефона, email"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              name="email"
              helperText={errors.email?.message}
              error={!!errors.email}
              autoComplete="off"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={() => (
            <TextField
              inputRef={register}
              label="Пароль"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              name="password"
              helperText={errors.password?.message}
              error={!!errors.password}
            />
          )}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={{ marginTop: 20 }}
          disabled={loadingStatus === LoadingStatus.LOADING}
        >
          Войти
        </Button>
      </form>
    </DialogContent>
  );
};
