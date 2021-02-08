const uuid = require('uuid/v4');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.makePayment = (req,res) => {
   const {products,token,amount} = req.body;
   const idempotencyKey = uuid();
   console.log(amount);
    return stripe.customers.create({
        email:token.email,
        source:token.id,
        name:token.card.name   
    }).then(customer => {
        console.log(customer);
        stripe.charges.create({
           amount : amount * 100,
           currency:'usd',
           customer:customer.id,
           receipt_email:token.email,
           shipping:{
            name:token.card.name,
               address:{
                   country:token.card.address_country
               }
           }
        },{idempotencyKey})
    }).then(result => res.status(200).json(result))
        .catch(err => console.log(err));
} 
