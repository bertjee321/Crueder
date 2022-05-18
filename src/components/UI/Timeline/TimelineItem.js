import classes from "./TimelineItem.module.css";

const TimelineItem = (props) => {
  // const [allVisible, setAllVisible] = useState(false);

  // const itemClass = `${
  //   !allVisible ? classes["timeline-item"] : classes["timeline-item-active"]
  // }`;

  // const showAllHandler = () => {
  //   if (allVisible) {
  //     setAllVisible(false);
  //   } else {
  //     setAllVisible(true);
  //   }
  // };

  const clickHandler = () => {
    props.onClick(props.data);
  }

  let year;
  if (props.data.startYear === props.data.endYear) {
    year = props.data.endYear;
  } else {
    year = props.data.startYear + ' - ' + props.data.endYear;
  }

  return (
    <div className={classes["timeline-item"]} onClick={clickHandler}>
      <div className={classes["timeline-item-content"]}>
        <span className={classes.tag}>{props.data.tag}</span>
        <p className={classes.time}>{year}</p>
        <h5>{props.data.title}</h5>
        <p>{props.data.description}</p>
        {/* <span className={classes.circle}></span> */}
      </div>
    </div>
  );
};

export default TimelineItem;
