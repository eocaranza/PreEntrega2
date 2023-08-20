import {config} from '../config/config.js'
import {ProductManager} from "../dao/managers/fileSystem/ProductManager.js";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";
import {CartManager} from "../dao/managers/fileSystem/CartManager.js";
import { CartsMongo } from "../dao/managers/mongo/cartsMongo.js";
import {connectDB} from '../config/dbConnection.js'
import { usersMongo } from './managers/mongo/usersMongo.js';

connectDB();
const productService = new ProductsMongo();
const cartService = new CartsMongo();
const userService = new usersMongo();

export {productService}
export {cartService}
export {userService};