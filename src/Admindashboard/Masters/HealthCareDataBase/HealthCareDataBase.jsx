import { Spin } from "antd";
import MaterialReactTable from "material-react-table";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Add } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export default function HealthCareDatBase() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const columns = [
    // {
    //   accessorKey: "sno",
    //   header: "S.No",
    //   size: 30,
    //   Cell: ({ row }) => row.index + 1, // Dynamically generate S.No
    // },
    {
      accessorKey: "student_id",
      header: "Student Id",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "studentName",
      header: "Student Name",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "admissionNo",
      header: "Admission Number",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "class",
      header: "Class",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "section",
      header: "Section",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "contactNo",
      header: "Contact Number",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "fatherName",
      header: "Father Name",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "treatment_type",
      header: "Treatment Type",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "nature_of_sickness",
      header: "Nature of Sickness",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
  ];

  const getHealthCareData = () => {
    axios
      .get("https://www.santhoshavidhyalaya.com/SVSTEST/api/healthcare/viewAll")
      .then((res) => {
        const isData = res?.data?.healthcare_records;
        setData(isData);
        setLoading(false);
      });
  };

  useEffect(() => {
    getHealthCareData();
  }, []);

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />
        <section className="p-4">
          {isLoading ? (
            <div className="spin-style vh-100">
              <Spin size="large" />
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between align-items-center py-3">
                <div className="flex-grow-1 text-center title-txt">
                  <h4 className="pb-0 m-0">Health Care Database</h4>
                </div>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate("/create/and/edit/healthCare", {
                      state: {
                        type: "add",
                      },
                    })
                  }
                >
                  Add <Add />
                </Button>
              </div>
              <MaterialReactTable
                paginationDisplayMode="pages"
                enableStickyHeader={true}
                enableFullScreenToggle={false}
                getRowId={(row) => row.id}
                enableGlobalFilter={true} // Enables the "Show/Hide Search" option
                enableColumnFilters={true} // Disables the "Show/Hide Filter" option
                enableHiding={false}
                enableRowActions={true}
                // enableRowSelection={true}
                initialState={{
                  showGlobalFilter: true, // Show the global search by default
                  showColumnFilters: true, // Ensure column filters are hidden by default
                  pagination: {
                    pageSize: 20,
                  },
                  columnOrder: [
                    //   "mrt-row-select", // Ensure the checkbox column is displayed first
                    "mrt-row-actions", // Ensure the actions column is displayed next
                    ...columns.map((col) => col.id), // Other columns in their default order
                  ],
                }}
                columns={columns}
                data={data}
                renderRowActions={({ row }) => (
                  <div style={{ display: "flex", gap: "8px" }}>
                    {/* Edit Action */}
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate("/create/and/edit/healthCare", {
                            state: {
                              type: "edit",
                              id: row.original.id,
                            },
                          })
                        }
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    {/* View Action */}
                    <Tooltip title="View">
                      <IconButton
                        color="success"
                        onClick={() => {
                          navigate("/view/healthCare/details/", {
                            state: { id: row.original.id },
                          });
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
