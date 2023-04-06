import React from 'react';
import NoPromotionIcon from '../assests/NoPromotion.svg';

function NoExpiredPromotion() {
  return (
    <>
    <div style={{display:"flex",justifyContent:"center",flexDirection:'column', alignItems : "center", width:"100%", height:"47vh"}}>
      <img src={NoPromotionIcon}></img>
      <h4 className='page_title mt-4' style={{fontWeight:"700"}}>No Expired Promotions Yet</h4>
      <p style={{color:"#495057",marginTop:"0.5rem",fontSize:"13px"}}>You can see your expired promotions here.</p>
    </div>
    </>
  )
}

export default NoExpiredPromotion