// Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Local Imports
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      gender: '',
      birthday: '',
      height: {},
      password: '',
      password2: '',
      errors: {}
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender,
      birthday: this.state.birthday,
      feet: this.state.feet,
      inches: this.state.inches,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    const options = [
      { label: 'Select Gender', value: 0 },
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ]

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Weight Tracker Account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <SelectListGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
                  info="Enter your gender"
                />

                <TextFieldGroup
                  name="birthday"
                  value={this.state.birthday}
                  type="date"
                  info='Your date of birth'
                  onChange={this.onChange}
                  error={errors.birthday}
                />

                <TextFieldGroup
                  placeholder="Feet"
                  name="feet"
                  value={this.state.feet}
                  type="number"
                  min="1"
                  max="7"
                  onChange={this.onChange}
                  error={errors.feet}
                />

                <TextFieldGroup
                  placeholder="Inches"
                  name="inches"
                  value={this.state.inches}
                  type="number"
                  min="0"
                  max="11"
                  onChange={this.onChange}
                  error={errors.inches}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <input 
                  type="submit" 
                  className="btn btn-info btn-block mt-4" 
                  id="registerSubmit" 
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))