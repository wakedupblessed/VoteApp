const BASE_URL = "http://127.0.0.1:8000";

const REGISTER_URL = `${BASE_URL}/auth/register`;
const TOKEN_URL = `${BASE_URL}/auth/token`;
const REFRESH_URL = `${BASE_URL}/auth/token/refresh`;

export { TOKEN_URL, REFRESH_URL, REGISTER_URL };
