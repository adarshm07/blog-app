import React from 'react';
import NoAlertIcon from '../assests/NoAlert.svg';

function NoAlert() {

  return (
    <>
    <div style={{display:"flex",justifyContent:"center",flexDirection:'column', alignItems : "center", width:"100%", height:"47vh"}}>
      <img src={NoAlertIcon}></img>
      <h4 className='page_title mt-4' style={{fontWeight:"700"}}>Issue an Alert</h4>
      <p style={{color:"#495057",marginTop:"0.5rem",fontSize:"13px"}}>Start issue an alert here</p>
      <a href="/addAlert" class="btn btn-primary btn_round mt-2">
        <i class="las la-plus"></i> Add Alert
      </a>
    </div>
    </>
  )
}

export default NoAlert