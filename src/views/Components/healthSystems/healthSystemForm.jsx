import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { PartyTypeEnum, ValidationPatterns } from "src/reusable/enum";
import { addHealthSystemNew } from "src/service/healthsystemService";
import OnError from "src/_helpers/onerror";
import { notify } from "reapop";
import { useHistory } from "react-router-dom";
// import history from "src/_helpers/history";

const schema = yup.object().shape({
  name: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(ValidationPatterns.phoneRegExp, "Phone number is not valid"),
  shippingAddress1: yup.string().required(),
  shippingAddress2: yup.string(),
  shippingCity: yup.string().required(),
  shippingState: yup.string().required(),
  shippingZip: yup.string().required(),
  contactName: yup.string().required(),
  contactPhone: yup
    .string()
    .required()
    .matches(ValidationPatterns.phoneRegExp, "Phone number is not valid"),
  contactEmail: yup.string().required().email(),
});
const HealthSystemForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  let history = useHistory();

 
  const handleShippingChecked = (event) => {
    if (event.target.checked) {
      setValue("shippingAddress1", getValues("address1"));
      setValue("shippingAddress2", getValues("address1"));
      setValue("shippingCity", getValues("city"));
      setValue("shippingState", getValues("state"));
      setValue("shippingZip", getValues("zip"));
    } else {
      setValue("shippingAddress1", "");
      setValue("shippingAddress2", "");
      setValue("shippingCity", "");
      setValue("shippingState", "");
      setValue("shippingZip", "");
    }
  };

  const addHealthSystem = async (data) => {
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

    try {
      if (newHealthSystem) {
        const result = await addHealthSystemNew(newHealthSystem);
        if ((result.data.message = "OK")) {
          dispatch(notify(`Successfully added`, "success"));
          history.push("/healthsystem");
        }
      }
    } catch (error) {
      OnError(error, dispatch);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(addHealthSystem)}>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-text">
                Name <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                className="form-control-sm"
                type="text"
                {...register("name")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.name?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* address */}
          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">Address </h5>
            <div className="form-group">
              <label className="form-text">
                Address Line 1{" "}
                <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("address1")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.address1?.message}
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">Address Line 2 </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("address2")}
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-text">
                  City <span className="text-danger font-weight-bold ">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("city")}
                />
                <div className="small text-danger  pb-2   ">
                  {errors.city?.message}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-text">
                  State <span className="text-danger font-weight-bold ">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("state")}
                />
                <div className="small text-danger  pb-2   ">
                  {errors.state?.message}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">
                Zip <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("zip")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.zip?.message}
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">
                Phone <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("phone")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.phone?.message}
              </div>
            </div>
          </div>

          {/* shipping address  */}
          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">
              {" "}
              <span className="pr-5">Shipping Address </span>{" "}
              <input
                type="checkbox"
                className="form-check-input"
                onChange={handleShippingChecked}
              />{" "}
              <span className="small">Same As Address</span>{" "}
            </h5>
            <div className="form-group">
              <label className="form-text">
                Address Line 1{" "}
                <span className="text-danger font-weight-bold ">*</span>{" "}
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("shippingAddress1")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.shippingAddress1?.message}
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">Address Line 2 </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("shippingAddress2")}
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-text">
                  City <span className="text-danger font-weight-bold ">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("shippingCity")}
                />
                <div className="small text-danger  pb-2   ">
                  {errors.shippingCity?.message}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-text">
                  State <span className="text-danger font-weight-bold ">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register("shippingState")}
                />
                <div className="small text-danger  pb-2   ">
                  {errors.shippingState?.message}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">
                Zip <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("shippingZip")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.shippingZip?.message}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">Patient Access Contact </h5>

            <div className="form-group">
              <label className="form-text">
                Name <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("contactName")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.contactName?.message}
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">
                Phone <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("contactPhone")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.contactPhone?.message}
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">
                Email <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register("contactEmail")}
              />
              <div className="small text-danger  pb-2   ">
                {errors.contactEmail?.message}
              </div>
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
