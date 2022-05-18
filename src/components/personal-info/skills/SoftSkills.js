import classes from "./SoftSkills.module.css";

import Card from "../../UI/Card/Card";

const DUMMY_SOFT_SKILLS = ["Builder", "Humor", "Loyal", "Sincere", "Persistent"];

const DUMMY_HOBBIES = ["Gaming", "Reading", "Coding", "Festivals"];

const SoftSkills = () => {
  return (
    <Card className={classes.softskills}>
      <h4>CHARACTERISTICS</h4>
      <p>{DUMMY_SOFT_SKILLS.join(" - ")}</p>
      <div className={classes.line} />
      <h4>HOBBIES</h4>
      <p>{DUMMY_HOBBIES.join(" - ")}</p>
    </Card>
  );
};

export default SoftSkills;
