import { useContext, useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";

import classes from "./ProfSkills.module.css";

import AdminContext from "../../../store/admin-context";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import SkillsForm from "./SkillsForm";

const ProfSkills = () => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest: fetchProfSkills } = useHttp();
  const { sendRequest: updateProfSkills } = useHttp();
  const [editActive, setEditActive] = useState(false);
  const [profSkillData, setProfSkillData] = useState([]);

  const editHandler = () => {
    setEditActive((prevState) => !prevState);
  };

  useEffect(() => {
    const transformProfSkillData = (data) => {
      const loadedData = [];

      for (const key in data) {
        loadedData.push(data[key]);
      }

      setProfSkillData(loadedData);
    };

    fetchProfSkills(
      {
        url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/prof-skills.json",
      },
      transformProfSkillData
    );
  }, [fetchProfSkills]);

  const updateProfSkillsHandler = (data) => {
    const upper = data.map((element) => element.toUpperCase());

    updateProfSkills({
      url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/prof-skills.json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: upper,
    });

    setProfSkillData(upper);
    editHandler();
  };

  let modalContent;
  if (editActive && adminCtx.adminLogIn) {
    modalContent = (
      <Modal onClose={editHandler}>
        <SkillsForm
          data={profSkillData}
          type={"Professional Skills"}
          onClose={editHandler}
          onSubmit={updateProfSkillsHandler}
        />
      </Modal>
    );
  } else {
    modalContent = null;
  }

  return (
    <Card className={classes.profskills}>
      <h4>PROFESSIONAL SKILLS</h4>
      <div>
        {adminCtx.adminLogIn && (
          <Button onClick={editHandler}>Edit Info</Button>
        )}
      </div>
      <p>{profSkillData.join(" - ")}</p>
      {modalContent}
    </Card>
  );
};

export default ProfSkills;
