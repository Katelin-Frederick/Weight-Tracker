// Module Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'

// Local Imports
import { deleteWeight } from '../../actions/profileActions'
import Chart from './Chart'

class Weight extends Component {
  getData = () => {
    let weightData = []
    let dateData = []

    this.props.profile.profile.weights.sort((a, b) => {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
    }).map(item => {
      weightData.push(item.weight)
      dateData.push(moment(item.date).add(1, 'days', 6, 'hours').format("MM/DD/YYYY"))

      return (weightData, dateData)
    })

    return {
      labels: dateData,
      datasets: [
        {
          label: 'Weights',
          data: weightData,
          backgroundColor:[
            'rgba(0, 38, 153, 0.6)'
          ]
        }
      ]
    }
  }

  onDeleteClick(id) {
    this.props.deleteWeight(id)
  }

  render() {
    const weights = this.props.profile.profile.weights.sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0})
      .map(weight => (
      <tr key={weight._id}>
        <td>
          {weight.weight}
        </td>
        <td>
          <Moment format="MM/DD/YYYY">{moment(weight.date).add(1, 'days', 6, 'hours')}</Moment>
        </td>
        <td>
        <button 
            onClick={this.onDeleteClick.bind(this, weight._id)} 
            className="btn btn-danger">Delete
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4 className="mb-4">Weights</h4>
        <table className="table mb-5">
          <thead>
            <tr>
              <th>Weight</th>
              <th>Date</th>
            </tr>
            {weights}
          </thead>
        </table>
        <Chart data={this.getData()} />
      </div>
    )
  }
}

Weight.propTypes = {
  deleteWeight: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { deleteWeight })(Weight)