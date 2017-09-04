import { FILTER_OPTIONS, SORT_OPTIONS } from "./constants"

export const getFilteredSortedList = (
  userId,
  pollList,
  { filter, sort, search }
) => {
  const { MY_POLLS, MY_VOTES } = FILTER_OPTIONS
  const { NEWEST, OLDEST, MOST_VOTED } = SORT_OPTIONS
  let list = pollList.slice()

  //TODO fuzzy search filter

  //filter list by filter buttons clicked
  switch (filter) {
    case MY_POLLS:
      list = list.filter(poll => poll.owner === userId)
      break
    case MY_VOTES:
      list = list.filter(
        poll => !!poll.options.find(option => option.voters.includes(userId))
      )
      break
    default:
      break
  }
  //sort filtered list
  switch (sort) {
    case NEWEST:
      ///FIXME
      list.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      break
    case OLDEST:
      list.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    // case MOST_VOTED:
    //FIXME create total votes property on each poll (mongo virtuals???)
    default:
      break
  }

  return list
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
