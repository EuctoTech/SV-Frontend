 
  const getStudents = async () => {
    if (newInvoiceClass ) {
      try {
        const response = await fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/studentByGrades/${newInvoiceClass}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          } 
        });
        const data = await response.json();
         if (data) {
           const options = data.map(item => ({
             value: item.id,
             label: item.concordinate_string
           }));
           setOptions(options);
         }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);

      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      data['due_date'] = Cdate;
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const responseData = await response.json();
          Swal.fire({
            icon: 'success',
            title: 'Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    setValidated(true);
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(event.target);

      try {
        const studentIds =  selectedOptions ? selectedOptions.map(option => option.value) : [];
        const created_by = sessionStorage.getItem('user_id');

        const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/feesmap-insertByID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_id: studentIds,
            standard: newInvoiceClass.toString(),
            amount: newAmount.toString(),
            fees_heading: newFeesHeading,
            fees_sub_heading: newFeesSubHeading,
            due_date: Cdate,
            acad_year: newAcadYear.toString(),
            created_by: created_by.toString()
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          Swal.fire({
            icon: 'success',
            title: 'Created successfully !',
            showConfirmButton: false,
            timer: 1800
          })
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }

    setValidated(true);
  };
   