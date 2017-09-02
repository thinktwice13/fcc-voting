import React from "react"
import { FILTER_OPTIONS } from "../utils/constants"

export default ({ onFilterClick }) => {
  return (
    <div>
      <div>
        {Object.values(FILTER_OPTIONS).map(filter => (
          <button
            key={filter}
            className="btn-flat"
            onClick={onFilterClick.bind(null, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div>sort and search</div>
    </div>
  )
}