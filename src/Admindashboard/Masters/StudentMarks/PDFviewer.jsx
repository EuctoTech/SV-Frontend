import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const PDFviewer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const { stuData } = location.state || {};

  const getReportCard = () => {
    setLoading(true);
    axios
      .get(
        `https://www.santhoshavidhyalaya.com/SVSTEST/api/reportCard?term=${stuData?.term}&standard=${stuData?.standard}&section=${stuData?.section}&academic_year=${stuData?.academic_year}&roll_no=${stuData?.roll_no}`
      )
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getReportCard();
  }, []);

  return (
    <div className="vh-100">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spin size="large" />
        </div>
      ) : (
        <iframe
          src={data?.pdf_link ?? ""}
          width="100%"
          height="100%"
          title="PDF Viewer"
        />
      )}
    </div>
  );
};

export default PDFviewer;
