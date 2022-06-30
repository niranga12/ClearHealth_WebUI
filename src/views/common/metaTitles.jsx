import React from 'react'

import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const MetaTitles = ({ title, keyword, description }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* <meta name="keyword" content={keyword} /> */}
      </Helmet>
    </div>
  )
}

MetaTitles.propTypes = {
  title: PropTypes.string,
  keyword: PropTypes.string
}
export default MetaTitles
