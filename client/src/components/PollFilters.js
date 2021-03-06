import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import Button from "react-md/lib/Buttons/Button"
import SelectField from "react-md/lib/SelectFields"
import TextField from "react-md/lib/TextFields"
import { FILTER_OPTIONS, SORT_OPTIONS } from "../utils/constants"

const FilterBtns = ({ filter, onFilter }) => (
  <div className="flex-nowrap">
    {Object.values(FILTER_OPTIONS).map(label => {
      const active = filter === label
      const icon = label === FILTER_OPTIONS.SHOW_ALL
      return (
        <Button
          key={label}
          onClick={() => onFilter(label)}
          label={!icon && label}
          icon={icon}
          raised={!icon}
          primary={!icon && label === FILTER_OPTIONS.VOTE}
          disabled={!icon && active}
        >
          {icon && "clear_all"}
        </Button>
      )
    })}
  </div>
)

const SortBtn = ({ sort, onSort }) => (
  <SelectField
    stripActiveItem
    id="selectSortDirection"
    value={sort}
    menuItems={Object.values(SORT_OPTIONS)}
    position={SelectField.Positions.BELOW}
    className="md-cell"
    onChange={onSort}
  />
)

const SearchInput = ({ onSearch, value }) => (
  <TextField
    id="searchPolls"
    placeholder="Search Polls"
    className="md-cell md-cell--right"
    onChange={onSearch}
    value={value}
  />
)

// Show sort button and search input to all users, but show filter buttons only to authenticated users
const PollFilters = props => {
  return (
    <div className="flex-wrap sticky-filters">
      {props.auth && (
        <FilterBtns filter={props.filter} onFilter={props.setFilter} />
      )}
      <div className="flex-nowrap">
        <SortBtn sort={props.sort} onSort={props.setSort} />
        <SearchInput onSearch={props.setSearch} value={props.search} />
      </div>
    </div>
  )
}

const mapStateToProps = ({
  user: { auth },
  visibility: { filter, sort, search }
}) => ({
  auth,
  filter,
  sort,
  search
})

export default connect(mapStateToProps, actions)(PollFilters)
