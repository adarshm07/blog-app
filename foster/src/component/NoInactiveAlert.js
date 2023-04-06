import React from 'react';
import NoAlertIcon from '../assests/NoAlert.svg';

function NoInactiveAlert(props) {
  console.log(props);
  return (
    <>
    <div style={{display:"flex",justifyContent:"center",flexDirection:'column', alignItems : "center", width:"100%", height:"47vh"}}>
      <img src={NoAlertIcon}></img>
      {props.type === "ALL"?
         <>
         <h4 className='page_title mt-4' style={{ fontWeight: "700" }}>There's Nothing to Show Here</h4>
         <p style={{ color: "#495057", marginTop: "0.5rem", fontSize: "13px" }}>You can see your inactive and expired alerts here.</p>
         </>
         :
         <>
         <h4 className='page_title mt-4' style={{fontWeight:"700"}}>No {props.type} Alerts Yet</h4>
         <p style={{color:"#495057",marginTop:"0.5rem",fontSize:"13px"}}>You can see your {props.type} alerts here.</p>
         </>
      }

    </div>
    </>
  )
}

export default NoInactiveAlert