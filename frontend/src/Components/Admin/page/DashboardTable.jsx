import React from 'react'
import TableHead from '../../shared/TableHead'
import TableData from '../../shared/TableData'

const DashboardTable = ({data}) => {
  if(!data?.data) return 
  return (
    <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <TableHead />
    </thead>
    <tbody>
      {data && data.data.map((item,index)=>(
        <TableData key={item._id} item={item} index={index} />
      ))}
    </tbody>
    <tfoot>
      <TableHead />
    </tfoot>
  </table>
</div>
  )
}

export default DashboardTable
