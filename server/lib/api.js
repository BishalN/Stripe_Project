"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const checkout_1 = require("./checkout");
const payments_1 = require("./payments");
exports.app = express_1.default();
exports.app.use(express_1.default.json({ verify: (req, res, buffer) => (req["rawBody"] = buffer) }));
exports.app.use(cors_1.default({ origin: true }));
exports.app.post("/test", (req, res) => {
    const amount = req.body.amount;
    res.status(200).send({ withTax: amount * 7 });
});
exports.app.post("/checkouts", runAsync(async (req, res) => {
    res.send(await checkout_1.createCheckoutSession(req.body.line_items));
}));
exports.app.post("/payments", runAsync(async (req, res) => {
    res.send(await payments_1.createPaymentIntent(req.body.amount));
}));
function runAsync(callback) {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
}
//# sourceMappingURL=api.js.map