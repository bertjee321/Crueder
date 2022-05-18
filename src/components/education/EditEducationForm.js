import { useRef } from "react";

import classes from "./EditEducationForm.module.css";

import Button from "../UI/Button/Button";

const EditEducationForm = (props) => {
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

    console.log(data);
    props.onSubmit(props.data.id, data);
  };

  return (
    <form onSubmit={submitHandler}>
      <h4 style={{ textAlign: "center", marginTop: "0" }}>
        Update Education Details
      </h4>
      <div className={classes["form--control"]}>
        <label htmlFor="tag">Type (select)</label>
        <select id="tag" ref={tagRef} defaultValue={props.data.tag}>
          <option value="" disabled hidden></option>
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
          defaultValue={props.data.endYear}
        ></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          defaultValue={props.data.title}
        ></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          ref={descriptionRef}
          defaultValue={props.data.description}
        ></textarea>
      </div>
      <div className={classes["form--actions"]}>
        <Button type="submit">Confirm</Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditEducationForm;
