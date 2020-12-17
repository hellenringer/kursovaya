import React, { useEffect } from "react";
import Index from "./components/Main/Index";
import NavBar from "./components/Navbar/Navbar";
import Routes from "./components/Routes";
import Cookies from 'js-cookie';

const App: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [auth, setAuth] = React.useState<boolean>(false);

    useEffect(() => {
        if (Cookies.get('user_logged_in') == 'true') {
            setAuth(true);
        };
    }, []);

    const handleDrawer = () => {
        let status = !open;
        setOpen(status);
    };

    return (
        <>
            <NavBar open={open} setAuth={setAuth} handleDrawer={handleDrawer} />
            <Index open={open}>
                <Routes auth={auth} setAuth={setAuth} />
            </Index>
        </>
    );
};

export default App;

