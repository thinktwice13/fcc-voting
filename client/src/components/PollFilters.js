import React from "react"
import { FILTER_OPTIONS, SORT_OPTIONS } from "../utils/constants"
import Button from "react-md/lib/Buttons/Button"
import SelectField from "react-md/lib/SelectFields"
import TextField from "react-md/lib/TextFields"
import visibility from "../reducers/visibility"
import { connect } from "react-redux"
import * as actions from "../actions"

const FilterBtns = ({ filter, onFilter }) => (
  <div className="flex-nowrap">
    {Object.values(FILTER_OPTIONS).map(label => {
      const active = filter === label
      return (
        <Button
          key={label}
          label={label}
          onClick={() => onFilter(label)}
          flat={!active}
          raised={active}
          disabled={active}
        />
      )
    })}
  </div>
)

const SortBtn = ({ sort, onSort }) => (
  <SelectField
    id="selectSortDirection"
    placeholder={sort}
    // list all sort options except the current one
    menuItems={Object.values(SORT_OPTIONS).filter(val => val !== sort)}
    position={SelectField.Positions.BELOW}
    className="md-cell"
    onChange={onSort}
  />
)

const SearchInput = props => (
  <TextField
    id="searchPolls"
    placeholder="Search Polls"
    className="md-cell md-cell--right"
    onChange={props.onSearch}
  />
)

const PollFilters = props => {
  const { filter, sort, search } = props.visibility
  // show sort button and search input to all users, but show filter buttons only to authenticated users
  return (
    <div className="flex-wrap sticky-filters">
      {props.auth && <FilterBtns filter={filter} onFilter={props.setFilter} />}
      <div className="flex-nowrap">
        <SortBtn sort={sort} onSort={props.setSort} />
        <SearchInput onSearch={props.setSearch} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, visibility }) => ({
  auth: user.auth,
  visibility
})

export default connect(mapStateToProps, actions)(PollFilters)
