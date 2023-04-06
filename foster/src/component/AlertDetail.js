import * as React from "react";

import Drawer from "@mui/material/Drawer";
import { AiOutlineClose } from "react-icons/ai";
import { useHistory } from "react-router";
import moment from 'moment';
import WeatherAlertClicked from '../assests/weather-alert-clicked.svg';
import PublicAlertClicked from '../assests/public-alert-clicked.svg';
import EmergencyAlertClicked from '../assests/emergency-alert-clicked.svg';
import LawAlertClicked from '../assests/law-enforcement-alert-clicked.svg';


export default function TemporaryDrawer({ data, onClose, setDeleteId }) {
  console.log(data);
  let history = useHistory();
  const deleteFunction = () => {
    onClose();
    setDeleteId(data._id);
  };
  const edit = () => {
    history.push(`/editAlert/${data._id}`);
  };
  const Date = data.createdAt.split("T");
  return (
    <div>
      <Drawer
        anchor="right"
        open={true}
        onClose={onClose}
        hideBackdrop={false}
        classes={{ paperAnchorRight: "preview-promotion-sidebar p-3" }}
        transitionDuration={1000}
      >
        <div class="d-flex justify-content-between align-items-center ">
          <h2 class="page_title" style={{fontSize:"1rem"}}>Preview Alert</h2>
          <div
            class="h-100 rounded d-flex  p-1 cr-pt"
            style={{ backgroundColor: "#e2e9f0" }}
            onClick={onClose}
          >
            <AiOutlineClose
              class="m-auto"
              style={{ color: "#3f6870" }}
            />
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:"3rem",marginBottom:"0.5rem"}}>
          {data.tag == 1?
            <div style={{display:"flex",alignItems:"center"}}>
                <div className="alert-tag" style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                    <img src={WeatherAlertClicked} style={{width:"1.25rem",height:"1.25rem"}} />
                </div>
                <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                   Weather Alert
                </span>
            </div>
            :
            data.tag == 2?
            <div style={{display:"flex",alignItems:"center"}}>
                <div className="alert-tag" style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                    <img src={PublicAlertClicked} style={{width:"1.25rem",height:"1.25rem"}} />
                </div>
                <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                    Public Advisory Alert
                </span>
            </div>
            :
            data.tag == 3?
            <div style={{display:"flex",alignItems:"center"}}>
                <div className="alert-tag" style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                    <img src={EmergencyAlertClicked} style={{width:"1.25rem",height:"1.25rem"}}/>
                </div>
                <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                    Emergency Alert
                </span>
            </div>
            :
            data.tag == 4?
            <div style={{display:"flex",alignItems:"center"}}>
                <div className="alert-tag" style={{backgroundColor:"#ff6a76",width:"2rem",height:"2rem",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",marginRight:"0.5rem"}}>
                    <img src={LawAlertClicked} />
                </div>
                <span className="tag-text" style={{fontFamily: "Inter",fontSize: "1rem",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.57",letterSpacing: "normal",textAlign: "left",color: "#797e80"}}>
                    Law Enforcement Alert
                </span>
            </div>
            :
            null
          }
            <div className="card_actions" style={{marginTop:"0.25rem"}}>
            <span class={data.duration >=1 && data.status !== "EXPIRED"? "days" : "days expire"}>
            {data.duration > 1 && data.status !== "EXPIRED" ?
                `${data.duration} Days` : (data.duration >=1 && data.status !== "EXPIRED")?  `${data.duration} Day` : "Expired"
            }
              </span>
              </div>
        </div>
        <div>
        <h2
          class="card-title preview_link mt-3"
          style={{ fontSize: "1rem", flex: 1 }}
        >
          {data?.title}
        </h2>
          <p class="card-text mt-1">{data.description}</p>
          {data.imageURL?
          <img src={data.imageURL} alt={data.title} class="w-100 rounded" />
          :
          null
        }
          <div class="card_actions mt-3">
            <div class="action_left d-flex justify-content-between align-items-baseline">
              <h2
                class="card-title preview_link "
                style={{ fontSize: "1rem", flex: 1 }}
              >
                Selected Regions
              </h2>

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

            <div className="countries-lists">
            {data.countries && data.countries.length>0 && data.countries.map((ele) => (
              <p class="card-text" style={{fontSize:"0.825rem"}}>{ele.description} - {ele.locationType}</p>
            ))}
            </div>
            <h4
              class="card-title preview_link mt-0 mb-0"
              style={{ fontSize: "1rem" }}
            >
              Duration
            </h4>
            <p class="card-text mt-1" style={{fontSize:"0.825rem"}}>
            {data.duration > 1 ?
                `${data.duration} Days` : `${data.duration} Day` 
            }
            </p>
            <h4
              class="card-title preview_link mt-0 mb-0"
              style={{ fontSize: "1rem" }}
            >
              Issued On
            </h4>
            <p class="card-text mt-1" style={{fontSize:"0.825rem"}}>{data && data.createdAt && moment(data.createdAt).format("DD MMM YYYY") }</p> 
          </div>
        </div>
      </Drawer>
    </div>
  );
}
