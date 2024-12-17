import React from 'react'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {MdOutlineViewInAr} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FirstStandardFeeTable from './FirstStandardFeeTable'
import SecondStandardFeeTable2 from './SecondStandardFeeTable2';
import ThirdStandardFeeTable3 from './ThirdStandardFeeTable3';
import FourthStandardFeeTable4 from './FourthStandardFeeTable4';
import FifthStandardFeeTable5 from './FifthStandardFeeTable5';
import SixthStandardFeeTable6 from './SixthStandardFeeTable6';
import SeventhStandardFeeTable7 from './SeventhStandardFeeTable7';
import EightStandardFeeTable8 from './EightStandardFeeTable8';
import NinethStandardFeeTable9 from './NinethStandardFeeTable9';
import TenthStandardFeeTable10 from './TenthStandardFeeTable10';
import EleventhStandardFeeTable11 from './EleventhStandardFeeTable11';
import TwelvethStandardFeeTable12 from './TwelvethStandardFeeTable12';
import LKGStandardFeeTable from './LKGStandardFeeTable';
import UKGStandardFeeTable from './UKGStandardFeeTable';


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
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
const ViewMapping = () => {

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

  return (

    <div>
    <Sidebar/>
 <div style={{width:'82.5%',float:'right'}} >
   <Header/>
   <div>
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          style={{backgroundColor:'#628AD2'}}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example">
            <Tab label="LKG STD" {...a11yProps(0)} />
            <Tab label="UKG STD" {...a11yProps(1)} />
            <Tab label="1st STD" {...a11yProps(2)} />
            <Tab label="2nd STD" {...a11yProps(3)} />
            <Tab label="3th STD " {...a11yProps(4)} />
            <Tab label="4th STD " {...a11yProps(5)} />
            <Tab label="5th STD " {...a11yProps(6)} />
            <Tab label="6th STD " {...a11yProps(7)} />
            <Tab label="7th STD " {...a11yProps(8)} />
            <Tab label="8th STD " {...a11yProps(9)} />
            <Tab label="9th STD " {...a11yProps(10)} />
            <Tab label="10th STD " {...a11yProps(11)} />
            <Tab label="11th STD " {...a11yProps(12)} />
            <Tab label="12th STD " {...a11yProps(13)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
 {/*--------------------- Tab - LKG --------------------------------------*/}
        <TabPanel value={value} index={0} dir={theme.direction}>
         <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>LKG Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
                <LKGStandardFeeTable/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
 {/*--------------------- Tab - UKG --------------------------------------*/}
        <TabPanel value={value} index={1} dir={theme.direction}>
         <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>UKG Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
                <UKGStandardFeeTable/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
 {/*--------------------- Tab - 1 --------------------------------------*/}
        <TabPanel value={value} index={2} dir={theme.direction}>
         <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>1st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
                <FirstStandardFeeTable/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 2 --------------------------------------*/}
        <TabPanel value={value} index={3} dir={theme.direction}>
        <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>2st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <SecondStandardFeeTable2/>

            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 3 --------------------------------------*/}
        <TabPanel value={value} index={4} dir={theme.direction}>
        <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>3rd Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <ThirdStandardFeeTable3/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 4 --------------------------------------*/}
        <TabPanel value={value} index={5} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>4st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <FourthStandardFeeTable4/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 5 --------------------------------------*/}
        <TabPanel value={value} index={6} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>5st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
            <FifthStandardFeeTable5/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 6 --------------------------------------*/}
        <TabPanel value={value} index={7} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>6st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <SixthStandardFeeTable6/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 7 --------------------------------------*/}
        <TabPanel value={value} index={8} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>7st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <SeventhStandardFeeTable7/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 8 --------------------------------------*/}
        <TabPanel value={value} index={9} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>8st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <EightStandardFeeTable8/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 9 --------------------------------------*/}
        <TabPanel value={value} index={10} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>9st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <NinethStandardFeeTable9/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 10 --------------------------------------*/}
        <TabPanel value={value} index={11} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>10st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <TenthStandardFeeTable10/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 11 --------------------------------------*/}
        <TabPanel value={value} index={12} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>11st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <EleventhStandardFeeTable11/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
  {/*--------------------- Tab - 12 --------------------------------------*/}
        <TabPanel value={value} index={13} dir={theme.direction}>
              <div>
            <div className='py-2'>
                <h5><MdOutlineViewInAr size={45} className='pe-3'/>12st Standard Fee Mapping List</h5>
            </div>
         <Paper elevation={4} className="py-3">
            <div className='container'>
              <TwelvethStandardFeeTable12/>
            </div>
         </Paper>
        </div> 
        </TabPanel>
      </SwipeableViews>
    </Box>

   </div>
</div>
 </div>

  )
}

export default ViewMapping;

<div>
<Table striped bordered hover size="sm">
    <thead>
    <tr>
        <th>Created By</th>
        <th>Academic Year</th>
        <th>Fee Category</th>
        <th>Sub Category</th>
        <th>₹ Total Amount</th>
        <th>Enter Date</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Admin</td>
        <td>2023</td>
        <td>School Fees</td>
        <td></td>
        <td>24600</td>
        <td>11/03/2023</td>
        <td className='text-center'>
            <FaRegEdit  style={{cursor:'pointer'}} className='text-success pb-1 pe-1' size={28} title='Edit'/>
            <MdDelete style={{cursor:'pointer'}}  className='text-danger pb-1 ps-2 ' size={35} title='Delete'/>
        </td>
    </tr>
    <tr>
        <td>Super Admin</td>
        <td>2023</td>
        <td>School miscellaneous bill</td>
        <td>Digital Education</td>
        <td>12450</td>
        <td>26/04/2023</td>
        <td className='text-center'>
            <FaRegEdit  style={{cursor:'pointer'}} className='text-success pb-1 pe-1' size={28} title='Edit'/>
            <MdDelete style={{cursor:'pointer'}}  className='text-danger pb-1 ps-2 ' size={35} title='Delete'/>
        </td>
    </tr>
    <tr>
        <td>Admin</td>
        <td>2023</td>
        <td>School Fees</td>
        <td></td>
        <td>24600</td>
        <td>11/03/2023</td>
        <td className='text-center'>
            <FaRegEdit  style={{cursor:'pointer'}} className='text-success pb-1 pe-1' size={28} title='Edit'/>
            <MdDelete style={{cursor:'pointer'}}  className='text-danger pb-1 ps-2 ' size={35} title='Delete'/>
        </td>
    </tr>
    <tr>
        <td>Admin</td>
        <td>2023</td>
        <td>School Fees</td>
        <td></td>
        <td>24600</td>
        <td>11/03/2023</td>
        <td className='text-center'>
            <FaRegEdit  style={{cursor:'pointer'}} className='text-success pb-1 pe-1' size={28} title='Edit'/>
            <MdDelete style={{cursor:'pointer'}}  className='text-danger pb-1 ps-2 ' size={35} title='Delete'/>
        </td>
    </tr>

    </tbody>
</Table>
</div> 
