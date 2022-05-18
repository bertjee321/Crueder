import { useState, useContext } from "react";
import classes from "./Footer.module.css";

import Modal from "../UI/Modal/Modal";
import AdminContext from "../../store/admin-context";
import AdminLogin from "../UI/Login-form/AdminLogin";

const Footer = (props) => {
  const adminCtx = useContext(AdminContext);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  const adminLoggedIn = adminCtx.adminLogIn;

  const loginScreenHandler = () => {
    setLoginIsOpen(!loginIsOpen);
  };

  const adminLogoutHandler = () => {
    adminCtx.logOut();
  };

  let content;
  if (adminLoggedIn) {
    content = (
      <div>
        <p>Admin is logged in!</p>
        <button>Click here to add, change or remove info</button>
        <button onClick={adminLogoutHandler}>
          Click here to log out as Admin
        </button>
      </div>
    );
  } else {
    content = (
      <div>
        <p className={classes.clickable} onClick={loginScreenHandler}>Click here to log in as Admin</p>
        <p style={{ marginTop: "10px", fontSize: "12px", fontStyle: "italic" }}>
          2022 - Bert Kruiter
        </p>
      </div>
    );
  }

  return (
    <div className={classes.footer}>
      {content}
      {loginIsOpen && (
        <Modal onClose={loginScreenHandler}>
          <AdminLogin onClose={loginScreenHandler} />
        </Modal>
      )}
    </div>
  );
};

export default Footer;
