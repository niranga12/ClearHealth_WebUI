/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { forgotUserValidate, resetPasswordService } from 'src/service/userService'
import * as yup from 'yup'
import SingleLayout from '../singlelayout/singleLayout'
import onError from 'src/_helpers/onerror'
import { useDispatch } from 'react-redux'
import { notify } from 'reapop'
// import history from "src/_helpers/history";
import OnError from 'src/_helpers/onerror'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import MetaTitles from 'src/views/common/metaTitles'

const schema = yup.object().shape({
  password: yup.string().required('Password is required'),
  retypePassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const ResetPassword = () => {
  let { id } = useParams()
  let history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [userName, setUsername] = useState('')
  const [isValid, setIsValid] = useState(true)
  const disPatch = useDispatch()

  useEffect(() => {
    forgotUserValidate(id)
      .then((res) => {
        setUsername(res.data.data)
        setIsValid(true)
      })
      .catch((error) => {
        onError(error, disPatch)

        setIsValid(false)
      })
  }, [])

  const resetPass = async (data) => {
    try {
      disPatch(loaderShow())

      const resetData = {
        token: id,
        username: userName,
        password: data.password
      }
      let result = await resetPasswordService(resetData)
      if ((result.data.message = 'OK')) {
        disPatch(notify(`Successfully added`, 'success'))
        history.push('/login')
      }
      disPatch(loaderHide())
    } catch (error) {
      OnError(error, disPatch)
    }
  }

  const resetForm = () => {
    return (
      <form onSubmit={handleSubmit(resetPass)}>
        <label className="mt-3 p-0 col-md-12">Email address : {userName} </label>
        <label className="mt-3">Password</label>
        <input
          type="Password"
          {...register('password')}
          className="form-control mb-2 "
          placeholder="Password"
          autoComplete="new-off"
        />
        <div className="small text-danger  ">{errors.password?.message}</div>
        <label className="mt-3">Re-Enter Password</label>
        <input
          type="password"
          {...register('retypePassword')}
          className="form-control mb-2 "
          placeholder="Re-Enter Password"
          autoComplete="new-off"
        />
        <div className="small text-danger  ">{errors.retypePassword?.message}</div>

        <button className="btn btn-primary btn-lg col-md-12 mt-1 p-3">Reset</button>
      </form>
    )
  }

  return (
    <SingleLayout>
      {/* for addeing page metas  */}
      <MetaTitles title="Clear Health | Reset Password " description=" Reset Password  " />
      <h2 className="font-lato-bold">Reset password</h2>

      {isValid ? resetForm() : <h4 className="font-lato-bold text-danger mt-3"> Invalid Request</h4>}
    </SingleLayout>
  )
}

export default ResetPassword
