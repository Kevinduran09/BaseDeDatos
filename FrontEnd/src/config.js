export const TOKEN =
  localStorage.getItem("authState")?.state?.token ||
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsImlzc0VtcGxlYWRvIjoiMiIsInRpcG8iOiJlbXBsZWFkbyIsImNhcmdvIjoiYWRtaW5pc3RyYWRvciIsImV4cCI6MTcyNzIyMzM3OX0.CxBIfS3JwkUK2YGcyi-5venmVXBcHFUKLZe2zVFq00A";
export const URLBASE = import.meta.env.VITE_api_url || "localhost:8000";
