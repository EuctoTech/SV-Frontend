import React from 'react';



const Footer = () => {
  return (
    <div className='footerStyle' >
  <footer class="bg-light text-lg-start "> 
    <div class="p-3" style={{backgroundColor:'#c2c2c2',fontSize:'smaller'}}>
     <div className='text-start'> © 2023 Copyright:
       <a style={{fontSize:'12px'}} className="text-dark ps-2" target="_blank" href="https://www.santhoshavidhyalaya.com/">santhoshavidhyalaya</a>
    <div className='text-end' style={{float:'right'}}>VERSION 1.0.0</div>
   </div>
  </div>


</footer>
    </div>
  )
}

export default Footer