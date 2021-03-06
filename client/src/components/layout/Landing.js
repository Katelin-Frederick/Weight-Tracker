import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Landing extends Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center" id="landingContent">
                <h1 className="display-3 mb-4">Weight Tracker</h1>
                <p className="lead">Help keep track of your weight goals</p>
                <hr/>
                <div>
                  <Link to="/register" className="btn btn-lg mr-2 goldenBtn">Sign Up</Link>
                  <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)