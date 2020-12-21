import React from 'react';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AppBar, Badge, Box, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './includes/style';
import { Link, NavLink, withRouter } from 'react-router-dom';
import INavbarProps from '../../Interfaces/INavbarProps';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const NavBar: React.FC<INavbarProps> = ({ open, handleDrawer, setAuth, history, userMoney }) => {
    const classes = useStyles();
    const theme = useTheme();
    //меню при клике на аватарку

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/logout').then(function (response) {
         Cookies.remove('user_logged_in')
        setAnchorEl(null);
        setAuth(false);
        history.push('/login');
            }).catch(function (error) {
                console.log(error);
            });
        });
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        onClick={handleDrawer}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                         Jonquil
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                  
                        <IconButton 
                        aria-label="show 17 new notifications" 
                        color="inherit">
                                    
                                    <CreditCardIcon color="action"/> 
                                   {userMoney}

                            </IconButton> 
                            <Link to="/payment">
                            <IconButton 
                            edge="end"
                            aria-label="show 17 new notifications" 
                            color="secondary">
                                <Badge badgeContent={0} color="secondary">
                                    
                                    <ShoppingCartIcon color="action"/>
                               
                                </Badge>
                            </IconButton>
                        </Link>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle color="action" />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawer}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                                <ChevronRightIcon />
                            )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {[{ 'title': "Articles", 'url': '/' }, { 'title': "Products", 'url': '/products' }].map((value, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <NavLink to={value.url}>
                                <ListItemText primary={value.title} />
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {renderMenu}
        </>
    )
}

export default withRouter(NavBar);
