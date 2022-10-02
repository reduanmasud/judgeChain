import React, { Component } from "react";

import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "./styles/login.module.css";
import "antd/dist/antd.css";
import { Redirect, withRouter } from "react-router-dom";
class Home extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values.CaseNumber);
        this.loginUser(values.CaseNumber).then(r => {
          console.log(r);
          this.props.history.push("/home", {
            user: r,
            caseId: values.CaseNumber
          });
        });
      }
    });
  };

  async loginUser(caseId) {
    const { account, court } = this.props.passableItems;
    var owner, judge, lawyer1, lawyer2;
    await court.methods.owner().call((err, res) => {
      owner = res;
    });

    await court.methods.getCaseAddresses(caseId).call((e, r) => {
      if (!e) {
        judge = r.judge;
        lawyer1 = r.lawyer1;
        lawyer2 = r.lawyer2;
      } else {
        console.log(e, "error");
      }
    });

    // console.log(owner, judge, lawyer1, lawyer2);

    if (account === owner) {
      // can upload & view
      console.log("this is owner");
      return 2;
    } else if (account == judge || account == lawyer1 || account == lawyer2) {
      //can view
      console.log("user can view");
      return 3;
    } else {
      console.log("user not auth");
      return 4;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>Hello</div>
    );
  }
}

//const WrappedNormal = Form.create({ name: "normal_login" })(Login);
export default Home;
