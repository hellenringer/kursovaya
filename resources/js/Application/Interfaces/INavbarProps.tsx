import { RouteComponentProps } from "react-router-dom";

interface INavbarProps extends RouteComponentProps<any> {
    open: boolean,
    handleDrawer(): void
    setAuth: any;

}

export default INavbarProps;

