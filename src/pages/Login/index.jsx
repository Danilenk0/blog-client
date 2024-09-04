import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useState } from "react";
import axios from "../../axios";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responce = await axios.post("/auth/login", {
        email,
        password,
      });

      cookie.set("token", responce.data.token,{expires:1});
      navigate("/");
    } catch (error) {}
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
        className={styles.field}
        label="E-Mail"
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className={styles.field}
        label="Пароль"
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button size="large" variant="contained" fullWidth onClick={handleSubmit}>
        Войти
      </Button>
    </Paper>
  );
};
