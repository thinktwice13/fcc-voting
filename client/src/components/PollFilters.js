import React from "react"
import { FILTER_OPTIONS, SORT_OPTIONS } from "../utils/constants"
import Button from "react-md/lib/Buttons/Button"
import SelectField from "react-md/lib/SelectFields"
import { connect } from "react-redux"
import * as actions from "../actions"
import TextField from "react-md/lib/TextFields"

let PollFilters = ({ filter, sort, search, setFilter, setSort, setSearch }) => {
  // return (
  //   <div>
  //     <div>
  //       {Object.values(FILTER_OPTIONS).map(filter => {
  //         const active = filter === currentFilter
  //         return (
  //           <button
  //             key={filter}
  //             className={"waves-effect btn-flat" + (active ? " disabled" : "")}
  //             onClick={onFilterClick.bind(null, filter)}
  //           >
  //             {filter}
  //           </button>
  //         )
  //       })}
  //     </div>
  //     <div>
  //       <a
  //         className="dropdown-button btn-flat"
  //         href="#"
  //         data-activates="sortDropdown"
  //       >
  //         {currentDirection}
  //       </a>

  //       <ul id="sortDropdown" className="dropdown-content">
  //         {Object.values(SORT_OPTIONS).map(direction => {
  //           if (direction !== currentDirection) {
  //             return (
  //               <li key={direction}>
  //                 <a href="#!" onClick={onSortClick.bind(null, direction)}>
  //                   {direction}
  //                 </a>
  //               </li>
  //             )
  //           }
  //         })}
  //       </ul>
  //     </div>
  //   </div>
  // )

  return (
    <div className="flex-row">
      <div>
        {Object.values(FILTER_OPTIONS).map(label => (
          <Button
            key={label}
            flat
            label={label}
            disabled={label === filter}
            onClick={setFilter.bind(null, label)}
          />
        ))}
      </div>
      <div>
        <div>
          <SelectField
            id="selectSortDirection"
            placeholder="SORT"
            menuItems={Object.values(SORT_OPTIONS)}
            itemLabel="abbreviation"
            itemValue="abbreviation"
            position={SelectField.Positions.BELOW}
            className="md-cell"
            onChange={setSort}
          />
        </div>
        <div>
          <TextField
            id="searchPolls"
            placeholder="Search Polls"
            className="md-cell md-cell--right"
            onChange={setSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default connect(null, actions)(PollFilters)
