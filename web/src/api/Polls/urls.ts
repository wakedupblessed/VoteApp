const BASE_URL = "http://avtobus403.pythonanywhere.com";

const POLLS_PREVIEW = `${BASE_URL}/polls/get_preview`;
const POLLS_ALLOWED_PREVIEW = `${BASE_URL}/polls/available`;
const USER_POLLS = `${BASE_URL}/polls/user`;
const GET_POLL = `${BASE_URL}/polls`;
const CREATE_POLL = `${BASE_URL}/polls/create`;
const VOTE = `${BASE_URL}/polls/vote`;
const DELETE_POLL = `${BASE_URL}/polls/delete`;
const USERS = `${BASE_URL}/auth`;
const VOTE_STATISTIC = `${BASE_URL}/polls/get_vote_statistic`;

export {
  POLLS_PREVIEW,
  GET_POLL,
  CREATE_POLL,
  VOTE,
  POLLS_ALLOWED_PREVIEW,
  USERS,
  VOTE_STATISTIC,
  USER_POLLS,
  DELETE_POLL,
};
