import classes from "./Header.module.css";
import pic from "../../images/mesq.jpg";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.picture}>
        <img src={pic} alt="me" />
      </div>
      <div className={classes.name}>
        <h1>Bert</h1>
        <h1 style={{color: '#9fd3c7'}}>Kruiter</h1>
        <div className={classes.bar}></div>
        <h4>Financial Operations Professional at ING Bank (NL)</h4>
      </div>
    </div>
  );
};

export default Header;