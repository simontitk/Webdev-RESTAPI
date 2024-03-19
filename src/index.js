import express from "express";
import { usersRouter } from "./usersRouter.js";
import { cartsRouter } from "./cartsRouter.js";
import { ordersRouter } from "./ordersRouter.js";
import { productsRouter } from "./productsRouter.js";

const app = express();
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);


app.listen(8080);