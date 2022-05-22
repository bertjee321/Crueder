import { useRef } from "react";

import classes from "./SummaryForm.module.css";

import Button from "../UI/Button/Button";

const SummaryForm = (props) => {
  const summaryRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const summary = summaryRef.current.value;

    console.log(summary);
    props.onSubmit(summary);
  };

  return (
    <form onSubmit={submitHandler} className={classes.summary}>
      <div className={classes["form--control"]}>
        <label htmlFor="summary">Summary</label>
        <textarea type="area" id="summary" defaultValue={props.data} ref={summaryRef} />
      </div>
      <div className={classes["form--actions"]}>
        <Button type="submit">Confirm</Button>
        <Button onClick={props.onCancelEdit}>Cancel</Button>
      </div>
    </form>
  );
};

export default SummaryForm;
