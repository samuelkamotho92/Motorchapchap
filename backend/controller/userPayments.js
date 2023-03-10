const stripe = require('stripe')(process.env.STRIPE_KEY);
const axios = require('axios');
console.log(stripe);
exports.userPayments = async(req,resp)=>{
    console.log(req.body);
try
{
stripe.charges.create({
    source:req.body.tokenId,
    amount:req.body.amount,
    currency:'usd'
},(stripeErr,stripeRes)=>{
    if(stripeErr){
        resp.status(500).json({
            status:'fail',
            stripeErr  })
    }else{
        resp.status(200).json({
            status:'success',
            stripeRes
        })
    }
})
}catch(err)
{
resp.status(404).json({
status:'failure',
message:'no payment made'
})
}}


exports.createToken = async(req,res,next)=>{
    const secret = process.env.MPESA_SECRET;
    const consumer = process.env.MPESA_CONSUMER;
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth =  new Buffer.from(`${consumer}:${secret}`).toString("base64");

  await axios.get(url,{
    headers:{
        Authorization: `Basic ${auth}`
    }
  }).then((data)=>{
    token = data.data.access_token;
    console.log(token);
    next();
  })
  .catch((err)=>{
    console.log(err);
      res.status(400).json(err.message);
  })

}

exports.mpesaPayments = async(req,res)=>{
    const phone = req.body.phonenumber.substring(1);
    const amount = req.body.amount;
    console.log(phone,amount);
    const shortCode = process.env.MPESA_SHORTCODE
    const passkey = process.env.MPESA_PASSKEY
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const password = new Buffer.from(shortCode + passkey + timestamp).toString(
      "base64"
    );
    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: 174379,
        PhoneNumber: `254${phone}`,
        CallBackURL: "https://mydomain.com/path",
        AccountReference: "Mpesa Test",
        TransactionDesc: "Testing stk push",
      };

    await axios.post(url,data,{
        headers: {
            authorization: `Bearer ${token}`,
          },
    }).then((data)=>{
        console.log(data);
        res.status(200).json(data.data)
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err.message);
    })
}
