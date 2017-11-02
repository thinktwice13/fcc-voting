import { FILTER_OPTIONS, SORT_OPTIONS } from "./constants"
import Autocomplete from "react-md/lib/Autocompletes"

export const getTotalVotes = poll => {
  return poll.options.reduce((r, opt) => r + opt.voters.length, 0)
}

const getTopVoted = poll => {
  let top = 0
  poll.options.forEach(opt => {
    if (opt.voters.length >= top) {
      top = opt.voters.length
    }
  })
  return top
}

/**
 * Filters and sorts list of polls
 * @param {string} userId
 * @param {array} pollList - A full poll list
 * @param {object} visibility - Current state of visibility properties
 * @param {string} visibility.filter
 * @param {string} visibility.sort
 * @param {string} visibility.search
 * @returns {array} filtered and sorted list
 */
export const getVisibleList = (userId, pollList, { filter, sort, search }) => {
  const { MY_POLLS, MY_VOTES, VOTE } = FILTER_OPTIONS
  const { NEWEST, OLDEST, MOST_VOTED, CLOSEST_VOTE } = SORT_OPTIONS
  let list = pollList.slice()

  //get poll titles found by fuzzy search if search phrase is not empty string
  let titles
  if (search.length > 0) {
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
          poll.options.find(option => !!option.voters.includes(userId))
        )
      case VOTE:
        return (
          searched &&
          !poll.options.find(option => !!option.voters.includes(userId))
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
      return list.sort((a, b) => getTotalVotes(b) - getTotalVotes(a))
    case CLOSEST_VOTE:
      return list.sort((a, b) => {
        return (
          getTopVoted(a) / getTotalVotes(a) - getTopVoted(b) / getTotalVotes(b)
        )
      })
    default:
      return list
  }
}

/**
 * Update poll with a new vote
 * @param {array} polls - Ful poll list
 * @param {object} ids object
 * @param {string} ids.userId
 * @param {string} ids.optionId
 * @returns {array} updated list of polls
 */
export const getUpdatedVote = (polls, { userId, optionId }) => {
  let index = polls.findIndex(poll =>
    poll.options.find(opt => opt._id === optionId)
  )

  let options = polls[index].options.slice()
  //determine old vote index
  const oldVote = options.findIndex(opt => opt.voters.includes(userId))
  //determinte new vote index
  const newVote = options.findIndex(opt => opt._id === optionId)
  //remove old Vote if exists
  if (oldVote >= 0) {
    options[oldVote].voters = options[oldVote].voters.filter(
      voter => voter !== userId
    )
  }
  //add new vote
  options[newVote].voters.push(userId)
  return [
    ...polls.slice(0, index),
    { ...polls[index], options },
    ...polls.slice(index + 1)
  ]
}

/**
 * Remove option from poll
 * @param {array} polls - Full poll list
 * @param {string} optionId
 * @returns {array} updated list of polls
 */
export const removeOption = (polls, optionId) => {
  const updatedPollIndex = polls.findIndex(poll =>
    poll.options.find(opt => opt._id === optionId)
  )

  let updatedOptions = polls[updatedPollIndex].options.slice()
  updatedOptions.splice(
    updatedOptions.findIndex(opt => opt._id === optionId),
    1
  )
  const updatedPoll = { ...polls[updatedPollIndex], options: updatedOptions }

  return [
    ...polls.slice(0, updatedPollIndex),
    updatedPoll,
    ...polls.slice(updatedPollIndex + 1)
  ]
}

/**
 * Add new option to a poll
 * @param {array} polls - Full poll list
 * @param {object} contains pollId and option label
 * @param {string} pollId
 * @param {string} option - Option label
 * @returns {array} updated list of polls
 * 
 */
export const addOption = (polls, { pollId, option }) => {
  const updatedPollIndex = polls.findIndex(poll => poll._id === pollId)
  let updatedOptions = polls[updatedPollIndex].options.slice()
  updatedOptions.push(option)
  const updatedPoll = {
    ...polls[updatedPollIndex],
    options: updatedOptions
  }
  return [
    ...polls.slice(0, updatedPollIndex),
    updatedPoll,
    ...polls.slice(updatedPollIndex + 1)
  ]
}

/**
 * Get summary results of user's polls
 * @param {string} userId
 * @param {array} polls - Full poll list
 * @returns {object} contains myVotes, myPolls, myPollVotes
 */
export const getPollResults = (userId, polls) => {
  let myVotes = 0
  let myPolls = 0
  let myPollVotes = 0

  polls.forEach(poll => {
    if (poll.owner === userId) {
      myPolls++
      myPollVotes += poll.options.reduce((r, opt) => r + opt.voters.length, 0)
    }

    if (!!poll.options.find(opt => opt.voters.includes(userId))) {
      myVotes++
    }
  })
  return { myVotes, myPolls, myPollVotes }
}
