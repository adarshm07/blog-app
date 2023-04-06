import React from 'react';
import NoPromotionIcon from '../assests/NoPromotion.svg';

function NoOngoingPromotion() {
  return (
    <>
    <div style={{display:"flex",justifyContent:"center",flexDirection:'column', alignItems : "center", width:"100%", height:"47vh"}}>
      <img src={NoPromotionIcon}></img>
      <h4 className='page_title mt-4' style={{fontWeight:"700"}}>Start a Promotion</h4>
      <p style={{color:"#495057",marginTop:"0.5rem",fontSize:"13px"}}>Start your promotion here.</p>
      <a href="/addPromotion" class="btn btn-primary btn_round mt-2">
        <i class="las la-plus"></i> Add Promotion
      </a>
    </div>
    </>
  )
}

export default NoOngoingPromotion