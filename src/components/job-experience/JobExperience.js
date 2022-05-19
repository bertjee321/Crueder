import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

import Timeline from "../UI/Timeline/Timeline";
import AdminContext from "../../store/admin-context";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import AddJobExperienceForm from "./AddJobExperienceForm";
import EditJobExperienceForm from "./EditJobExperienceForm";

const JobExperience = () => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest: fetchJobExperience } = useHttp();
  const { sendRequest: updateJobExperience } = useHttp();
  const { sendRequest: addJobExperience } = useHttp();
  const [addActive, setAddActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [jobExperienceData, setJobExperienceData] = useState([]);
  const [tempData, setTempData] = useState({});

  const addHandler = () => {
    setAddActive((prevState) => !prevState);
  };

  const editHandler = (data) => {
    setTempData(data);
    setEditActive((prevState) => !prevState);
  };

  useEffect(() => {
    const transformJobData = (data) => {
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
      setJobExperienceData(loadedData);
    };

    fetchJobExperience(
      {
        url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json",
      },
      transformJobData
    );
  }, [fetchJobExperience]);

  const addJobExperienceHandler = (data) => {
    addJobExperience({
      url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/work-experience/",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    addHandler();
  };

  const updateJobExperienceHandler = (id, data) => {
    updateJobExperience({
      url:
        "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/work-experience/" +
        `${id}` +
        ".json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    editHandler({});
  };

  return (
    <div>
      <h4 style={{ textAlign: "center", margin: "0px 0px" }}>JOB EXPERIENCE</h4>
      {adminCtx.adminLogIn ? (
        <div style={{ textAlign: "center", margin: "1px 0" }}>
          <p style={{ textAlign: "center", margin: "0", fontSize: "10px" }}>
            Hover over for more info, click on field to edit
          </p>
          <Button onClick={addHandler}>Add Job Experience</Button>
        </div>
      ) : (
        <p style={{ textAlign: "center", margin: "0", fontSize: "10px" }}>
          Hover over for more info
        </p>
      )}
      <Timeline data={jobExperienceData} onEditJobExperience={editHandler} />
      {addActive && !editActive && adminCtx.adminLogIn && (
        <Modal onClose={addHandler}>
          <AddJobExperienceForm
            onClose={addHandler}
            onSubmit={addJobExperienceHandler}
          />
        </Modal>
      )}
      {!addActive && editActive && adminCtx.adminLogIn && (
        <Modal onClose={editHandler}>
          <EditJobExperienceForm
            data={tempData}
            onClose={editHandler}
            onSubmit={updateJobExperienceHandler}
          />
        </Modal>
      )}
    </div>
  );
};

export default JobExperience;
