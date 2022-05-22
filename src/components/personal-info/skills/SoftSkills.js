import { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";

import classes from "./SoftSkills.module.css";

import AdminContext from "../../../store/admin-context";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import SkillsForm from "./SkillsForm";

const SoftSkills = () => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest: fetchSoftSkills } = useHttp();
  const { sendRequest: updateSoftSkills } = useHttp();
  const [editSoftSkillActive, setEditSoftSkillActive] = useState(false);
  const [editHobbyActive, setEditHobbyActive] = useState(false);
  const [softSkillData, setSoftSkillData] = useState([]);
  const [hobbyData, setHobbyData] = useState([]);

  const editSoftSkillHandler = () => {
    if (editHobbyActive) {
      setEditHobbyActive(false);
    }
    setEditSoftSkillActive((prevState) => !prevState);
  };

  const editHobbyHandler = () => {
    if (editSoftSkillActive) {
      setEditSoftSkillActive(false);
    }
    setEditHobbyActive((prevState) => !prevState);
  };

  useEffect(() => {
    const transformData = (data) => {
      const loadedHobbies = [];
      const loadedSoftSKills = [];

      for (const key in data.hobbies) {
        loadedHobbies.push(data.hobbies[key]);
      }

      for (const key in data["soft-skills"]) {
        loadedSoftSKills.push(data["soft-skills"][key]);
      }

      setSoftSkillData(loadedSoftSKills);
      setHobbyData(loadedHobbies);
    };

    fetchSoftSkills(
      {
        url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/character.json",
      },
      transformData
    );
  }, [fetchSoftSkills]);

  const updateSoftSkillHandler = (data) => {
    updateSoftSkills({
      url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/character/soft-skills.json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: data,
    });

    setSoftSkillData(data);
    editSoftSkillHandler();
  };

  const updateHobbyHandler = (data) => {
    updateSoftSkills({
      url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/character/hobbies.json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: data,
    });

    setHobbyData(data);
    editHobbyHandler();
  };

  let modalContent;
  if (editSoftSkillActive && !editHobbyActive && adminCtx.adminLogIn) {
    modalContent = (
      <Modal onClose={editSoftSkillHandler}>
        <SkillsForm
          data={softSkillData}
          type={"Soft Skills"}
          onClose={editSoftSkillHandler}
          onSubmit={updateSoftSkillHandler}
        />
      </Modal>
    );
  } else if (!editSoftSkillActive && editHobbyActive && adminCtx.adminLogIn) {
    modalContent = (
      <Modal onClose={editHobbyHandler}>
        <SkillsForm
          data={hobbyData}
          type={"Hobbies"}
          onClose={editHobbyHandler}
          onSubmit={updateHobbyHandler}
        />
      </Modal>
    );
  } else {
    modalContent = null;
  }

  return (
    <Card className={classes.softskills}>
      <h4>CHARACTERISTICS</h4>
      {adminCtx.adminLogIn && (
        <Button onClick={editSoftSkillHandler}>Edit Info</Button>
      )}
      <p>{softSkillData.join(" - ")}</p>
      <div className={classes.line} />
      <h4>HOBBIES</h4>
      {adminCtx.adminLogIn && (
        <Button onClick={editHobbyHandler}>Edit Info</Button>
      )}
      <p>{hobbyData.join(" - ")}</p>
      {modalContent}
    </Card>
  );
};

export default SoftSkills;
