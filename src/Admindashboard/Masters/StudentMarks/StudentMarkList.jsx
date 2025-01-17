import React from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import { Edit, Add } from "@mui/icons-material";
import { Button } from "react-bootstrap";

export default function StudentMarkList() {
  const navigate = useNavigate();

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />
        <section className="p-4">
          <div>
            <div className="d-flex justify-content-between align-items-center py-3">
              <div className="flex-grow-1 text-center title-txt">
                <h4 className="pb-0 m-0">Contact </h4>
              </div>
              <Button
                variant="primary"
                onClick={() =>
                  navigate("/create/student/marks", {
                    state: {
                      type: "add",
                    },
                  })
                }
              >
                Add <Add />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
