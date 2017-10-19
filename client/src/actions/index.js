import axios from "axios"
import { reset } from "redux-form"
import {
  LOADING,
  SUCCESS,
  FETCH_USER,
  SUBMIT_POLL,
  FETCH_POLLS,
  FETCH_DETAILS,
  DELETE_POLL,
  SET_FILTER,
  SET_SORT,
  SET_SEARCH,
  RESET_ME,
  SET_VOTE,
  SUBMIT_OPTION,
  RESET_POLL_FORM,
  REMOVE_OPTION
} from "./types"

//TODO handle errors

export const fetchUser = () => async dispatch => {
  dispatch({ type: LOADING })
  dispatch({
    type: FETCH_USER,
    payload: (await axios.get("/api/user")).data
  })
}

export const submitPoll = (values, history) => async dispatch => {
  dispatch({ type: LOADING })
  dispatch(reset("newPollForm"))
  dispatch({
    type: SUBMIT_POLL,
    payload: (await axios.post("/api/polls", values)).data
  })
  //reset polls list view to avoid seeing 'no polls' error before fetching
  dispatch({ type: RESET_ME })
  history.push("/polls")
}

export const submitOption = (pollId, label) => async dispatch => {
  dispatch({ type: LOADING })
  dispatch({
    type: SUBMIT_OPTION,
    payload: (await axios.put("/api/polls/" + pollId, { label })).data
  })
  dispatch(reset("newOptionForm"))
}

export const removeOption = optionId => async dispatch => {
  dispatch({
    type: REMOVE_OPTION,
    payload: optionId
  })

  dispatch({ type: LOADING })
  const res = await axios.put("/api/options/" + optionId)
  !res.error ? dispatch({ type: SUCCESS }) : null
}

export const fetchPolls = () => async dispatch => {
  dispatch({ type: LOADING })
  dispatch({
    type: FETCH_POLLS,
    payload: (await axios.get("/api/polls")).data
  })
}

export const deletePoll = pollId => async dispatch => {
  dispatch({
    type: DELETE_POLL,
    payload: pollId
  })

  dispatch({ type: LOADING })
  const res = await axios.delete("/api/polls/" + pollId)
  !res.error ? dispatch({ type: SUCCESS }) : null
}

export const fetchDetails = pollId => async dispatch => {
  dispatch({ type: LOADING })
  dispatch({
    type: FETCH_DETAILS,
    payload: (await axios.get("/api/polls/view/" + pollId)).data
  })
}

export const setVote = (optionId, userId) => async dispatch => {
  dispatch({
    type: SET_VOTE,
    payload: { userId, optionId }
  })

  dispatch({ type: LOADING })
  const res = await axios.put("/api/vote/" + optionId)
  !res.error ? dispatch({ type: SUCCESS }) : null
}

//UI actions

export const resetDetails = () => dispatch => {
  dispatch({ type: RESET_ME })
}

export const resetPollForm = () => dispatch => {
  dispatch({ type: RESET_POLL_FORM })
  dispatch(reset("newPollForm"))
}

export const setFilter = filter => dispatch => {
  dispatch({
    type: SET_FILTER,
    payload: filter
  })
}

export const setSort = direction => dispatch => {
  dispatch({
    type: SET_SORT,
    payload: direction
  })
}

export const setSearch = phrase => dispatch => {
  dispatch({
    type: SET_SEARCH,
    payload: phrase
  })
}
