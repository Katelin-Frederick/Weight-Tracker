// Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Local Imports
import { getCurrentProfile } from '../../actions/profileActions'
import { deleteAccount } from '../../actions/authActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Weight from '../weights/Weight'
import Calorie from '../calories/Calorie'
import BMI from '../bmi/BMI'
import CaloricNeeds from '../calories/CaloricNeeds'

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
      if(profile.weights.length > 0 || profile.calories.length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted mb-4">
              Welcome {user.name}
            </p>
            <ProfileActions />
            <Weight weights={profile.weights} />
            <Calorie calories={profile.calories} />
            <BMI />
            <CaloricNeeds />
            <button id="deleteAccountBtn" onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
          </div>
        )
      } else {
        dashboardContent = (
          // User is Logged In But Has No Weights
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet added any information.  Please add some to get started</p>
          <Link to="/add-weight" className="btn btn-lg mr-4 mb-4 goldenBtn">Add Weights</Link>
          <Link to="/add-calories" className="btn btn-lg mb-4 goldenBtn">Add Calories</Link>
        </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 mb-4">Dashboard</h1>
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