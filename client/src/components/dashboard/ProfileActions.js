import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/add-weight" className="btn btn-light">
        <i className="fab fa-block-plus text-info mr-1"></i>
        Add Weight
      </Link>
    </div>
  )
}

export default ProfileActions