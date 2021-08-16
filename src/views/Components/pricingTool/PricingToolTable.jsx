import React, { useMemo } from 'react'
import DataTable from 'src/views/common/dataTable';


const ProcedureData=[
   
    {procedure:"Colonoscopy", primaryCPT:"45332", optimizedFacilityRate:"$43", OptimizedPhysicianRate:"$77", AnesthesiaRate:"$67", PathologyRate:"$90",PackagePrice:"$67"},
    {procedure:"Appendectomy", primaryCPT:"65898", optimizedFacilityRate:"$43", OptimizedPhysicianRate:"$77", AnesthesiaRate:"$67", PathologyRate:"$90",PackagePrice:"$67"}
]

const PricingToolTable = () => {

    // for table
//SETTING COLUMNS NAMES
const columns = useMemo(
    () => [
        {
            Header: 'procedure',
            accessor: 'procedure', // accessor is the "key" in the data
            Cell: ({value}) => <h5 className='font-weight-normal text-black ml-4'> {value} </h5>,
        },
        {
            Header: 'primaryCPT',
            accessor: 'primaryCPT', // accessor is the "key" in the data
           
        },
        {
            Header: 'optimizedFacilityRate',
            accessor: 'optimizedFacilityRate', // accessor is the "key" in the data
           
        },
        {
            Header: 'OptimizedPhysicianRate',
            accessor: 'OptimizedPhysicianRate', // accessor is the "key" in the data
           
        },
        {
            Header: 'AnesthesiaRate',
            accessor: 'AnesthesiaRate', // accessor is the "key" in the data
           
        },
        {
            Header: 'PathologyRate',
            accessor: 'PathologyRate', // accessor is the "key" in the data
           
        },
        {
            Header: 'PackagePrice',
            accessor: 'PackagePrice', // accessor is the "key" in the data
           
        },



       
        
    ],
    []
);

    return (
        <DataTable columns={columns} data={ProcedureData}  />
    )
}

export default PricingToolTable
