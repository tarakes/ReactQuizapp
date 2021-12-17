import Navbarstyle from "../styles/navbar.module.css";
export default function Navbar({ children }) {
  return (
    <nav className={Navbarstyle.nav}>
      <span className={Navbarstyle.child}>{children}</span>
      <img src={"/image/testlogo.svg"} alt="Icon" />
    </nav>
  );
}
