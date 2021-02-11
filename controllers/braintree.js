const braintree = require('braintree');


//connection to braintree
 const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
  });


  //to get token
exports.getToken = (req,res) =>{
    gateway.clientToken.generate({},function(err, response){
        // pass clientToken to your front-end
        if(err){
         res.status(500).json({error:'error in token creation'});
        }else 
         res.json(response.clientToken);
      });
}


//to process payment by checking nonce
exports.makeBraintreePayment = (req,res) =>{
    const nonceFromTheClient = req.body.payment_method_nonce; //send by frontend
    const {amount} = req.body;
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              return res.status(500).json({
                  error:'error in the processing payment'
              })
          }
         res.status(200).json(result);
      });
    }
