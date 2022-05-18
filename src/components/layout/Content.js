import classes from "./Content.module.css";

import ContactInfo from "../personal-info/ContactInfo";
import Summary from "../personal-info/Summary";
import Education from "../education/Education";
import JobExperience from "../job-experience/JobExperience";
import ProfSkills from "../personal-info/skills/ProfSkills";
import SoftSkills from "../personal-info/skills/SoftSkills";

const Content = () => {
  return (
    <main className={classes["main--content"]}>
      <div className={classes["content--left"]}>
        <ContactInfo />
        <Summary />
        <Education />
      </div>
      <div className={classes["content--right"]}>
        <JobExperience />
        <ProfSkills />
        <SoftSkills />
      </div>
    </main>
  );
};

export default Content;
