/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { EnhancementPercentage, PackageItems, ServiceType } from 'src/reusable/enum'
import { getHospitalsList } from 'src/service/hospitalsService'
import { useDispatch, useSelector } from 'react-redux'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { notify } from 'reapop'
import { getServiceProviders, getSpecialityList } from 'src/service/providerService'

const schema = yup.object().shape({
  filterTool: yup.object().shape({
    serviceType: yup.string(),
    provider: yup.string(),
    // hospitalSearch: yup.string(),
    enhancementRate: yup.string().required()
    // enhancementOn:yup.string().required()
  })
})

const resetTool = {
  filterTool: {
    serviceType: '',
    // hospitalSearch: "",
    enhancementRate: '',
    enhancementOn: '',
    clPrice: '',
    provider: ''
  }
}

const PricingToolFilter = ({ fieldsList = [], isNotGlobal, handleFilterChange, saveChange, selectedPackage }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,

    formState
    // formState: {errors},
  } = useForm({ resolver: yupResolver(schema), mode: 'all' })

  const { isValid } = formState

  // eslint-disable-next-line no-unused-vars
  const [serviceList, setServiceList] = useState([])
  // const [hospitalList, setHospitalList] = useState([]);
  const [providerList, setProviderList] = useState([])
  const [stateChange, setstateChange] = useState(false)
  const [selectedOption, setSelectedOption] = useState()
  const [selectedPackageId, setSelectedPackageId] = useState(selectedPackage)
  const [hospitalId, setHospitalId] = useState(null)
  const [hospitalName, setHospitalName] = useState(null)

  // const [hospitalId, setHospitalId] = useState(null);
  const location = useLocation()

  const dispatch = useDispatch()

  const price = useSelector((state) => state.Pricing)

  useEffect(() => {
    // for reset
    let serviceType = price.filterDetail?.serviceType ? price.filterDetail.serviceType : ''
    resetTool.filterTool.serviceType = serviceType
    reset(resetTool)

    const params = new URLSearchParams(location.search)
    const hId = params.get('id')
    const hName = params.get('name')
    setHospitalId(hId)
    setHospitalName(hName)

    const fetchData = async () => {
      try {
        dispatch(loaderShow())
        // let result = await getHospitalsList({});
        const specialityList = await getSpecialityList()

        setServiceList(specialityList.data.data)
        // let hospitals = result.data.data;

        // if (id) {
        // 	let data = hospitals.filter(x => x.partyRoleId == id);
        // 	setHospitalList(data);

        // 	setValue("filterTool.hospitalSearch", Number(id))
        // } else {
        // 	setHospitalList(hospitals);
        // }
        setstateChange(!stateChange)
        dispatch(loaderHide())
      } catch (error) {}
    }
    fetchData()
    setSelectedPackageId(selectedPackage)

    // console.log(selectedPackage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackage, location])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search)
        const hospitalId = params.get('id')
        const formValue = getValues('filterTool')

        // filterTool.serviceType

        if (PackageItems.Facility !== selectedPackageId) {
          let result = await getServiceProviders(hospitalId, formValue.serviceType)
          //let result = await getServiceProviders(1335,1);

          setProviderList(result.data.data)
        }
        // if (selectedOption != undefined && PackageItems.Facility !== selectedPackageId )   {
        // 	let result = await getServiceProviders(hospitalId, selectedOption);
        // 	//let result = await getServiceProviders(1335,1);
        // 	setProviderList(result.data.data);

        // }

        // let hospitalName = formValue.hospitalSearch ? hospitalList.find(x => x.partyRoleId == formValue.hospitalSearch).name : "";
        let serviceTypeName = formValue.serviceType
          ? serviceList.find((x) => x.ID == formValue.serviceType).speciality
          : ''
        let formDetails = { ...formValue, hospitalName, serviceTypeName }

        handleFilterChange(formDetails)
      } catch (error) {}
    }
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateChange])

  const clearOptimizedPrice = () => {
    return (
      <>
        <div className="col-md-3">
          <div className="form-group">
            <label className="form-text font-lato-bold oneline-th  "> Clear Optimized Price </label>
            <input
              type="radio"
              className="mt-2"
              name="group1"
              value="Auto"
              {...register('filterTool.clPrice')}
              onClick={() => setstateChange(!stateChange)}
            />{' '}
            <span className="p-2"> Auto</span>
            <input
              type="radio"
              className="mt-2"
              name="group1"
              value="custom"
              {...register('filterTool.clPrice')}
              onClick={() => setstateChange(!stateChange)}
            />{' '}
            <span className="p-2 "> Custom</span>
          </div>
        </div>
      </>
    )
  }

  const pricingFormSubmit = ({ filterTool }) => {
    if (isNotGlobal) {
      if (filterTool.enhancementOn && filterTool.enhancementRate) {
        saveChange(filterTool)
      } else {
        dispatch(notify(`Please Select collection Enhancement On`, 'error'))
      }
    } else {
      saveChange(filterTool)
    }
  }

  const EnhancementPercentageInput = () => {
    return (
      <input
        type="number"
        className="form-control-sm"
        {...register('filterTool.enhancementRate')}
        onBlur={() => setstateChange(!stateChange)}
      />
    )
  }

  const specialtyChange = () => {
    setstateChange(!stateChange)
    setProviderList([])
  }

  const EnhancementPercentageSelect = () => {
    return (
      <select
        name="collectionEnhancement"
        id="collectionEnhancement"
        className="form-control-sm"
        {...register('filterTool.enhancementRate')}
        onClick={() => setstateChange(!stateChange)}
      >
        <option value=""> Select</option>

        {EnhancementPercentage.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    )
  }

  const CollectionEnhancementOn = () => {
    return (
      <div className="col-md-2">
        <div className="form-group">
          <label className="form-text font-lato-bold oneline-th "> Collection Enhancement On </label>
          <select
            name="enhancementOn"
            id="enhancementOn"
            className="form-control-sm"
            {...register('filterTool.enhancementOn')}
            onClick={() => setstateChange(!stateChange)}
          >
            <option value="">Select</option>
            {fieldsList.map((item, index) => (
              <option key={index} value={item.id}>
                {item.text}
              </option>
            ))}
          </select>

          {/* <input type='text' className='form-control-sm' {...register('enhancementOn')} /> */}
        </div>
      </div>
    )
  }

  const Providers = () => {
    return (
      <div className="col-md-2">
        <div className="form-group">
          <label className="form-text font-lato-bold ">Provider</label>
          <select
            name="provider"
            id="provider"
            className="form-control-sm"
            {...register('filterTool.provider')}
            onClick={() => setstateChange(!stateChange)}
          >
            <option value=""> Select</option>

            {providerList &&
              providerList.map((item, index) => (
                <option key={index} value={item.partyRoleId}>
                  {item.firstName} {item.lastName}
                </option>
              ))}
          </select>
        </div>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(pricingFormSubmit)}>
        <div className="row divider p-2">
          <div className="col-md-2">
            <div className="form-group">
              <label className="form-text font-lato-bold ">Specialty</label>
              <select
                name="serviceType"
                id="serviceType"
                className="form-control-sm"
                {...register('filterTool.serviceType')}
                onClick={() => specialtyChange()}
              >
                {/* <select name='serviceType' id='serviceType' className='form-control-sm' {...register('filterTool.serviceType')} onClick={() => setstateChange(!stateChange)} onChange={e => setSelectedOption(e.target.value)}> */}
                <option value=""> Select</option>
                {serviceList.map((item, index) => (
                  <option key={index} value={item.ID}>
                    {item.speciality}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* export const PackageItems = { */}
          {PackageItems.Facility == selectedPackageId ? '' : Providers()}

          {/* <div className='col-md-2'>
						<div className='form-group'>
							<label className='form-text font-lato-bold oneline-th'>{isNotGlobal ? 'Collection Enhancement' : 'Clear Transactional Fee'}  </label>
							{isNotGlobal ? EnhancementPercentageInput() : EnhancementPercentageSelect()}
						</div>
					</div> */}

          <div className="col-md-2">
            <div className="form-group">
              {isNotGlobal && <label className="form-text font-lato-bold oneline-th"> Collection Enhancement </label>}

              {isNotGlobal && EnhancementPercentageInput()}
            </div>
          </div>

          {isNotGlobal && CollectionEnhancementOn()}

          {isNotGlobal && clearOptimizedPrice()}

          <div className="col-md-1 pt-2">
            {isNotGlobal && (
              <button className="btn btn-primary mt-4" disabled={!isValid}>
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

PricingToolFilter.propTypes = {
  fieldsList: PropTypes.any,
  isNotGlobal: PropTypes.bool,
  handleFilterChange: PropTypes.func,
  saveChange: PropTypes.func,
  selectedPackage: PropTypes.any
}

export default PricingToolFilter
