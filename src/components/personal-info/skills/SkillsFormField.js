import classes from "./SkillsFormField.module.css";
import img from "../../../images/del-icon.jpg";

const SkillsFormField = (props) => {
  const deleteHandler = () => {
    props.onClick(props.index);
  };

  return (
    <div className={classes.field}>
      <p>{props.data}</p>
      <img onClick={deleteHandler} src={img} />
    </div>
  );
};

export default SkillsFormField;
