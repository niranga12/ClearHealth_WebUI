import React from 'react'
import PricingToolCategories from './PricingToolCategories'
import PricingToolFilter from './PricingToolFilter'
import PricingToolTable from './PricingToolTable'

const PricingToolGrid = () => {
    return (
        <>
        {/* <div className="card  cover-content  p-2"> */}
           <PricingToolFilter/>
           <PricingToolCategories/>
           <PricingToolTable/>
        {/* </div> */}
        </>
    )
}

export default PricingToolGrid
