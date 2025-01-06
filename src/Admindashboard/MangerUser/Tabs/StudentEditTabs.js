import * as React from "react";
import PropTypes from "prop-types";
import { AppBar, useTheme, Tabs, Tab, Typography, Box } from "@mui/material";
import EditStudentProfile from "../EditStudentProfile";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function StudentEditTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  const { admission_id, profile_id } = location.state || {}; // Access passed state safely

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />

        <Box sx={{ bgcolor: "background.paper" }}>
          <AppBar
            position="sticky"
            style={{
              top: 45, // Adjust this value to the height of your Header component
              zIndex: 999, // Slightly lower than the header's z-index
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Edit Student Profile" {...a11yProps(0)} />
              <Tab label="Edit Student Application" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <EditStudentProfile
              type={"student_profile"}
              profile_id={profile_id}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <EditStudentProfile
              type={"student_application"}
              admission_id={admission_id}
            />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
