import React from 'react'
import {useParams} from 'react-router-dom'

function User() {
  const { userid } = useParams();
  return (
    <div className="text-lg font-semibold text-gray-800 text-center">User : {userid}</div>
  )
}

export default User