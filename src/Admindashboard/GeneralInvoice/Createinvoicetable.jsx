import React,{useState} from 'react';
import $ from 'jquery'; 
import Table from 'react-bootstrap/Table';
import {MdFileDownload,MdOutlineFileDownloadDone} from 'react-icons/md';
import {FaRegEye} from 'react-icons/fa'
import {BiMailSend} from 'react-icons/bi';
import {CiEdit} from 'react-icons/ci';
import { Form, Button } from 'react-bootstrap';

const Users = [
  {
    id: 1,
    selected: false,
    Student_Name: "Mohammed",
    Reg_no: "11241",
    Academic_year: "2023",
    Due_Date:'11/08/2023',
    Invoice_No: "GI2231",
    pay_status:'pending',
    Payable_Amount:'2300',
    // pay_Amount:'36223',
    Paid_Amount:'4000',
    Due_Amount:'2000',
    paid_by:'Hari',
    paid_on:'11/01/2023',
    Parent_Sponsor:'Parent',
    Amount:'43000',
  },
  {
    id: 2,
    selected: false,
    Student_Name: "Fareestha",
    Reg_no: "11239",
    Academic_year: "2023",
    Due_Date:'11/08/2023',
    Invoice_No: "GI2232",
    pay_status:'pending',
    Payable_Amount:'1600',
    // pay_Amount:'36223',
    Paid_Amount:'4000',
    Due_Amount:'2000',
    paid_by:'Sadham',
    paid_on:'11/01/2023',
    Parent_Sponsor:'Parent',
    Amount:'43000',
  },
  {
    id: 3,
    selected: false,
    Student_Name: "Alafiya Sana",
    Reg_no: "11211",
    Academic_year: "2023",
    Due_Date:'11/08/2023',
    Invoice_No: "GI2234",
    pay_status:'pending',
    Payable_Amount:'1830',
    // pay_Amount:'36223',
    Paid_Amount:'4000',
    Due_Amount:'2000',
    paid_by:'Abdul',
    paid_on:'11/01/2023',
    Parent_Sponsor:'Parent',
    Amount:'43000',
  },
  {
    id: 4,
    selected: false,
    Student_Name: "Anis Karthi",
    Reg_no: "11234",
    Academic_year: "2023",
    Due_Date:'11/08/2023',
    Invoice_No: "GI2235",
    pay_status:'pending',
    Payable_Amount:'900',
    // pay_Amount:'36223',
    Paid_Amount:'4000',
    Due_Amount:'2000',
    paid_by:'Prakesh',
    paid_on:'11/01/2023',
    Parent_Sponsor:'Parent',
    Amount:'43000',
  },
  {
    id: 5,
    selected: false,
    Student_Name: "Shivadeen",
    Reg_no: "11241",
    Academic_year: "2023",
    Due_Date:'11/08/2023',
    Invoice_No: "GI2236",
    pay_status:'pending',
    Payable_Amount:'233',
    // pay_Amount:'36223',
    Paid_Amount:'4000',
    Due_Amount:'2000',
    paid_by:'Jothi Shri',
    paid_on:'11/01/2023',
    Parent_Sponsor:'Parent',
    Amount:'43000',
  },
];


class Createinvoicetable extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      List: Users,
      MasterChecked: false,
      SelectedList: [],
      value: '',
      disabled: true,
    };
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: '',
  //     disabled: true,
  //   };
  // }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleEditClick = () => {
    this.setState({ disabled: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the submitted value
    console.log(this.state.value);
    // Disable the input box
    this.setState({ disabled: true });
  }


  componentDidMount() {
    //initialize datatable
    $(document).ready(function () {
        $('#create-invoice').DataTable();
    });
 }
  render(){
    console.log(JSON.stringify(this.state.SelectedList));
    const { value, isEditing } = this.state;

  return (
    <div className="MainDiv">
      <div className="container">
          <Table responsive id="create-invoice" class="display">
            <thead>
                <tr>
                <th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}/>
                  </th>
                    <th>Student Name</th>
                    <th>Student Reg.no</th>
                    <th>Academic year</th>
                    <th>Due Date</th>  
                    <th>Invoice No</th>  
                    <th>Pay Status</th>
                    <th>Pay Amount</th>
                    <th>Paid Amount</th>
                    <th>Due Amount</th>  
                    <th>Paid By</th>  
                    <th>Paid On</th>
                    <th>Parent/Sponsor</th>
                    <th>Amount</th> 
                    <th>Receipt</th> 
                    <th>Action</th>  
                </tr>
            </thead>
            <tbody>
                {this.state.List.map((user) => (
                  <tr key={user.id} className={user.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={user.selected}
                        className="form-check-input"
                        id="rowcheck{user.id}" onChange={(e) => this.onItemCheck(e, user)}/>
                    </th>
                    <td>{user.Student_Name}</td>
                    <td>{user.Reg_no}</td>
                    <td>{user.Academic_year}</td>
                    <td>{user.Due_Date}</td>
                    <td><a href='#'>{user.Invoice_No}</a></td>
                    <td>{user.pay_status}</td>
                    <td>{user.Payable_Amount}</td>
                    <td>{user.Paid_Amount}</td>
                    <td>{user.paid_by}</td>
                    <td>{user.paid_on}</td>
                    <td>{user.Due_Date}</td>
                    <td className='text-center'>{user.Parent_Sponsor}</td>
                    <td>{user.Amount}</td>
                    <td className='text-center'><MdFileDownload size={30} style={{cursor:'pointer' ,color:'green'}} /></td>
                    <td className='text-center'>
                    <a href='/GeneralInvoice/StudentInvoice'> <FaRegEye size={30} style={{color:'#4E0172',cursor:'pointer',paddingRight:'5px'}}/></a> 
                      <BiMailSend size={30} style={{color:'#F9215F',cursor:'pointer'}}/>{''}
                    </td>
                  </tr>
                ))}
              </tbody>
        </Table>
          
        </div>
      </div>
  );
}
}

export default Createinvoicetable


