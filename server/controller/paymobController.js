const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
const PAYMOB_API_URL = "https://accept.paymob.com/api"; 
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;

async function getAuthToken() {
    const res = await fetch(`${PAYMOB_API_URL}/auth/tokens`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: PAYMOB_API_KEY })
    });
    const data = await res.json();
    return data.token;
}

async function createOrder(authToken, amount) {
    const res = await fetch(`${PAYMOB_API_URL}/ecommerce/orders`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
            auth_token: authToken,
            delivery_needed: false,
            amount_cents: amount * 100,
            currency: "EGP",
            items: []
        })
    });
    const data = await res.json();
    return data.id;
}

async function createPaymentKey(authToken, orderId, amount) {
    const res = await fetch(`${PAYMOB_API_URL}/acceptance/payment_keys`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
            auth_token: authToken,
            amount_cents: amount * 100,
            expiration: 3600, 
            order_id: orderId,
            billing_data: {
                first_name: "customer",
                last_name: "user",
                phone_number: "01000000000",  
                email: "test@example.com",      
                country: "EG",                  
                city: "NA",
                street: "NA",
                building: "NA",
                floor: "NA",
                apartment: "NA"
            },
            currency: "EGP",
            integration_id: PAYMOB_INTEGRATION_ID 
        })
    });

    const data = await res.json();
    return data.token;  
}

export async function createPayment(req, res) {  
    try {
        const { amount } = req.body;

        if(!amount){
            return res.status(404).json({
                message: "Must add amount"
            });
        }

        const authToken = await getAuthToken();
        const orderId = await createOrder(authToken, amount);
        const paymentKey = await createPaymentKey(authToken, orderId, amount);

        const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
        
        return res.status(200).json({ url: iframeUrl });
    } catch (error) {
        res.status(500).json({ error: "Payment initiation failed" });
    }
}