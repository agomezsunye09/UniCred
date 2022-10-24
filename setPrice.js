require("dotenv").config();
const ethers = require('ethers');
const axios = require("axios");

let meanPrice = 0;

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/ef788e3273ca47ea9a479ee7939a6eb1');
// const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/ef788e3273ca47ea9a479ee7939a6eb1');

const wallet = new ethers.Wallet(process.env.PRIVATEKEY);

const signer = wallet.connect(provider);

const abi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const contractWithSigner = new ethers.Contract(
      '0x88801f831A6ff459197217B12702c3902DEC68fF',
      abi,
      signer
    );

const getExchangeRate = async () => {
  let totalPrice = 0;
  try {
    const response = await axios.get(
      "https://v6.exchangerate-api.com/v6/d140d5fe05629acc77bdde32/latest/USD?fbclid=IwAR3QaSCcmlxynTNTudq9nB1Qur0TNQ3RDvc1eVdnMCkFWMCwDlw6nMpZ6sE"
    );
    const rates = [
      {
        USD: response.data.conversion_rates.USD,
        EUR: {
          title: "USD-EUR",
          rate: response.data.conversion_rates.EUR,
        },
        GBP: {
          title: "USD-GBP",
          rate: response.data.conversion_rates.GBP,
        },
        JPY: {
          title: "USD-JPY",
          rate: response.data.conversion_rates.JPY,
        },
        AUD: {
          title: "USD-AUD",
          rate: response.data.conversion_rates.AUD,
        },
        CAD: {
          title: "USD-CAD",
          rate: response.data.conversion_rates.CAD,
        },
        CHF: {
          title: "USD-CHF",
          rate: response.data.conversion_rates.CHF,
        },
        CNY: {
          title: "USD-CNY",
          rate: response.data.conversion_rates.CNY,
        },
        SGD: {
          title: "USD-SGD",
          rate: response.data.conversion_rates.SGD,
        },
        SAR: {
          title: "USD-SAR",
          rate: response.data.conversion_rates.SAR,
        },
        PLN: {
          title: "USD-PLN",
          rate: response.data.conversion_rates.PLN,
        },
        QAR: {
          title: "USD-QAR",
          rate: response.data.conversion_rates.QAR,
        },
        KWD: {
          title: "USD-KWD",
          rate: response.data.conversion_rates.KWD,
        },
        BHD: {
          title: "USD-BHD",
          rate: response.data.conversion_rates.BHD,
        },
        AED: {
          title: "USD-DHS",
          rate: response.data.conversion_rates.AED,
        },
        BND: {
          title: "USD-BND",
          rate: response.data.conversion_rates.BND,
        },
      },
    ];

    totalPrice = response.data.conversion_rates.USD
      + response.data.conversion_rates.EUR
      + response.data.conversion_rates.GBP
      + response.data.conversion_rates.JPY
      + response.data.conversion_rates.AUD
      + response.data.conversion_rates.CAD
      + response.data.conversion_rates.CHF
      + response.data.conversion_rates.CNY
      + response.data.conversion_rates.SGD
      + response.data.conversion_rates.SAR
      + response.data.conversion_rates.PLN
      + response.data.conversion_rates.QAR
      + response.data.conversion_rates.KWD
      + response.data.conversion_rates.BHD
      + response.data.conversion_rates.AED
      + response.data.conversion_rates.BND

    meanPrice = Math.floor(totalPrice * 1000000 / 15);

    return rates;

  } catch (error) {
    throw new Error(`Unable to get exchange rate.`);
  }
};

// async function writePrice(){
//   console.log("write", meanPrice);
//   const gas = ethers.utils.parseUnits('1500', 'gwei');
//   const price = meanPrice;

//   const tx = await new Promise( (resolve, reject) => {
//     const priceSet =  contractWithSigner.setPrice(
//       price,
//       {
//         'gasPrice': gas.toString(),
//         'gasLimit': (5000000).toString()
//       }).catch((err) => {
//         console.log(err);
//         console.log('transaction failed...')
//       });

//     resolve(priceSet);
//   });
// }

async function writePrice(){
  console.log("write", meanPrice);
  const gas = ethers.utils.parseUnits('1500', 'gwei');
  const price = meanPrice;

  // const signer = provider.getSigner(contractWithSigner)

  const tx = await contractWithSigner.setPrice(
    price,
    {
      gasLimit: (500000).toString()
    })

  /*const tx = await new Promise( (resolve, reject) => {
    const priceSet =  contractWithSigner.setPrice(
      price,
      {
        'gasPrice': gas.toString(),
        'gasLimit': (500000).toString()
      }).catch((err) => {
        console.log(err);
        console.log('transaction failed...')
      });

    resolve(priceSet);
  });*/
  console.log("write complete");
}

async function dailyWrite() { 
  
  while(1) {
    var date = new Date();
    // console.log(date.getHours(), "hour", date.getMinutes(), "minute", date.getSeconds());
    if(date.getHours() === 17 && date.getMinutes() === 11 && date.getSeconds() === 0) {
      await writePrice();
      
    }
  }
}


async function main(){
  await getExchangeRate();
  dailyWrite();
  // await writePrice();
}


main();