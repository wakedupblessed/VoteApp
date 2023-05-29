const BASE_URL = "http://avtobus403.pythonanywhere.com";

const REGISTER_URL = `${BASE_URL}/auth/register`;
const TOKEN_URL = `${BASE_URL}/auth/token`;
const REFRESH_URL = `${BASE_URL}/auth/token/refresh`;

export { TOKEN_URL, REFRESH_URL, REGISTER_URL };
