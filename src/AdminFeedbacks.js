import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminFeedback from "./AdminFeedback";
function AdminFeedbacks() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getDetails() {
      await axios
        .get("http://localhost:5000/feedback")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDetails();
  }, []);
  console.log(data);
  return (
    <>
      <h1 className="feedbacks">Feedbacks</h1>
      <div className="grid-container">
        {data.map(function (x) {
          return (
            <AdminFeedback
              key={x._id}
              bid={x.bid}
              name={x.name}
              date={x.date}
              health={x.health}
              sideEffects={x.sideEffects}
            />
          );
        })}
      </div>
    </>
  );
}

export default AdminFeedbacks;
