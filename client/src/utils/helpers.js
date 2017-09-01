import { FILTER_OPTIONS } from "./constants"

export const getFilteredList = (userId, list, { filter, search }) => {
  const { MY_POLLS, MY_VOTES } = FILTER_OPTIONS
  const filteredList = list.slice()

  //TOD fuzzy search filter
  switch (filter) {
    case MY_POLLS:
      return filteredList.filter(poll => poll.owner === userId)
    case MY_VOTES:
      return filteredList.filter(
        poll => !!poll.options.find(option => option.voters.includes(userId))
      )
    default:
      return list
  }
}

export const getNewVote = ({ options }, { userId, optionId }) => {
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
