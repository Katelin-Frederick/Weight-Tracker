// Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Local Imports
import TextFieldGroup from '../common/TextFieldGroup'

class BMI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weight: '',
      bmi: '',
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

  onSubmit = (e, state) => {
    e.preventDefault()

    this.setState({
      ...state,
      errors: {}
    })

    if(this.state.weight === '') {
      this.setState({
        ...state,
        errors: {
          weight: 'Weight field is required'
        }
      })
      
      return
    }

    const { feet, inches } = this.props.profile.profile
    let height = (feet * 12) + inches
    let bmi = (this.state.weight / (height * height)) * 703
    
    this.setState({
      ...state,
      bmi: bmi.toFixed(2)
    })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="bmi">
        <h2 className="display-5">BMI Calculator</h2>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Enter a Weight"
            name="weight"
            value={this.state.weight}
            type="number"
            min="1"
            info='Add a new weight'
            onChange={this.onChange}
            error={errors.weight}
          />

          <p className="lead">BMI: {this.state.bmi}</p>

          <input type="submit" value="Calculate BMI" className="btn btn-block mt-4 goldenBtn" />
        </form>
      </div>
    )
  }
}

BMI.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(BMI)