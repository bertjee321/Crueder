import { useRef } from "react";

import classes from "./AddEducationForm.module.css";

import Button from "../UI/Button/Button";

const AddEducationForm = (props) => {
  const tagRef = useRef("");
  const yearRef = useRef("");
  const titleRef = useRef("");
  const descriptionRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      type: "education",
      tag: tagRef.current.value,
      startYear: yearRef.current.value,
      endYear: yearRef.current.value,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    props.onSubmit(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <h4 style={{ textAlign: "center", marginTop: "0" }}>
        Enter new Education
      </h4>
      <div className={classes["form--control"]}>
        <label htmlFor="tag">Type (select)</label>
        <select id="tag" ref={tagRef}>
          <option value=" "></option>
          <option value="education">Education</option>
          <option value="training">Training</option>
          <option value="certificate">Certification</option>
        </select>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="year">Year</label>
        <input
          type="number"
          min="1900"
          max="2099"
          step="1"
          id="year"
          ref={yearRef}
        ></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          defaultValue="e.g. 'Master Business Administration (MBA)'"
          ref={titleRef}
        ></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          defaultValue=""
          ref={descriptionRef}
        ></textarea>
      </div>
      <div className={classes["form--actions"]}>
        <Button type="submit">Confirm</Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default AddEducationForm;
