"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const dotenv_1 = require("dotenv");
const stripe_1 = __importDefault(require("stripe"));
const api_1 = require("./api");
if (process.env.NODE_ENV !== "Production")
    dotenv_1.config();
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
});
const PORT = process.env.PORT || 4000;
api_1.app.listen(PORT, () => {
    console.log(`API is available on port ${PORT}`);
});
//# sourceMappingURL=index.js.map