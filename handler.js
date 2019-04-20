'use strict';

// library
const Blockchain = require('./library/blockchain');

/**
 * Lambda Function Handlers.
 */
const Handlers = {
  generate: async (event) => {
    // stores the blockchain instance
    let blockchain;

    // perform some simple validation
    if (!event.pathParameters || !event.pathParameters.blockchain) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid request.'
        })
      }
    }

    // let's try to load the blockchain service
    try {
      blockchain = Blockchain.load(
        event.pathParameters.blockchain || '',
        process.env.BLOCKCHAIN_NETWORK || ''
      );
    } catch (e) {
      // error
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: e || 'Unsupported blockchain.'
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
