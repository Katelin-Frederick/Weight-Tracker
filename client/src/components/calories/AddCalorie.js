// Module Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// Local Imports
import TextFieldGroup from '../common/TextFieldGroup'
import { addCalorie } from '../../actions/profileActions'

class AddCalorie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calorie: '',
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

    const newCalorie = {
      calorie: this.state.calorie,
      date: this.state.date
    }

    this.props.addCalorie(newCalorie, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="add-calorie">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Calories</h1>
              <p className="lead text-center">
                Add a new calorie intake
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Calories"
                  name="calorie"
                  value={this.state.calorie}
                  type="number"
                  min="1"
                  info='Add a new calorie intake'
                  onChange={this.onChange}
                  error={errors.calorie}
                />

                <TextFieldGroup
                  name="date"
                  value={this.state.date}
                  type="date"
                  info='Date the calories were consumed'
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

AddCalorie.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addCalorie: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { addCalorie })(withRouter(AddCalorie))