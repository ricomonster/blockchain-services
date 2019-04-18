// blockchain
const Bitcoin = require('./blockchain/bitcoin');
const Ethereum = require('./blockchain/ethereum');

/**
 * Blockchain Service Class
 */
class Blockchain {
  static load(blockchain, network = 'mainnet') {
    switch (blockchain.toLowerCase()) {
      case 'btc':
      case 'bitcoin':
        return new Bitcoin(network);

      case 'eth':
      case 'ethereum':
        return new Ethereum(network);

      default:
        throw('Unknown blockchain.');
    }
  }
}

module.exports = Blockchain;
