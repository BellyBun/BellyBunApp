import cookieSession from "cookie-session";

export const cookieSessionMiddleware = cookieSession({
  name: "session",
  secret: "DD7E3B99331518BC",
  maxAge: 14 * 24 * 60 * 60 * 1000,
  secure: false,
  httpOnly: true,
});
