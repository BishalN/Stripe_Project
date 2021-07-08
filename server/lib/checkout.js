"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const _1 = require(".");
async function createCheckoutSession(lineItems) {
    const url = process.env.WEB_APP_URL;
    const session = await _1.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/failed`,
        line_items: lineItems,
    });
    return session;
}
exports.createCheckoutSession = createCheckoutSession;
//# sourceMappingURL=checkout.js.map