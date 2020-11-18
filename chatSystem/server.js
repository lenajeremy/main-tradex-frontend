const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const axios = require("./axios");

app.get("/", (req, res) => {
  res.json({ name: "jeremiah", value: "some really cool value" });
});

io.on("connection", socket => {
  socket.on('message', async data => {
    const stuff = await axios.get('/posts/all?start=0&end=5')
    console.log(stuff.data)
  })
});

server.listen(process.env.PORT || 4000, () =>
  console.log("the server is running on port 4000")
);
