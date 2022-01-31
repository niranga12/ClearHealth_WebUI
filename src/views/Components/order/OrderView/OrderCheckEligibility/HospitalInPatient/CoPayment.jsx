import React from 'react'

const CoPayment = ({value}) => {

  const inNetworkTableData = value.inNetwork.map(function(obj) {
    return <tr>
       <td>InNetwork</td>
       <td>{obj.payerNotes}</td>
       <td>{obj.amount}</td>
       <td>{obj.level}</td>
       <td>{obj.units}</td>
      <td>{obj.authorizationRequired}</td>
      <td>{obj.amountTimePeriod}</td>
      
     
     
      </tr>
   });


   const noNetworkTableData = value.noNetwork.map(function(obj) {
    return <tr>
       <td>noNetwork</td>
       <td>{obj.payerNotes}</td>
       <td>{obj.amount}</td>
       <td>{obj.level}</td>
       <td>{obj.units}</td>
      <td>{obj.authorizationRequired}</td>
      <td>{obj.amountTimePeriod}</td>
      
     
     
      </tr>
   });

   const outOfNetworkTableData = value.outOfNetwork.map(function(obj) {
    return <tr>
       <td>outOfNetwork</td>
       <td>{obj.payerNotes}</td>
       <td>{obj.amount}</td>
       <td>{obj.level}</td>
       <td>{obj.units}</td>
      <td>{obj.authorizationRequired}</td>
      <td>{obj.amountTimePeriod}</td>
      
     
     
      </tr>
   });

   const notApplicableNetworkTableData = value.notApplicableNetwork.map(function(obj) {
    return <tr>
       <td>notApplicableNetwork</td>
       <td>{obj.payerNotes}</td>
       <td>{obj.amount}</td>
       <td>{obj.level}</td>
       <td>{obj.units}</td>
      <td>{obj.authorizationRequired}</td>
      <td>{obj.amountTimePeriod}</td>
      
     
     
      </tr>
   });
  
    return (
        <div>
            <table className="table">
  <thead>
    <tr>
    <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">Amount</th>
      <th scope="col">Level</th>
      <th scope="col">Unit</th>
      <th scope="col">Auth Required</th>
      <th scope="col">Amount Time peroid</th>
    </tr>
  </thead>
  <tbody>
   {inNetworkTableData}
   {noNetworkTableData}
   {outOfNetworkTableData}
   {notApplicableNetworkTableData}
  </tbody>
</table>
        </div>
    )
}

export default CoPayment
