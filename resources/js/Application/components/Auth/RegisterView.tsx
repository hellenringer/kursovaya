import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './includes/Copyright';
import useStyles from './includes/styles';
import { NavLink,  Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import IRegisterViewProps from '../../Interfaces/IRegisterViewProps';

export default function RegisterView() {
//const RegisterView: React.FC<IRegisterViewProps> = ({ auth, setAuth, history }) => {
    const classes = useStyles();
   const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
const [password, setPassword] = React.useState<string>('');


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
   

       axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post('/api/register', {
                'name': name, 
                'email': email,
                'password': password,
                'password_confirmation': password
            }).then(function (response) {
                logIn()
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    function logIn() {
        console.log('авторизация')
       // Cookies.set('user_logged_in', 'true', { expires: 86400, sameSite: 'lax' })
        //setAuth(true);
        //history.push('/')
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Регистрация
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Введите имя"
                        name="name"
                        autoFocus
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Введите email"
                        name="email"
                        autoComplete="email"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Придумайте пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
                        Зарегистрироваться
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to="/login">
                                {"Уже есть аккаунт? Войдите"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}


//export default withRouter(RegisterView);