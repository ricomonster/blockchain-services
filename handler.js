'use strict';

// library
const Blockchain = require('./library/blockchain');

/**
 * Lambda Function Handlers.
 */
const Handlers = {
  generate: async (event) => {
    console.log('e', event);
    // stores the blockchain instance
    let blockchain;

    try {
      blockchain = Blockchain.load(
        event.blockchain || '',
        process.env.BLOCKCHAIN_NETWORK || ''
      );
    } catch (e) {
      // error
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: e.message
        })
      }
    }

    // create wallet
    const wallet = await blockchain.generate();

    return {
      statusCode: 200,
      body: JSON.stringify({ wallet })
    }
  },

  getBalance: async (event) => {

  },

  signTransaction: async (event) => {

  }
};

module.exports = Handlers;

// module.exports.hello = async (event) => {
//   const eth = new Ethereum();
//   const wallet = await eth.generate();

//   console.log('wal', wallet);

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       wallet
//     }),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

// module.exports.generate = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'create wallet'
//     })
//   }
// };


// module.exports.signTransaction = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'sign transaction'
//     })
//   }
// };
