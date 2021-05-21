import cookie from "cookie";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : ""); //returns cookie from request
  //if there is a req, it will either return cookie if there if one or "" if there is no cookie or no request "" will be returned
}
