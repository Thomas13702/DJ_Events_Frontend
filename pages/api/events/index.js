const { events } = require("./data.json");

export default (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(events);
  } //if get request sent, then do this
  else {
    res.setHeader("Allow", ["GET"]);
    //sets array of methods that are allowed, here only GET allowed
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
