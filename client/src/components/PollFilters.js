import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { FILTER_OPTIONS } from "../utils/constants"

const PollFilters = props => {
  return (
    <div>
      <div>
        {Object.values(FILTER_OPTIONS).map(filter => (
          <button
            key={filter}
            className="btn-flat"
            onClick={props.setFilter.bind(null, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div>sort and search</div>
    </div>
  )
}

const mapStateToProps = ({ visibility }) => {
  return { visibility }
}

export default connect(mapStateToProps, actions)(PollFilters)
