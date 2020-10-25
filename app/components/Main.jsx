/**
 * Created by Andrzej on 02.02.2018.
 */
import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoginPage from "pages/LoginPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import TwoColumnPage from "pages/pagePatterns/TwoColumnPage";
import ScrollPanel from "pages/pagePatterns/announcements/ScrollPanel";
import Sales from "pages/pagePatterns/sales/Sales";
import SiteMapPage from "pages/SiteMapPage";
import HomePage from "pages/HomePage/HomePage";
import NumbersPage from "pages/NumbersPage";
import NumbersManagementPage from "pages/NumbersManagementPage";
import UsersPage from "pages/UsersPage";
import SecurityPage from "../pages/SecurityPage";
import AudioPage from "../pages/AudioPage";
import AccountsPage from "pages/AccountsPage";
import GroupsPage from "pages/GroupsPage";
import ServicesPage from "pages/ServicesPage";
import ReportPage from "pages/ReportPage";
import CallCarePage from "pages/CallCarePage";
import ServiceDesignerPage from "pages/ServiceDesignerPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { usersList } from "config/mockData";

// let setState = Component.prototype.setState;

// Component.prototype.setState = function setStateExt (...args) {
//   setState.apply(this, args);
//   console.log(`${this.__proto__.constructor.name} setState`, args);
// };

class Main extends Component {
  render() {
    return (
      <CssBaseline>
        <Router>
          <Switch>
            <Route path="/" exact component={SiteMapPage} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/report" component={ReportPage} />
            <Route path="/audio" component={AudioPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Route path="/call-care" component={CallCarePage} />
            <Route path="/groups" component={GroupsPage} />
            <Route path="/numbers" component={NumbersPage} />
            <Route path="/numbers-management" component={NumbersManagementPage} />
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route
              path="/login_users_list"
              exact
              render={props => <LoginPage usersList={usersList} />}
            />
            <Route
              path="/reset_password"
              exact
              render={() => (
                <ResetPasswordPage
                  isVerified={true}
                  isResetForced={false}
                  isCreateMode={false}
                  submitHandler={() => {}}
                />
              )}
            />
            <Route
              path="/forgot_password"
              exact
              render={() => <ForgotPasswordPage submitHandler={() => {}} />}
            />
            <Route path="/index_page" exact component={SiteMapPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/permissions" component={SecurityPage} />
            <Route path="/permission-sets" component={SecurityPage} />
            <Route path="/roles" component={SecurityPage} />
            <Route path="/policies" component={SecurityPage} />
            <Route path="/service-designer" component={ServiceDesignerPage} />

            <Route
              path="/login_advertisement"
              exact
              render={props => (
                <TwoColumnPage
                  leftColumnComponent={<LoginPage isLanding={false} />}
                  rightColumnComponent={<Sales />}
                />
              )}
            />

            <Route
              path="/login_users_list_announcements"
              exact
              render={props => (
                <TwoColumnPage
                  leftColumnComponent={<LoginPage isLanding={false} usersList={usersList} />}
                  rightColumnComponent={<ScrollPanel />}
                />
              )}
            />

            <Route
              path="/login_users_list_advertisement"
              exact
              render={props => (
                <TwoColumnPage
                  leftColumnComponent={<LoginPage isLanding={false} usersList={usersList} />}
                  rightColumnComponent={<Sales />}
                />
              )}
            />

            <Route
              path="/reset_password_announcements"
              exact
              render={() => (
                <TwoColumnPage
                  leftColumnComponent={
                    <ResetPasswordPage
                      isLanding={false}
                      isVerified={true}
                      isCreateMode={false}
                      submitHandler={() => {}}
                    />
                  }
                  rightColumnComponent={<ScrollPanel />}
                />
              )}
            />

            <Route
              path="/reset_password_advertisement"
              exact
              render={() => (
                <TwoColumnPage
                  leftColumnComponent={
                    <ResetPasswordPage
                      isLanding={false}
                      isVerified={true}
                      isCreateMode={false}
                      submitHandler={() => {}}
                    />
                  }
                  rightColumnComponent={<Sales />}
                />
              )}
            />

            <Route
              path="/reset_password_first_user"
              exact
              render={() => (
                <ResetPasswordPage
                  isVerified={true}
                  isLanding={true}
                  isCreateMode={false}
                  submitHandler={() => {}}
                  isFirstUser={true}
                  poweredBy={{ name: "ngage.cc", url: "http://ngage.cc" }}
                />
              )}
            />

            <Route
              path="/reset_password_invitation_expired"
              exact
              render={() => (
                <ResetPasswordPage
                  isVerified={true}
                  isLanding={true}
                  isCreateMode={false}
                  submitHandler={() => {}}
                  isInvitationExpired={true}
                  poweredBy={{ name: "ngage.cc", url: "http://ngage.cc" }}
                />
              )}
            />

            <Route
              path="/reset_password_success"
              exact
              render={() => (
                <ResetPasswordPage
                  isVerified={true}
                  isLanding={true}
                  isCreateMode={false}
                  submitHandler={() => {}}
                  isRequestSuccessed={true}
                  poweredBy={{ name: "ngage.cc", url: "http://ngage.cc" }}
                />
              )}
            />

            <Route
              path="/reset_password_forced"
              exact
              render={() => (
                <ResetPasswordPage
                  isVerified={true}
                  isCreateMode={false}
                  isResetForced={true}
                  submitUrl=""
                />
              )}
            />

            <Route
              path="/login_announcements"
              exact
              render={props => (
                <TwoColumnPage
                  leftColumnComponent={<LoginPage isLanding={false} />}
                  rightColumnComponent={<ScrollPanel />}
                />
              )}
            />

            <Route
              path="/login_advertisement"
              exact
              render={props => (
                <TwoColumnPage
                  leftColumnComponent={<LoginPage isLanding={false} />}
                  rightColumnComponent={<Sales />}
                />
              )}
            />

            <Route
              path="/forgot_password_announcements"
              exact
              render={props => (
                <TwoColumnPage
                  leftColumnComponent={
                    <ForgotPasswordPage isLanding={false} submitHandler={() => {}} />
                  }
                  rightColumnComponent={<ScrollPanel />}
                />
              )}
            />

            <Route
              path="/forgot_password_advertisement"
              exact
              render={props => (
                <TwoColumnPage
                  leftColumnComponent={
                    <ForgotPasswordPage isLanding={false} submitHandler={() => {}} />
                  }
                  rightColumnComponent={<Sales />}
                />
              )}
            />
          </Switch>
        </Router>
      </CssBaseline>
    );
  }
}

export default Main;
