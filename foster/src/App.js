import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./component/DashBoard";
import Promotion from "./component/Promotion";
import AddPromotion from "./component/AddPromotion";
import AddAlert from "./component/AddAlert";
import EditPromotion from "./component/EditPromotion";
import Login from "./component/login";
import Logout from "./component/Logout";
import ForgetPassword from "./component/forgetPassword";
import ResetPassword from "./component/resetPassword";
import ProtectedRoute from "./ProtectedRoute";
import SuccessPage from "./component/successPage";
import Alerts from "./component/Alerts";
import EditAlert from "./component/EditAlert";
// import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <main className="">
          <Switch>
            <Route exact path="/" component={Login} />

            <ProtectedRoute exact path="/logout" component={Logout} />
            <Route exact path="/forgetPassword" component={ForgetPassword} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/success" component={SuccessPage} />

            <ProtectedRoute exact path="/dashBoard" component={DashBoard} />
            <ProtectedRoute exact path="/promotion" component={Promotion} />
            <ProtectedRoute exact path="/alert" component={Alerts} />
            <ProtectedRoute
              exact
              path="/addPromotion"
              component={AddPromotion}
            />
            <ProtectedRoute
              exact
              path="/addAlert"
              component={AddAlert}
            />

            <ProtectedRoute
              exact
              path="/editPromotion/:id"
              component={EditPromotion}
            />

            <ProtectedRoute
              exact
              path="/editAlert/:id"
              component={EditAlert}
            />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
