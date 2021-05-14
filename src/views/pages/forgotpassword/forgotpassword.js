
import React from 'react';
import { useForm } from 'react-hook-form';
import SingleLayout from '../singlelayout/singleLayout';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string().required(),
});

export default function ForgotPassword() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const restFormSubmit = (data) => {
        console.log(data);
    }

    return (
        <SingleLayout>
            <form onSubmit={handleSubmit(restFormSubmit)}>
                <input
                    type="text"

                    {...register("username")}
                    className="form-control mb-2 mt-3 form-shadow"
                    placeholder="Email"
                    autoComplete="new-off"
                />
                <div className="small text-danger  ">{errors.username?.message}</div>
                <button className="btn btn-primary col-md-12 mt-1">Send</button>
            </form>
        </SingleLayout>
    )
}


