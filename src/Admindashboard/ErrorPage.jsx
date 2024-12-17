import React from 'react';
import ErrorPages from './3959810.jpg';
import {Row,Col} from 'react-bootstrap';
import Logo from '../Assets/logo.jpeg'

const ErrorPage = () => {
  return (
    <div className='d-flex'>
       <img style={{width:'45%',height:'10%'}} src={ErrorPages} alt='404 Error Image'/>

       <div style={{padding:'200px'}} >
        <img src={Logo} style={{width:'30%'}} alt='logo'/>
         <h4>404 It's an Error</h4>
         <h6>We Can't seem to find the page you looking for, This requested URL was not found on server</h6>

        <div className='pt-3'>
            <a href='/svsportaladmintest/'>
          <button class="button-82-pushable" role="button">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Go to Login Page
            </span>
        </button></a>

        </div>
       </div>
    </div>
  )
}

export default ErrorPage


