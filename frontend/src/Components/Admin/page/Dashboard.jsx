import React, { useState } from 'react'
import useAdminDataFetch from '../../hooks/useAdminDataFetch'
import { useSelector } from 'react-redux'
import DashboardTable from './DashboardTable'
import Response from '../../shared/Response'

const Dashboard = () => {
    const data = useSelector(store=>store.data);
    const [status, setStatus] = useState()
    const [message, setMessage] = useState()
    const setFunction = (status, message)=>{
      setMessage(message)
      setStatus(status)
    }
    useAdminDataFetch(setFunction)
  return (
    <div>
      <div>
        <Response status={status} message={message} clearResponse={setMessage}></Response>
      </div>
        <DashboardTable data={data} />
    </div>
  )
}

export default Dashboard
