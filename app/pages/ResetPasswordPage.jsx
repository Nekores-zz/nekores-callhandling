/**
 * Created by Andrzej on 02.02.2018.
 * updated by A. Prates, jun-2019
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import ResetPasswordLayout from "components/LayoutElements/ResetPasswordLayout";
import ResetPassword from "../components/Login/ResetPassword/ResetPassword";
import ResetPasswordFailed from "../components/Login/ResetPassword/ResetPasswordFailed";
import PreLoadComponent from "../components/Login/ResetPassword/PreLoadComponent";
import ResetPasswordInit from "../components/Login/ResetPassword/ResetPasswordInit";
import { poweredBy, links } from "utils/links";
import { passwordPolicy } from "config/accountsMockData.js";
import EmailVerifySuccess from "../components/Login/ResetPassword/EmailVerifySuccess";

class ResetPasswordPage extends Component {
  static propTypes = {
    isLanding: PropTypes.bool,
    isVerified: PropTypes.bool.isRequired,
    isCreateMode: PropTypes.bool,
    welcomeMessage: PropTypes.string,
    passwordPolicy: PropTypes.object.isRequired,

    poweredBy: PropTypes.objectOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
  };

  static defaultProps = {
    poweredBy,
    links,
    accountName: "NHS",
    passwordPolicy
  };

  handleResetPassword = content => {
    console.log(content);
    return new Promise((resolve, reject) => {
      // If you want to test the errors, please uncomment `reject`
      resolve({});
      // reject({
      //     formErrors: {
      //       name: "name.required",
      //     },
      //     apiErrors: {
      //       accountId: "invalid",
      //     },
      // })
    });
  };

  handleResetPasswordInit = content => {
    console.log(content);
    return new Promise((resolve, reject) => {
      // If you want to test the errors, please uncomment `reject`
      /*resolve({});*/
      reject({
        formErrors: {
          // name: "name.required",
          required: { key: "required" }
        },
        generalErrors: [
          { key: "ensureMinChars" },
          { key: "ensureUppercase" },
          { key: "ensureNumbers" },
          { key: "ensureMaxChars" }
        ]
      });
    });
  };

  handleRequestInvitation = content => {
    console.log(content);
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  render = () => {
    const {
      isLanding,
      isVerified,
      isCreateMode,
      welcomeMessage,
      poweredBy,
      links,
      accountName,
      passwordPolicy,

      isFirstUser,
      isInvitationExpired,
      isRequestSuccessed,
      isResetForced
    } = this.props;

    return (
      <ResetPasswordLayout isLanding={isLanding} accountName={accountName}>
        {!isFirstUser && !isInvitationExpired && !isRequestSuccessed && (
          <ResetPassword
            isVerified={isVerified}
            isResetForced={isResetForced}
            isCreateMode={isCreateMode}
            welcomeMessage={welcomeMessage}
            submitHandler={!isResetForced && this.handleResetPassword}
            submitUrl={isResetForced && ""}
            poweredBy={poweredBy}
            links={links}
            // If you want to test the policy of reset password page, please add `policy={{name: 'required'}}` as props
            policy={passwordPolicy}
          />
        )}
        {isFirstUser && (
          <ResetPasswordInit
            isVerified={isVerified}
            isWelcomeBlock={true}
            submitHandler={this.handleResetPasswordInit}
            poweredBy={poweredBy}
            links={links}
            // If you want to test the policy of reset password page, please add `policy={{name: 'required'}}` as props
            policy={passwordPolicy}
          />
        )}
        {isInvitationExpired && (
          <ResetPasswordFailed
            submitHandler={this.handleRequestInvitation}
            poweredBy={poweredBy}
            links={links}
          />
        )}
        {isRequestSuccessed && 
        <PreLoadComponent poweredBy={poweredBy} links={links} />
        // <EmailVerifySuccess poweredBy={poweredBy} links={links} email="newmail1@sharklasers.com" />
        }
      </ResetPasswordLayout>
    );
  };
}

export default ResetPasswordPage;
