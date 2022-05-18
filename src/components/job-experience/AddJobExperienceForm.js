import { useState, useRef } from "react";

import classes from "./AddJobExperienceForm.module.css";

import Button from "../UI/Button/Button";

const AddJobExperienceForm = (props) => {
  const [currentJob, setCurrentJob] = useState(null);
  const tagRef = useRef("");
  const titleRef = useRef("");
  const startYearRef = useRef("");
  const endYearRef = useRef("");
  const descriptionRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    let endYear;
    if (currentJob) {
      endYear = "Present";
    } else {
      endYear = endYearRef.current.value;
    }

    const data = {
      type: "job",
      tag: tagRef.current.value,
      title: titleRef.current.value,
      startYear: startYearRef.current.value,
      endYear,
      description: descriptionRef.current.value,
    };

    props.onSubmit(data);
  };

  const setCurrentJobHandler = () => {
    setCurrentJob(true);
  };

  const unsetCurrentJobHandler = () => {
    setCurrentJob(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <h4 style={{ textAlign: "center", marginTop: "0" }}>
        Enter new Job Experience
      </h4>
      <div className={classes["form--control"]}>
        <label htmlFor="tag">Organisation</label>
        <input type="text" id="tag" ref={tagRef} />
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="title">Job Title</label>
        <input type="text" id="title" ref={titleRef}></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="startyear">Year Started</label>
        <input
          type="number"
          min="1900"
          max="2099"
          step="1"
          id="startyear"
          ref={startYearRef}
        />
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="current">Current Job?</label>
        <div className={classes.checkbox}>
          <div>
            <input
              type="radio"
              value="yes"
              id="current"
              name="jobradio"
              onClick={setCurrentJobHandler}
            />
            <p>Yes</p>
          </div>
          <div>
            <input
              type="radio"
              value="no"
              id="current"
              name="jobradio"
              onClick={unsetCurrentJobHandler}
            />
            <p>No</p>
          </div>
        </div>
      </div>
      {currentJob === false && (
        <div className={classes["form--control"]}>
          <label htmlFor="endyear">Year Ended</label>
          <input
            type="number"
            min="1900"
            max="2099"
            step="1"
            id="endyear"
            ref={endYearRef}
          />
        </div>
      )}

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

export default AddJobExperienceForm;
