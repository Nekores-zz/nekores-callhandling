import { facadeOf } from "./facadeOf";

export { JssProvider } from "react-jss";
export { default as theme } from "../../config/theme";
export const MainApp = facadeOf("MainApp");
export const HubbubSnackbar = facadeOf("LayoutElements/HubbubSnackbar");
export const NavbarSideMenuPage = facadeOf("LayoutElements/NavbarSideMenuPage");
export const MainNavbar = facadeOf("MainNavbar/MainNavbar");
export const Searchbar = facadeOf("Searchbar/Searchbar");