// will send cookie to strapi endpoint which will send the user back

import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    //Destroy Cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(
        "token", //name of cookie
        "", //whats in cookie => sets cookie to nothing
        {
          httpOnly: true, //making it httpOnly
          secure: process.env.NODE_ENV !== "production", //whether its https or just http
          expires: new Date(0), //expires at 0 -> already happened so it expires
          sameSite: "strict",
          path: "/", //makes it accessable everywhere around the site
        }
      )
    );

    res.status(200).json({ message: "Success" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
