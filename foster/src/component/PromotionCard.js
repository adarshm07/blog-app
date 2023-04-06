import React from "react";

import { useHistory } from "react-router";
export default function PromotionCard(props) {
  const history = useHistory();
  const { data, setDeleteId, showDetail } = props;

  const edit = () => {
    history.push("/editPromotion/" + `${data._id}`);
  };

  const deleteFunction = () => {
    setDeleteId(data._id);
  }; 

  return (
    <div class="col-xl-3 col-md-4">
      <div class="card promotion_card">
        <img
          class="card-img-top"
          style={{width: "100%", height:"20vw", objectFit:"cover"}}
          src={data && data.imageURL ? data.imageURL : "images/1.png"}
          alt="Card image"
          onClick={() => showDetail(data)}
        />
        <div class="card-body">
        <div style={{cursor:"pointer"}} onClick={() => showDetail(data)}>
          <h4 class="card-title preview_link" data-target="#preview_one">
            {data && data.title ? data.title : ""}
          </h4>
          <p class="card-text">
            {data && data.description ? data.description : ""}
          </p>
          </div>
          <div class="card_actions mt-3">
            <div class="action_left">
              <span onClick={edit} class="action_link edit">
                <i class="las la-edit"></i>
              </span>
              <span
                data-toggle="modal"
                data-target="#deleteModal"
                class="action_link delete"
                onClick={deleteFunction}
              >
                <img src="images/trash.svg" class="trash" />
              </span>
            </div>
            <div class="action_left">
              <span class="days">
              {data.duration > 1 && data.status !== "EXPIRED"?
                `${data.duration} Days` : (data.duration >=1 && data.status !== "EXPIRED")?  `${data.duration} Day` : "Expired"
              }
              </span>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
}
