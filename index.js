require("dotenv").config();
const server = require("./server");
const port = process.env.PORT || 6000;
/* const ora = require("ora");
const loader = ora(); */

server.listen(port, () => console.log(`Server running on port ${port}...`));
