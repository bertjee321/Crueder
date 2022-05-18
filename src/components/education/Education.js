import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

import Timeline from "../UI/Timeline/Timeline";
import AdminContext from "../../store/admin-context";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import AddEducationForm from "./AddEducationForm";
import EditEducationForm from "./EditEducationForm";

const Education = () => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest: fetchEducation } = useHttp();
  const { sendRequest: updateEducation } = useHttp();
  const { sendRequest: addEducation } = useHttp();
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [tempData, setTempData] = useState({});

  const addHandler = () => {
    setAddActive((prevState) => !prevState);
  };

  const editHandler = (data) => {
    setTempData(data);
    setEditActive(prevState => !prevState);
  }

  useEffect(() => {
    const transformEducationData = (data) => {
      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          type: data[key].type,
          tag: data[key].tag,
          title: data[key].title,
          description: data[key].description,
          startYear: data[key].startYear,
          endYear: data[key].endYear,
        });
      }

      setEducationData(loadedData);
    };

    fetchEducation(
      {
        url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/education.json",
      },
      transformEducationData
    );
  }, [fetchEducation]);

  const addEducationHandler = (data) => {
    addEducation({
      url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/education.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    addHandler();
  };

  const updateEducationHandler = (id, data) => {
    updateEducation({
      url:
        "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/education/" +
        `${id}` +
        ".json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    setTempData({});
    editHandler();
  };

  return (
    <div>
      <h4 style={{ textAlign: "center", margin: "0px 0px" }}>EDUCATION</h4>
      {adminCtx.adminLogIn ? (
        <div style={{ textAlign: "center", margin: "1px 0" }}>
          <p style={{ textAlign: "center", margin: "0", fontSize: "10px" }}>
            Hover over for more info, click on field to edit
          </p>
          <Button onClick={addHandler}>Add Education</Button>
        </div>
      ) : (
        <p style={{ textAlign: "center", margin: "0", fontSize: "10px" }}>
          Hover over for more info
        </p>
      )}
      <Timeline data={educationData} onEditEducation={editHandler} />
      {addActive && !editActive && adminCtx.adminLogIn && (
        <Modal onClose={addHandler}>
          <AddEducationForm
            onClose={addHandler}
            onSubmit={addEducationHandler}
          />
        </Modal>
      )}
      {!addActive && editActive && adminCtx.adminLogIn && (
        <Modal onClose={editHandler}>
          <EditEducationForm
            data={tempData}
            onClose={editHandler}
            onSubmit={updateEducationHandler}
          />
        </Modal>
      )}
    </div>
  );
};

export default Education;
