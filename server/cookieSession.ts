import cookieSession from "cookie-session";

export const cookieSessionMiddleware = cookieSession({
  name: "session",
  secret: "YourSecretHere",
  maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks in milliseconds
  secure: false,
  httpOnly: true,
});
