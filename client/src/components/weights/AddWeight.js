// Module Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment'

// Local Imports
import TextFieldGroup from '../common/TextFieldGroup'
import { addWeight } from '../../actions/profileActions'

class AddWeight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weight: '',
      date: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const newWeight = {
      weight: this.state.weight,
      date: this.state.date
    }

    this.props.addWeight(newWeight, this.props.history)
  }
  
  render() {
    const { errors } = this.state

    return (
      <div className="add-weight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Weight</h1>
              <p className="lead text-center">
                Add a new weight
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Weight"
                  name="weight"
                  value={this.state.weight}
                  info='Add a new weight'
                  onChange={this.onChange}
                  error={errors.weight}
                />

                <TextFieldGroup
                  name="date"
                  value={this.state.date}
                  type="date"
                  info='Date the weight was taken on'
                  onChange={this.onChange}
                  error={errors.date}
                />

                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddWeight.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addWeight: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addWeight })(withRouter(AddWeight))