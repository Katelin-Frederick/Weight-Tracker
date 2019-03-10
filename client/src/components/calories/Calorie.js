// Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'

// Local Imports
import { deleteCalories } from '../../actions/profileActions'
import Chart from '../common/Chart'

class Calorie extends Component {
  getData = () => {
    let calorieData = []
    let dateData = []

    this.props.profile.profile.calories.sort((a, b) => {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
    }).map(item => {
      calorieData.push(item.calorie)
      dateData.push(moment(item.date).add(1, 'days', 6, 'hours').format("MM/DD/YYYY"))

      return (calorieData, dateData)
    })

    return {
      labels: dateData,
      datasets: [
        {
          label: 'Calories',
          data: calorieData,
          backgroundColor:[
            'rgba(230, 138, 0, 0.6)'
          ]
        }
      ]
    }
  }

  onDeleteClick(id) {
    this.props.deleteCalories(id)
  }

  render() {
    const calories = this.props.profile.profile.calories.sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0})
      .map(calorie => (
      <tr key={calorie._id}>
        <td>
          {calorie.calorie}
        </td>
        <td>
          <Moment format="MM/DD/YYYY">{moment(calorie.date).add(1, 'days', 6, 'hours')}</Moment>
        </td>
        <td>
        <button 
            onClick={this.onDeleteClick.bind(this, calorie._id)} 
            className="btn btn-danger">Delete
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4 className="mb-4">Calories</h4>
        <table className="table mb-5">
          <thead>
            <tr>
              <th>Calories</th>
              <th>Date</th>
            </tr>
            {calories}
          </thead>
        </table>
        <Chart data={this.getData()} />
      </div>
    )
  }
}

Calorie.propTypes = {
  deleteCalories: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { deleteCalories })(Calorie)