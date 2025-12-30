import React from 'react'

const TableData = ({item,index}) => {
  return (
    <tr key={item._id}>
        <th>{index+1}</th>
        <td>{item.email}</td>
        <td>{item.fullName}</td>
        <td>{item.role}</td>
        <td>{item.status}</td>
        <td>action</td>
    </tr>
  )
}

export default TableData
