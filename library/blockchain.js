// blockchain
const Bitcoin   = require('./blockchain/bitcoin');
const Ethereum  = require('./blockchain/ethereum');
const Litecoin  = require('./blockchain/litecoin');
const NEM       = require('./blockchain/nem');
const Stellar   = require('./blockchain/stellar');

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

      case 'ltc':
      case 'litecoin':
        return new Litecoin(network);

      case 'xem':
      case 'nem':
        return new NEM(network);

      case 'xlm':
      case 'stellar':
        return new Stellar(network);

      default:
        throw 'Unknown blockchain.';
    }
  }
}

module.exports = Blockchain;
