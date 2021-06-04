import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import {
  forgotUserValidate,
  resetPasswordService,
} from "src/service/userService";
import * as yup from "yup";
import SingleLayout from "../singlelayout/singleLayout";
import onError from "src/_helpers/onerror";
import { useDispatch } from "react-redux";
import { notify } from "reapop";
// import history from "src/_helpers/history";
import OnError from "src/_helpers/onerror";

const schema = yup.object().shape({
  password: yup.string().required(),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  let { id } = useParams();
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userName, setUsername] = useState("");
  const disPatch = useDispatch();

  useEffect(() => {
    forgotUserValidate(id)
      .then((res) => {
        setUsername(res.data.data);
      })
      .catch((error) => onError(error, disPatch));
  }, []);

  const resetPass = async (data) => {
    
    try {
      const resetData = {
        token: id,
        username: userName,
        password: data.password,
      };
      let result = await resetPasswordService(resetData);
      if ((result.data.message = "OK")) {
        disPatch(notify(`Successfully added`, "success"));
        history.push("/login");
      }
    } catch (error) {
      OnError(error, disPatch);
    }
  };

  return (
    <SingleLayout>
      <h2 className="font-lato-bold">Reset password</h2>
      <form onSubmit={handleSubmit(resetPass)}>
        {/* <div className="row"> */}
        <label className="mt-3 col-md-12">Email address : {userName} </label>
        {/* </div> */}
        <label className="mt-3">Password</label>
        <input
          type="password"
          {...register("password")}
          className="form-control mb-2 "
          placeholder="password"
          autoComplete="new-off"
        />
        <div className="small text-danger  ">{errors.password?.message}</div>
        <label className="mt-3">Re Enter Password</label>
        <input
          type="password"
          {...register("retypePassword")}
          className="form-control mb-2 "
          placeholder="Re Enter Password"
          autoComplete="new-off"
        />
        <div className="small text-danger  ">
          {errors.retypePassword?.message}
        </div>

        <button className="btn btn-primary btn-lg col-md-12 mt-1 p-3">
          Reset
        </button>
      </form>
    </SingleLayout>
  );
};

export default ResetPassword;
