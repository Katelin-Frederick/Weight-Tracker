// Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Local Imports
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'

class CaloricNeeds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityLevel: '',
      weight: '',
      caloricNeeds: '',
      age: '',
      errors: {}
    }
  }

  componentDidMount(state) {
    this.setState({
      ...state,
      age: this.getAge()
    })
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

    if(this.state.activityLevel === '') {
      this.setState({
        ...state,
        errors: {
          activityLevel: 'Activity Level field is required'
        }
      })

      return
    }

    const { feet, inches } =  this.props.profile.profile
    let height = (feet * 12) + inches
    let activityValue

    switch(this.state.activityLevel) {
      case 'Little to no Exercise':
        activityValue = 1.2
        break
      case 'Light Exercise (1-3 days/week)':
        activityValue = 1.375
        break
      case 'Moderate Exercise (3-5 days/week)':
        activityValue = 1.55
        break
      case 'Heavy Exercise (6-7 days/week)':
        activityValue = 1.725
        break
      case 'Very Heavy Exercise Ttwice per day, extra heavy workouts)':
        activityValue = 1.9
        break
      default:
        activityValue = 1.2
    }
    
    switch(this.props.profile.profile.gender) {
      case 'Female': {
        let bmr = 655.1 + (4.35 * this.state.weight) + (4.7 * height) - (4.7 * this.state.age)

        let caloricNeeds = bmr * activityValue

        this.setState({
          ...state,
          caloricNeeds: caloricNeeds.toFixed()
        })
      }
      break
      case 'Male': {
        let bmr = 66.47 + (6.24 * this.state.weight) + (12.7 * height) - (6.755 * this.state.age)

        let caloricNeeds = bmr * activityValue

        this.setState({
          ...state,
          caloricNeeds
        })
      }
      break
      default:
        console.log('Invalid Gender Information')
    }
  }

  getAge = () => {
    let today = new Date()
    let birthDay = new Date(this.props.profile.profile.birthday)
    let age = today.getFullYear() - birthDay.getFullYear()
    var month = today.getMonth() - birthDay.getMonth()
    
    if(month < 0 || (month === 0 && today.getDate())) {
      age--
    }

    return age
  }

  render() {
    const { errors } = this.state

    const options = [
      { label: 'Select Activity Level', value: 0 },
      { label: 'Little to no Exercise', value: 'Little to no Exercise' },
      { label: 'Light Exercise (1-3 days/week)', value: 'Light Exercise (1-3 days/week)' },
      { label: 'Moderate Exercise (3-5 days/week)', value: 'Moderate Exercise (3-5 days/week)' },
      { label: 'Heavy Exercise (6-7 days/week)', value: 'Heavy Exercise (5-7 days/week)' },
      { label: 'Very Heavy Exercise Ttwice per day, extra heavy workouts)', value: 'Very Heavy Exercise (Twice per day, extra heavy workouts' }
    ]

    return (
      <div className="caloricNeeds">
        <h2 className="display-5">Caloric Needs Calculator</h2>
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

          <SelectListGroup
            placeholder="Activity Level"
            name="activityLevel"
            value={this.state.activityLevel}
            onChange={this.onChange}
            options={options}
            error={errors.activityLevel}
            info="How active you are"
          />

          <p className="lead">Caloric Needs: {this.state.caloricNeeds}</p>

          <input type="submit" value="Calculate Caloric Needs" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    )
  }
}

CaloricNeeds.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(CaloricNeeds)