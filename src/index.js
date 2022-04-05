const express = require("express");
const axios = require("axios");
const app = express();
const port = 4000;

let handleMainRequest = (req, res) => {
  // Perform Snap API request
  axios({
    // Below is the API URL endpoint
    url: "https://app.midtrans.com/snap/v1/transactions",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from("Mid-server-nxKUEn76xP5n0gtmyR-hJ6jW").toString("base64")
      // Above is API server key for the Midtrans account, encoded to base64
    },
    data:
      // Below is the HTTP request body in JSON
      {
        transaction_details: {
          order_id: "tmplt-" + getCurrentTimestamp(),
          gross_amount: 75000
        },
        credit_card: {
          secure: true
        },
        item_details: {
            id: "blogger",
            price: 75000,
            quantity: 1,
            name: "LISENSI TEMPLATE BLOGGER"
        }
    }
  }).then(
    (snapResponse) => {
      let snapToken = snapResponse.data.token;
      console.log("Retrieved snap token:", snapToken);
      // Pass the Snap Token to frontend, render the HTML page
      res.send(getMainHtmlPage(snapToken, handleMainRequest));
    },
    (error) => {
      res.send(`Fail to call API w/ error ${error}`);
      console.log(error);
    }
  );
};

/**
 *  Setup Express App
 */

app.get("/", handleMainRequest);
app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

/**
 * Helper Functions Below
 */

let getMainHtmlPage = (snapToken, handleMainRequest) => {
  return `
<html>
    <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Payment Point</title>
<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
<link href='' rel='stylesheet'>
<style>@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);body{margin:0;padding:0;font-family:'Open Sans',serif;background:#fff}.product{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;max-width:350px;height:600px;box-shadow:0 20px 40px rgba(0,0,0,.2);border-radius:5px;background:#f2f2f2;overflow:hidden}.product .imgbox{height:100%;box-sizing:border-box}.product .imgbox img{display:block;width:100%}.specifies{position:absolute;width:100%;bottom:-63px;left:0px;background:#fff;box-shadow: 0px -2px 18px 5px rgb(0 0 0 / 20%);padding:10px;box-sizing:border-box;transition:.5s;border-top-left-radius:20px;border-top-right-radius:20px}.product:hover .specifies{bottom:0}.specifies h2{margin:0;padding:0;font-size:20px;width:100%}.specifies h2 span{font-size:15px;color:#ccc;font-weight:400}.specifies .price{margin-bottom: 16px;font-weight:700;color:#000;font-size:20px}label{display:block;margin-top:15px;font-weight:700;font-size:15px}ul{display:flex;margin:0;padding:0}ul li{list-style:none;margin:5px 5px 0;font-size:15px;font-style:normal;color:#212529c7}ul li:first-child{margin-left:0}ul.colors li{width:15px;height:15px}ul.colors li:nth-child(1){background:#4a148c}ul.colors li:nth-child(2){background:#f50057}ul.colors li:nth-child(3){background:#536dfe}ul.colors li:nth-child(4){background:#388e3c}ul.colors li:nth-child(5){background:#ff6d00}.btn{display:block;padding:5px;color:#fff;font-size:13px;border-radius:3px}@media screen and (max-width: 800px){.product {position: relative;width: 100%;max-width: 100%;height: 100%;background: #f2f2f2;overflow: hidden;border-radius:0px;}}</style>
<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
<script type='text/javascript'></script>
</head>
<body oncontextmenu='return false' class='snippet-body'>
    <ion-app class="product">
        <ion-card class="imgbox">
 <img src="https://1.bp.blogspot.com/-2OEIsO7TXYg/Xs-jXDT5MqI/AAAAAAAACBE/OEz5FGTusdc_6gYiY3bL1W91us4wacUugCNcBGAsYHQ/w1200-h630-p-k-no-nu/lisensi-template-blogger.jpg">
<ion-card-header>
<ion-card-title>Lisensi Template</ion-card-title>
         <ion-card-subtitle>Blogger</ion-card-subtitle>
</ion-card-header>
<ion-card-content>
        <ul>
            <li>All Template</li>
        </ul>
         <label>Keunggulan Template</label>
		 1. SEO Friendly.<br/>
		 2. Loading Cepat.<br/>
		 3. Tampilan Responsive (Mobile Friendly).<br/>
		 4. WhatsApp Chat.<br/>
		 5. *Fitur Keranjang Toko.<br/>
		 6. Cross Browser Support.
</ion-card-content>
    <ion-footer class="ion-no-border specifies">
<ion-toolbar>
<div class="up"><span class="iconify" data-icon="ic:baseline-keyboard-arrow-up" data-inline="false" data-width="35px" data-height="35px" data-rotate="180deg" data-flip="vertical"></span></div>
        <div class="price">Rp. 75.000</div>
              <ion-button id="pay-button" shape="round" fill="outline" color="primary" expand="full">Beli</ion-button>
<input type="text" id="snap-token" value="${snapToken}" class="form-input" style="display:none;">
</ion-toolbar>
    </ion-footer>
        </ion-card> 
</ion-app>
    <div id="snapjs">
      <!-- import the snap.js provided by Midtrans -->
      <script type="text/javascript" src="https://app.midtrans.com/snap/snap.js"
        data-client-key="Mid-client-8Ttb7R_tAhDjoj9-"></script>
<script src="https://cdn.jsdelivr.net/gh/daffadevhosting/js/wa/chat-v1.js"></script>
      <script type="text/javascript">
        var payButton = document.getElementById('pay-button');
        payButton.addEventListener('click', function() {
          var snapToken = document.getElementById('snap-token').value;
          snap.pay(snapToken);
        });
      </script>
    <script>
      document.getElementById('snapjs-view').innerText
        = document.getElementById('snaphtml').innerHTML
        +document.getElementById('snapjs').innerHTML;
    </script>
    </body>
</html>
`;
};

let getCurrentTimestamp = () => {
  return "" + Math.round(new Date().getTime() / 1000);
};
