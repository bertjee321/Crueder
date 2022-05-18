import { useContext, useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";

import classes from "./Summary.module.css";

import AdminContext from "../../store/admin-context";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import SummaryForm from "./SummaryForm";

const Summary = () => {
  const adminCtx = useContext(AdminContext);
  const { sendRequest: fetchSummary } = useHttp();
  const { sendRequest: updateSummary } = useHttp();
  const [editActive, setEditActive] = useState(false);
  const [summary, setSummary] = useState("");

  const editHandler = () => {
    setEditActive((prevState) => !prevState);
  };

  useEffect(() => {
    const transformSummary = (summaryData) => {
      setSummary(summaryData.text);
    };
    fetchSummary(
      {
        url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/summary.json",
      },
      transformSummary
    );
  }, [fetchSummary]);

  const updateSummaryHandler = (summaryText) => {
    updateSummary({
      url: "https://digital-cv-8561c-default-rtdb.europe-west1.firebasedatabase.app/summary/text.json",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: summaryText,
    });

    setTimeout(setSummary(summaryText), 500);
    editHandler();
  };

  if (editActive && adminCtx.adminLogIn) {
    return (
      <Card>
        <SummaryForm
          data={summary}
          onCancelEdit={editHandler}
          onSubmit={updateSummaryHandler}
        />
      </Card>
    );
  }

  return (
    <Card className={classes.summary}>
      <h4>SUMMARY</h4>
      <p>{summary}</p>
      <div className={classes["edit--info"]}>
        {adminCtx.adminLogIn && (
          <Button onClick={editHandler}>Edit Info</Button>
        )}
      </div>
    </Card>
  );
};

export default Summary;
