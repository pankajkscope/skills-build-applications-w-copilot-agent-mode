export const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;

export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
