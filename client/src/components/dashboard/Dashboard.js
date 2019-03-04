// Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Local Imports
import { deleteAccount, getCurrentProfile } from '../../actions/authActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Weight from '../weights/Weight'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  onDeleteClick = e => {
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if(profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if(profile.weights.length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.name}
            </p>
            <ProfileActions />
            <Weight weights={profile.weights} />
            <button onClick={this.onDeleteClick} className="btn btn-danger mt-5">Delete My Account</button>
          </div>
        )
      } else {
        dashboardContent = (
          // User is Logged In But Has No Weights
        <div>
          <p className="lead text-muted">Wlcome {user.name}</p>
          <p>You have not yet added any weights.  Please add some to get started</p>
          <Link to="/add-weight" className="btn btn-lg btn-info">Add Weights</Link>
        </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)