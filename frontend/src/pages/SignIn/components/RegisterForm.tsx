import React, { useEffect, useRef } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { SignInStyles } from "..";
import { RegisterDataInterface } from "../../../services/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { selectLoadingUserState } from "../../../store/ducks/user/selectors";
import {
  INotificationConfig,
  Notification,
} from "../../../components/Notification";
import { LoadingStatus } from "../../../store/types";
import { fetchRegister } from "../../../store/ducks/user/actionCreators";

interface RegisterFormProps {
  classes: SignInStyles;
}

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле")
    .min(6, "Минимальное количество символов 6"),
  confirm: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают"),
  fullname: yup.string().required("Введите имя"),
  username: yup.string().required("Введите уникальный ник"),
});

export const RegisterForm: React.FC<RegisterFormProps> = ({ classes }) => {
  const {
    handleSubmit,
    control,
    register,
    errors,
  } = useForm<RegisterDataInterface>({
    resolver: yupResolver(registerSchema),
  });

  const loadingStatus = useSelector(selectLoadingUserState);
  const dispatch = useDispatch();

  const onSubmit = async (data: RegisterDataInterface) => {
    dispatch(fetchRegister(data));
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
              label="Адресс электронной почты"
              variant="outlined"
              margin="dense"
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
          name="fullname"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={() => (
            <TextField
              inputRef={register}
              label="Полное имя"
              variant="outlined"
              margin="dense"
              fullWidth
              type="text"
              name="fullname"
              helperText={errors.fullname?.message}
              error={!!errors.fullname}
              autoComplete="off"
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={() => (
            <TextField
              inputRef={register}
              label="Уникальный ник"
              variant="outlined"
              margin="dense"
              fullWidth
              type="text"
              name="username"
              helperText={errors.username?.message}
              error={!!errors.username}
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
              margin="dense"
              fullWidth
              type="password"
              name="password"
              helperText={errors.password?.message}
              error={!!errors.password}
              autoComplete="off"
            />
          )}
        />
        <Controller
          name="confirm"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={() => (
            <TextField
              inputRef={register}
              label="Повторите пароль"
              variant="outlined"
              margin="dense"
              fullWidth
              type="password"
              name="confirm"
              helperText={errors.confirm?.message}
              error={!!errors.confirm}
              autoComplete="off"
            />
          )}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.registerBtn}
          disabled={loadingStatus === LoadingStatus.LOADING}
        >
          Зарегистрироваться
        </Button>
      </form>
    </DialogContent>
  );
};
