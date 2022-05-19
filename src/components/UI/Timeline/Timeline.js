import classes from "./Timeline.module.css";

import TimelineItem from "./TimelineItem";

const Timeline = (props) => {
  const sortedData = props.data.sort((a, b) => {
    return b.endYear - a.endYear;
  });

  const updateContentHandler = (data) => {
    if (data.type === "education") {
      props.onEditEducation(data);
    }

    if (data.type === "job") {
      props.onEditJobExperience(data);
    }
  };

  return (
    <div className={classes["timeline-container"]}>
      {sortedData.map((data, index) => (
        <TimelineItem data={data} key={index} onClick={updateContentHandler} />
      ))}
    </div>
  );
};

export default Timeline;
