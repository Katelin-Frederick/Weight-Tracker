import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div className="btn-group" id="profileActions" role="group">
      <Link to="/add-weight" className="btn btn-light mr-4">
        Add Weight
      </Link>
      <Link to="/add-calories" className="btn btn-light">
        Add calories
      </Link>
    </div>
  )
}

export default ProfileActions