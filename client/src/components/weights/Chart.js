import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

class Chart extends Component {
  render() {
    return (
      <div className="chart">
        <Line
          data={ this.props.data }
          height={300}
          width={600}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}

export default Chart