import { useState, useContext } from "react";
import classes from "./AdminLogin.module.css";

import AdminContext from "../../../store/admin-context";

const AdminLogin = (props) => {
  const adminCtx = useContext(AdminContext);
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    adminCtx.logIn(enteredUsername, enteredPassword);
    props.onClose();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={enteredUsername}
          onChange={usernameChangeHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
        />
      </div>
      <div className={classes.actions}>
        <button className={classes.button} type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default AdminLogin;