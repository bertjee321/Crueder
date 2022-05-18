import React, { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

import classes from "./ContactInfo.module.css";

import AdminContext from "../../store/admin-context";
import ContactInfoForm from "./ContactInfoForm";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const ContactInfo = () => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest: fetchContactInfo } = useHttp();
  const { sendRequest: updateContactInfo } = useHttp();
  const [editActive, setEditActive] = useState(false);
  const [contactInfoData, setContactInfoData] = useState({});

  const editHandler = () => {
    setEditActive((prevState) => !prevState);
  };

  useEffect(() => {
    const transformContactInfo = (data) => {
      const loadedData = {
        email: data.email,
        linkedIn: data.linkedIn,
        phone: data.phone,
        website: data.website,
      };
      setContactInfoData(loadedData);
    };
    fetchContactInfo(
      {
        url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/contact-data.json",
      },
      transformContactInfo
    );
  }, [fetchContactInfo]);

  const updateContactInfoHandler = (data) => {
    updateContactInfo({
      url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/contact-data.json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: {
        email: data.email,
        linkedIn: data.linkedIn,
        phone: data.phone,
        website: data.website,
      },
    });
    setTimeout(setContactInfoData(data), 500);
    editHandler();
  };

  let content;
  if (editActive && adminCtx.adminLogIn) {
    content = (
      <ContactInfoForm
        data={contactInfoData}
        onCancelEdit={editHandler}
        onSubmit={updateContactInfoHandler}
      />
    );
  } else {
    content = (
      <div>
        {contactInfoData.phone && <p>Phone: {contactInfoData.phone}</p>}
        {contactInfoData.email && <p>E-mail: {contactInfoData.email}</p>}
        {contactInfoData.website && <p>Website: {contactInfoData.website}</p>}
        {contactInfoData.linkedIn && (
          <p>LinkedIn: {contactInfoData.linkedIn}</p>
        )}
        <div className={classes["edit--info"]}>
          {adminCtx.adminLogIn && (
            <Button onClick={editHandler}>Edit Info</Button>
          )}
        </div>
      </div>
    );
  }

  return <Card className={classes.contact}>{content}</Card>;
};

export default ContactInfo;
