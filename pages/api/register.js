// need this "Middleman" route so we can use a server side http only cookie

import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      //set cookie

      res.setHeader(
        "Set-Cookie",
        cookie.serialize(
          "token", //name of cookie
          data.jwt, //whats in cookie
          {
            httpOnly: true, //making it httpOnly
            secure: process.env.NODE_ENV !== "production", //whether its https or just http
            maxAge: 60 * 60 * 24 * 7, //will last for one week
            sameSite: "strict",
            path: "/", //makes it accessable everywhere around the site
          }
        )
      );
      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
