import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Login.module.scss";
import { useState } from "react";
import axios from "../../axios";
import cookies from "js-cookie";
import {useNavigate} from 'react-router-dom'

export const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post("/auth/register", {
        fullName,
        email,
        password,
      });

      cookies.set("token", responce.data.token, { expires: 1 });
      navigate('/');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField
        className={styles.field}
        label="Полное имя"
        fullWidth
        onChange={(e) => setFullName(e.target.value)}
      />
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
      <Button onClick={handleSubmit} size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
