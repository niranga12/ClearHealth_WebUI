import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { forgotUserValidate } from "src/service/userService";
import * as yup from "yup";
import SingleLayout from "../singlelayout/singleLayout";
import onError from "src/_helpers/onerror";
import { useDispatch } from "react-redux";


const schema = yup.object().shape({
  password: yup.string().required(),
  retypePassword: yup.string().required(),
});

const ResetPassword = () => {
let { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 const [userName,setUsername] =useState("");
 const disPatch = useDispatch();


useEffect(() => {
    forgotUserValidate(id).then(
        res=>{
            setUsername(res.data.data)
        }
    ).catch((error) => onError(error, disPatch));;
    
}, [])
  

  const resetPass = (data) => {
    console.log(data);
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
