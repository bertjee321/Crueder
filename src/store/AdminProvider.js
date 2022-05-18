import { useState } from "react";

import AdminContext from "./admin-context";

// const defaultAdminState = { adminLogIn: false };

const DUMMY_LOG_IN = {
  username: "bkruiter91",
  password: "1234",
};

const AdminProvider = (props) => {
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);

  const adminLoginHandler = (username, password) => {
    if (
      username === DUMMY_LOG_IN.username &&
      password === DUMMY_LOG_IN.password
    ) {
      setAdminIsLoggedIn(true);
    }
  };

  const adminLogOutHandler = () => {
    setAdminIsLoggedIn(false);
  };

  const adminContext = {
    adminLogIn: adminIsLoggedIn,
    logIn: adminLoginHandler,
    logOut: adminLogOutHandler,
  };

  return (
    <AdminContext.Provider value={adminContext}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
