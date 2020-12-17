import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './includes/Copyright';
import useStyles from './includes/styles';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ILoginViewProps from '../../Interfaces/ILoginViewProps';

const LoginView: React.FC<ILoginViewProps> = ({ auth, setAuth, history }) => {
    const classes = useStyles();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', {
                email: email,
                password: password
            }).then(function (response) {
                logIn()
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    function logIn() {
        Cookies.set('user_logged_in', 'true', { expires: 86400, sameSite: 'lax' })
        setAuth(true);
        history.push('/')
    }

    return (!auth ?
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Введите email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Введите пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary" />}
                        label="Запомнить меня"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        className={classes.submit}
                    >
                        Войти
                    </Button>
            
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <NavLink to="/register">
                                {"Ещё нет аккаунта? Зарегистрироваться"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
        : <Redirect to="/" />
    );
}

export default withRouter(LoginView);