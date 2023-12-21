import React from "react";
import { Column } from "@ant-design/charts";
import axios from "axios";
import { useEffect, useState } from "react";

function Metrics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSubscribedPolicies();
  }, []);

  const getSubscribedPolicies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/InsuranceHub/admin/policies`
      );

      if (response.status === 200) {
        console.log(response.data);
        setData([
          {
            category: "auto",
            count: response.data["auto"].length,
          },
          {
            category: "life",
            count: response.data["life"].length,
          },
          {
            category: "home",
            count: response.data["home"].length,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const config = {
    data,
    xField: "category",
    yField: "count",
    meta: {
      category: { alias: "Category" },
      count: { alias: "Count" },
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };

  return (
    <>
      {data && (
        <>
          <div className="row">
            <h3>Policy count by policy type:</h3>
          </div>
          <div className="row mt-5">
            <Column {...config} />
          </div>
        </>
      )}
    </>
  );
}

export default Metrics;
