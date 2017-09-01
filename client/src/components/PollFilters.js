import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { FILTER_OPTIONS } from "../utils/constants"

const PollFilters = ({ setFilter }) => {
  return (
    <div>
      <div>
        {Object.values(FILTER_OPTIONS).map(filter => (
          <button
            key={filter}
            className="btn-flat"
            onClick={setFilter.bind(null, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div>sort and search</div>
    </div>
  )
}

export default connect(null, actions)(PollFilters)
