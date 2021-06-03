import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { PartyTypeEnum } from "src/reusable/enum";
import { addHealthSystemNew } from "src/service/healthsystemService";
import OnError from "src/_helpers/onerror";
import { notify } from "reapop";
import history from "src/_helpers/history";

const schema = yup.object().shape({
  name: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  phone: yup.string().required(),
  shippingAddress1: yup.string().required(),
  shippingAddress2: yup.string(),
  shippingCity: yup.string().required(),
  shippingState: yup.string().required(),
  shippingZip: yup.string().required(),
  contactName: yup.string().required(),
  contactPhone: yup.string().required(),
  contactEmail: yup.string().required(),
});
const HealthSystemForm = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
 
  const dispatch = useDispatch();

  // const addHealthSystem = (data) => {
  //      console.log(data);
  //     // disPatch(login(data));
  //     // disPatch(notify('Welcome to the documentation', 'info'))
  //   };


  


  const addHealthSystem = async(data) => {
    const newHealthSystem = {
      healthSystem: {
        name: data.name,
      },
      postalAddress: [
        {
          partyContactTypeId: PartyTypeEnum.primary,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
        },
        {
          partyContactTypeId: PartyTypeEnum.shipping,
          address1: data.shippingAddress1,
          address2: data.shippingAddress2,
          city: data.shippingCity,
          state: data.shippingState,
          zip: data.shippingZip,
        },
      ],
      telecommunicationsNumber: {
        partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
        number: data.phone,
      },
      patientAccessContact: {
        name: data.contactName,
        phone: data.contactPhone,
        email: data.contactEmail,
      },
    };

    // console.log(newHealthsystem);
    try {
      if (newHealthSystem) {
        const result = await addHealthSystemNew(newHealthSystem);
        if (result.data.message = "OK") {
          dispatch( notify(`Successfully added`, "success")) 
          history.push("/healthsystem");
        }
      }
    } catch (error) {
      OnError(error, dispatch);
    }
  }


  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(addHealthSystem)}>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-text">Name</label>
              <input
                className="form-control-sm"
                type="text"
                {...register("name")}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {/* address */}
          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">Address</h5>
            <div className="form-group">
              <label className="form-text">Address Line 1</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("address1")}
              />
            </div>

            <div className="form-group">
              <label className="form-text">Address Line 2</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("address2")}
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-text">City</label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("city")}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-text">State</label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("state")}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">Zip</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("zip")}
              />
            </div>

            <div className="form-group">
              <label className="form-text">Phone</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("phone")}
              />
            </div>
          </div>

          {/* shipping address  */}
          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">Shipping Address  <input type="checkbox"  />  </h5>
            <div className="form-group">
              <label className="form-text">Address Line 1</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("shippingAddress1")}
              />
            </div>

            <div className="form-group">
              <label className="form-text">Address Line 2</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("shippingAddress2")}
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-text">City</label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("shippingCity")}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-text">State</label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("shippingState")}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">Zip</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("shippingZip")}
              />
            </div>
          </div>

          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">Patient Access Contact</h5>

            <div className="form-group">
              <label className="form-text">Name</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("contactName")}
              />
            </div>

            <div className="form-group">
              <label className="form-text">Phone</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("contactPhone")}
              />
            </div>

            <div className="form-group">
              <label className="form-text">Email</label>
              <input
                type="text"
                className="form-control-sm"
                {...register("contactEmail")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary float-right">
              save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HealthSystemForm;
