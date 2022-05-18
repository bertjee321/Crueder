import React from "react";
import classes from "./App.module.css";

import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";
import AdminProvider from "./store/AdminProvider";

const App = () => {
  return (
    <AdminProvider>
      <div className={classes.main}>
        <Header />
        <Content />
        <Footer />
      </div>
    </AdminProvider>
  );
};

export default App;