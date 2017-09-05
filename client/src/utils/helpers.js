import { FILTER_OPTIONS, SORT_OPTIONS } from "./constants"
import Autocomplete from "react-md/lib/Autocompletes"

export const getFilteredSortedList = (
  userId,
  pollList,
  { filter, sort, search }
) => {
  const { MY_POLLS, MY_VOTES } = FILTER_OPTIONS
  const { NEWEST, OLDEST, MOST_VOTED } = SORT_OPTIONS
  let list = pollList.slice()

  //get poll titles found by fuzzy search if search phrase is not empty string
  let titles
  if (search.length > 0) {
    //TODO remove all symbols frfom tested poll titiles
    //TODO include options into search
    titles = Autocomplete.fuzzyFilter(list.map(poll => poll.title), search)
  }

  list = list.filter(poll => {
    //get polls allowed by searh input if exists
    const searched = search.length > 0 ? titles.includes(poll.title) : true
    //filter list by filter buttons clicked
    switch (filter) {
      case MY_POLLS:
        return searched && poll.owner === userId
      case MY_VOTES:
        return (
          searched &&
          poll.options.find(option => option.voters.includes(userId))
        )
      default:
        return searched
    }
  })
  //sort filtered list
  switch (sort) {
    case OLDEST:
      ///FIXME
      return list.sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
      )
    case NEWEST:
      return list.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      )
      //FIXME create total votes property on each poll (mongo virtuals???)
    case MOST_VOTED:
      return list.sort(
        (a, b) =>
          b.options.reduce((r, opt) => r + opt.voters.length, 0) -
          a.options.reduce((r, opt) => r + opt.voters.length, 0)
      )
    default:
      return list
  }
}

export const getUpdatedVote = ({ options }, { userId, optionId }) => {
  //determine old vote index
  const oldVote = options.findIndex(opt => opt.voters.includes(userId))
  //determinte new vote index
  const newVote = options.findIndex(opt => opt._id === optionId)
  //copy array
  const updated = options.slice()
  //remove old Vote if exists
  if (oldVote >= 0) {
    updated[oldVote].voters = updated[oldVote].voters.filter(
      voter => voter !== userId
    )
  }
  //add new vote
  updated[newVote].voters.push(userId)
  return updated
}
