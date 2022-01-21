import React, { useEffect, useState } from 'react'

const OutofPocket = ({ value }) => {


const inNetworkTableData = value.inNetwork.map(function(obj) {
  return <tr>
     <td>InNetwork</td>
     <td>{obj.levelCode}</td>
     <td>{obj.Total}</td>
     <td>{obj.Remaining}</td>

    
   
   
    </tr>
 });


 const noNetworkTableData = value.noNetwork.map(function(obj) {
  return <tr>
     <td>noNetwork</td>
     <td>{obj.levelCode}</td>
     <td>{obj.Total}</td>
     <td>{obj.Remaining}</td>
    
   
   
    </tr>
 });

 const outOfNetworkTableData = value.outOfNetwork.map(function(obj) {
  return <tr>
     <td>outOfNetwork</td>
     <td>{obj.levelCode}</td>
     <td>{obj.Total}</td>
     <td>{obj.Remaining}</td>
    
   
   
    </tr>
 });



  return (
      <div>
          <table className="table">
<thead>
  <tr>

    <th scope="col"></th>
    <th scope="col">Level Code</th>
    <th scope="col">Total</th>
    <th scope="col">Remaining</th>
    
  </tr>
</thead>
<tbody>
 {inNetworkTableData}
 {noNetworkTableData}
 {outOfNetworkTableData}
 
</tbody>
</table>
      </div>
  )
}

export default OutofPocket
