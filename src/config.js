// Central place for environment-dependent URLs.
// Defaults point to your Azure backend; for local dev it falls back to localhost.

export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "https://scalable-tiktok-backend-fkh5dudzg0d7bxgw.canadacentral-01.azurewebsites.net/api";

export const MEDIA_BASE =
  process.env.REACT_APP_MEDIA_BASE ||
  "https://scalable-tiktok-backend-fkh5dudzg0d7bxgw.canadacentral-01.azurewebsites.net";
