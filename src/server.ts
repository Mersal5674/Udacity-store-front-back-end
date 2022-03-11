import express, { Application, Request, Response, response } from "express";
import bodyParser, { json } from "body-parser";
import { newUserRoute } from "./routes/user";
import { productRoute } from "./routes/product";
import { orderRoutes } from "./routes/order";

// adding express so we can use it  
const app: express.Application = express();
// !!!!! don't forget to use the express.json as your server can understand the data in the req, post body
app.use(express.json())

// aading the address of the local host
const address: string = "3000"

// add server route
orderRoutes(app)
// add products route to the server
productRoute(app);
// add user routes to the server
newUserRoute(app);

// building the main endpoint 
app.get('/', (req:Request, res:Response) => {
    res.send(``)
})
// build the 

// adding the listen fun to the server
app.listen(3000, () => {
    console.log(`app is running on localhost: http://localhost:${address}`)
})

export default app