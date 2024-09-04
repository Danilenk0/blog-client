import React from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import cookie from 'js-cookie'
import {useNavigate} from 'react-router-dom'

export const Header = () => {
  const navigation = useNavigate()
  const onClickLogout = () => {
    cookie.remove("token");
    navigation("/login");
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>MIHAIL BLOG</div>
          </a>
          <div className={styles.buttons}>
            {cookie.get('token') ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
