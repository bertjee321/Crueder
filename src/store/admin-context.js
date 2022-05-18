import React from "react";

const AdminContext = React.createContext({
  adminLogIn: null,
  logIn: (username, password) => {},
  logOut: () => {},
});

export default AdminContext;