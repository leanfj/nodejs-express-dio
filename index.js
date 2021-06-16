const express = require("express");

const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.urlencoded({ extended: false }));

const port = 3000;

userRoute(app);

app.get("/", (request, response) => response.send("Hello World!!"));

app.listen(port, () => console.log(`Api rodando na porta ${port}`));
