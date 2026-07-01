const app = require('./src/app.js');
const connectToDB = require("./src/config/db.config.js");

connectToDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});