import axios from "axios"
import { FETCH_USER, SUBMIT_POLL } from "./types"

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/user")
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const submitPoll = poll => async dispatch => {
  const res = await axios.post("/api/polls", poll)
  dispatch({
    type: SUBMIT_POLL,
    payload: res.data
  })
}
