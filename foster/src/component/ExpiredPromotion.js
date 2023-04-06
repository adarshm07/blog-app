import React from "react";
import { useHistory } from "react-router";
export default function ExpiredPromotion(props) {
  const history = useHistory();
  const { data, setDeleteId, showDetail } = props;
  // console.log(data);

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
          src={data ? data.imageURL : ""}
          alt="Card image"
          onClick={() => showDetail(data)}
        />
        <div class="card-body">
          <h4 class="card-title preview_link" data-target="#preview_one">
            {data? data.title : ""}
          </h4>
          <p class="card-text">
            {data? data.description : ""}
          </p>
          <div class="card_actions">
            <div class="action_left">
              <a href="" class="btn btn-primary btn_round promote" onClick={()=> edit()}>
                <i class="las la-bullhorn"></i> Promote
              </a>
              <span
                data-toggle="modal"
                data-target="#deleteModal"
                class="action_link delete"
                onClick={deleteFunction}
              >
                <img src="images/trash.svg" class="trash" />
              </span>
            </div>
            <div className="action_left">
              <span class="days expire">Expired</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
