const { events } = require("./data.json");

export default (req, res) => {
  const evt = events.filter((ev) => ev.slug === req.query.slug); //give array of signle event with the slug

  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
