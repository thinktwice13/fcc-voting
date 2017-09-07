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

export const getVisibleList = (userId, pollList, { filter, sort, search }) => {
  const { MY_POLLS, MY_VOTES } = FILTER_OPTIONS
  const { NEWEST, OLDEST, MOST_VOTED, CLOSEST_VOTE } = SORT_OPTIONS
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

export const validateUrl = url => {
  const re = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/

  return re.test(url)
}
