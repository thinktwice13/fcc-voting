import axios from "axios"
import { FETCH_USER, SUBMIT_POLL, FETCH_POLLS } from "./types"

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/user")
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const submitPoll = (values, history) => async dispatch => {
  const res = await axios.post("/api/polls", values)
  history.push("/polls")
  dispatch({
    type: SUBMIT_POLL,
    payload: res.data
  })
}

export const fetchPolls = () => async dispatch => {
  const res = await axios.get("/api/polls")
  dispatch({
    type: FETCH_POLLS,
    payload: res.data
  })
}
