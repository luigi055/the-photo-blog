const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.listen(PORT, (req, res) => {
  console.log(`The server is up on port ${PORT}`);
});