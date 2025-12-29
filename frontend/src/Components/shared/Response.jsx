import React, { useEffect } from 'react'

const Response = ({status, message, clearResponse}) => {
    useEffect(()=>{
        const timer = setTimeout(() => {
            clearResponse("")
        }, 5000);
        return ()=>timer
    },[message])
  return (
    <div role="alert"className={ " mt-2 p-2 alert " + (status? "alert-success" : " alert-warning")} >
  <span>{message}</span>
</div>
  )
}

export default Response
