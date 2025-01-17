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

export default function ContactDataBase() {
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
      accessorKey: "id",
      header: "Id",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "mobileNo",
      header: "Mobile No",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "email",
      header: "Email Id",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
    {
      accessorKey: "contactType",
      header: "Contact Type",
      size: 40,
      Cell: ({ cell }) => cell.getValue() || "-",
    },
  ];

  const getContactData = () => {
    axios
      .get("https://www.santhoshavidhyalaya.com/SVSTEST/api/contact/all")
      .then((res) => {
        console.log('res?.data', res?.data)
        const isData = res?.data?.contact;
        setData(isData);
        setLoading(false);
      });
  };

  useEffect(() => {
    getContactData();
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
                  <h4 className="pb-0 m-0">Contact </h4>
                </div>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate("/create/and/edit/contactDatabase", {
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
                          navigate("/create/and/edit/contactDatabase", {
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
                          navigate("/view/contactDatabase/details", {
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
