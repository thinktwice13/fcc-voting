import React from "react"
import { FILTER_OPTIONS, SORT_OPTIONS } from "../utils/constants"

export default ({
  currentFilter,
  onFilterClick,
  currentDirection,
  onSortClick
}) => {
  return (
    <div>
      <div>
        {Object.values(FILTER_OPTIONS).map(filter => {
          const active = filter === currentFilter
          return (
            <button
              key={filter}
              className={"waves-effect btn-flat" + (active ? " disabled" : "")}
              onClick={onFilterClick.bind(null, filter)}
            >
              {filter}
            </button>
          )
        })}
      </div>
      <div>
        <a
          className="dropdown-button btn-flat"
          href="#"
          data-activates="sortDropdown"
        >
          {currentDirection}
        </a>

        <ul id="sortDropdown" className="dropdown-content">
          {Object.values(SORT_OPTIONS).map(direction => {
            if (direction !== currentDirection) {
              return (
                <li key={direction}>
                  <a href="#!" onClick={onSortClick.bind(null, direction)}>
                    {direction}
                  </a>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}
