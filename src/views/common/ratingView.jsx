/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import grayTick from '../../assets/images/icons/graytick.png'
import greenTick from '../../assets/images/icons/greentick.png'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'


const RatingView = ({ totalCount, count,attemptsDate }) => {
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState(Number(totalCount))
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  const [attempt, setAttempt] = useState(Number(count))
  const [pending, setPending] = useState(0)

  useEffect(() => {
    if (total >= attempt) {
      setPending(total - attempt)
    }
  }, [totalCount, count])

  const success = () => {
   // console.log(attemptsDate)
    return (
      // @ts-ignore
      [...Array(attempt)].map((elementInArray, index) => (
        
        <>
        <img src={greenTick} data-tip={attemptsDate[index][index+1]} alt="" width="25" height="25" key={index} />
        <ReactTooltip place="top" type="success" effect="float"/>
        </>

      ))
    )
  }

  const noResult = () => {
    return (
      // @ts-ignore
      [...Array(pending)].map((elementInArray, index) => (
        <img src={grayTick} alt="" width="25" height="25" key={index} />
      ))
    )
  }

  return (
    <>
      <div>
        {success()}

        {noResult()}
      </div>
    </>
  )
}

RatingView.propTypes = {
  totalCount: PropTypes.number,
  count: PropTypes.number,
  attemptsDate:PropTypes.any
}

export default RatingView
