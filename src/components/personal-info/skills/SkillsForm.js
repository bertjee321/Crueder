import { useState } from "react";

import classes from "./SkillsForm.module.css";

import SkillsFormField from "./SkillsFormField";
import Button from "../../UI/Button/Button";

const SkillsForm = (props) => {
  const [inputFields, setInputFields] = useState(props.data);
  const [newSkill, setNewSkill] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const data = inputFields;

    props.onSubmit(data)
  };

  const changeHandler = (e) => {
    setNewSkill(e.target.value);
  };

  const addHandler = (e) => {
    e.preventDefault();
    setInputFields((oldArray) => [...oldArray, newSkill]);
    setNewSkill("");
  };

  const deleteHandler = (index) => {
    let tempArray = [...inputFields];
    tempArray.splice(index, 1);
    setInputFields(tempArray);
  };

  return (
    <form>
      <h4>
        Enter {props.type} here
      </h4>
      <div className={classes["form--control"]}>
        <input type="text" onChange={changeHandler} value={newSkill} />
        <div className={classes["form--actions"]}>
          <Button onClick={addHandler}>Add</Button>
        </div>
        {inputFields.map((data, index) => (
          <SkillsFormField key={index} data={data} index={index} onClick={deleteHandler} />
        ))}
        <div className={classes["form--actions"]}>
          <Button onClick={submitHandler}>Confirm</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </div>
      </div>
    </form>
  );
};

export default SkillsForm;