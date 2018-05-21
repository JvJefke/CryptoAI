const app = require("express")();
const config = require("../config");

require("./routes")(app);

app.listen(config.server.port, () => {
	console.log(`Server listening on port ${config.server.port}`)
});

