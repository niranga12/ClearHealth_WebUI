
import React from 'react';
import { useForm } from 'react-hook-form';
import SingleLayout from '../singlelayout/singleLayout';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { forgotPassword } from 'src/service/userService';
import { useDispatch } from 'react-redux';
import onError from "src/_helpers/onerror";
import { notify } from 'reapop';
import { useHistory } from 'react-router-dom';
// import history from "../../../_helpers/history";



const schema = yup.object().shape({
    username: yup.string().required("Email required").email("Invalid email")
});

export default function ForgotPassword() {
    let history = useHistory();

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const forgotFormSubmit = (data) => {
        forgotPassword(data).then(
            res=>{
            dispatch(notify('Please check your email.', 'success'));
            history.push("/login");
            }
        ).catch((error) => onError(error, dispatch));
    }

    return (
        <SingleLayout>
            <form onSubmit={handleSubmit(forgotFormSubmit)}>
                <input
                    type="text"

                    {...register("username")}
                    className="form-control mb-2 mt-3 form-shadow"
                    placeholder="Email"
                    autoComplete="new-off"
                />
                <div className="small text-danger  ">{errors.username?.message}</div>
                <button className="btn btn-primary  btn-lg col-md-12 mt-1">Send</button>
            </form>
        </SingleLayout>
    )
}


