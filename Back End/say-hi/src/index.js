const express = require('express');
var cors = require('cors')
const path = require('path');
const userRouter = require('./routers/userRoutes');

const app = express();
app.use(cors())
const port = 3000;

// public folder to serve files
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectoryPath));
app.use(userRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
