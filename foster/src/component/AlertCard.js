import axios from "axios";
import React from "react";
import config from '../helper/token';

import WeatherAlertClicked from '../assests/weather-alert-clicked.svg';
import PublicAlertClicked from '../assests/public-alert-clicked.svg';
import EmergencyAlertClicked from '../assests/emergency-alert-clicked.svg';
import LawAlertClicked from '../assests/law-enforcement-alert-clicked.svg';

import { useHistory } from "react-router";
import { deleteAlert } from "../store/users/actions";
export default function AlertCard(props) {
  const history = useHistory();
  const { data, setDeleteId, showDetail, setStatusChange, statusChange, setStatusId } = props;

  const edit = () => {
   window.location.replace("/editAlert/" + `${data._id}`);
  };

  const deleteFunction = () => {
    setDeleteId(data._id);
  }; 

  const statusChangeFunction  = () => {
    setStatusId(data._id);
  }

  const deleteAlert = async (id) => {
    await axios.post(`https://spherehunt.app:5000/api/v1/alert/delete/${id}`,{
      headers: { "x-token": config },
    }).then((res) => {
      console.log(res.data);
      setStatusChange(!statusChange);
    }).catch((e) => {
      console.log(e);
    })
  }
  



  return (
    <div class="col-xl-3 col-md-4">
      <div class="card promotion_card">
      {data.imageURL?
        <img
          class="card-img-top"
          style={{width: "100%", height:"20vw", objectFit:"cover"}}
          src={data.imageURL}
          alt="Card image"
          onClick={() => showDetail(data)}
        />
        :
        null
      }

      
        <div class="card-body">
          <div style={{cursor:"pointer"}} onClick={() => showDetail(data)}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{display:"flex"}}>
                {data.tag=="1"?
                   <div style={{display:"flex",alignItems:"center"}}>
                   <div className="alert-tag" style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                       <img src={WeatherAlertClicked} style={{width:"1.25rem",height:"1.25rem"}} />
                   </div>
                   <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                       Weather Alert
                   </span>
               </div>
                : 
                data.tag=="2"?
                <div style={{display:"flex",alignItems:"center"}}>
                <div className="alert-tag"  style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                    <img src={PublicAlertClicked} style={{width:"1.5rem",height:"1.5rem"}} />
                </div>
                <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                    Public Advisory Alert 
                </span>
                </div>
                :
                data.tag=="3"?
                <div style={{display:"flex",alignItems:"center"}}>
                <div className="alert-tag"  style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                    <img src={EmergencyAlertClicked} style={{width:"1.5rem",height:"1.5rem"}} />
                </div>
                <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                    Emergency Alert
                </span>
                </div>
                :
                data.tag=="4"?
                <div style={{display:"flex",alignItems:"center"}}>
                <div className="alert-tag" style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                    <img src={LawAlertClicked} style={{width:"1.5rem",height:"1.5rem"}} />
                </div>
                <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                    Law Enforcement Alert
                </span>
                </div>
                :
                null
                }
            </div>
          <div class="card_actions">
          <div class="action_left">
              <span class={data.duration >=1 && data.status !== "EXPIRED"? "days" : "days expire"}>
              {data.duration > 1 && data.status !== "EXPIRED"?
                `${data.duration} Days` : (data.duration === 1 && data.status !== "EXPIRED")?  `${data.duration} Day` : "Expired"
              }
              </span>
            </div>
            </div>
          </div>
          <h4 class="card-title preview_link" data-target="#preview_one" style={{marginTop:"0.7rem"}}>
            {data && data.title ? data.title : ""}
          </h4>
          <p class="card-text">
            {data && data.description ? data.description : ""}
          </p>
          </div>
          <div class="card_actions mt-2">
            <div class="action_left">
                {data.duration >=1?
              <span onClick={edit} class="action_link edit">
                <i class="las la-edit"></i>
              </span>
              :
              null
              }
              <span
                data-toggle="modal"
                data-target="#deleteModal"
                class="action_link delete"
                onClick={deleteFunction}
              >
                <img src="images/trash.svg" class="trash" />
              </span>
            </div>

            <a data-toggle="modal"
                data-target="#inactiveModal"
                 href="#" onClick={statusChangeFunction} 
                 class="btn btn-primary btn_round" 
                 style={{fontSize:"0.8rem"}}>
                Inactive
            </a>

          </div>
        </div>
      </div>

      
    </div>
  );
}
