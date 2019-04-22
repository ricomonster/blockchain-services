// dependencies
const StellarSdk = require('stellar-sdk');

// library
const BlockchainInterface = require('./interface');

/**
 * Stellar Blockchain Library
 */
class Stellar extends BlockchainInterface {
  /**
   * Constructor function of the Stellar library.
   *
   * @param {String} network
   */
  constructor(network = 'mainnet') {
    super();
  }

  /**
   * Generates a random stellar wallet and returns the address, public key,
   * and the private key.
   *
   * @return {Object}
   */
  async generate() {
    // generate keys
    const pair = StellarSdk.Keypair.random();

    return {
      address: pair.publicKey(),
      private_key: pair.secret(),
    }
  }
}

module.exports = Stellar;
