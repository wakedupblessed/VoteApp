const BASE_URL = "http://127.0.0.1:8000";

const POLLS_PREVIEW = `${BASE_URL}/polls/get_preview`;
const POLLS_ALLOWED_PREVIEW = `${BASE_URL}/polls/available`;
const GET_POLL = `${BASE_URL}/polls`;
const CREATE_POLL = `${BASE_URL}/polls/create`;
const VOTE = `${BASE_URL}/polls/vote`;

export { POLLS_PREVIEW, GET_POLL, CREATE_POLL, VOTE, POLLS_ALLOWED_PREVIEW };
