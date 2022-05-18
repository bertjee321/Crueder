import React, { useRef } from "react";

import classes from "./ContactInfoForm.module.css";

import Button from "../UI/Button/Button";

const ContactInfoForm = (props) => {
  const phoneRef = useRef("");
  const emailRef = useRef("");
  const websiteRef = useRef("");
  const linkedInRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    const contactInfo = {
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      website: websiteRef.current.value,
      linkedIn: linkedInRef.current.value,
    };

    props.onSubmit(contactInfo);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["form--control"]}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          defaultValue={props.data.phone}
          ref={phoneRef}
        ></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={props.data.email}
          ref={emailRef}
        ></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="website">Website</label>
        <input
          type="url"
          id="website"
          name="website"
          defaultValue={props.data.website}
          ref={websiteRef}
        ></input>
      </div>
      <div className={classes["form--control"]}>
        <label htmlFor="linkedIn">LinkedIn</label>
        <input
          type="url"
          id="linkedIn"
          name="linkedIn"
          defaultValue={props.data.linkedIn}
          ref={linkedInRef}
        ></input>
      </div>
      <div className={classes["form--actions"]}>
        <Button type="submit">Confirm</Button>
        <Button onClick={props.onCancelEdit}>Cancel</Button>
      </div>
    </form>
  );
};

export default ContactInfoForm;
