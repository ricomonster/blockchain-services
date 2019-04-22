// dependencies
const nem = require('nem-sdk').default;

// library
const BlockchainInterface = require('./interface');

/**
 * NEM Blockchain Library
 */
class NEM extends BlockchainInterface {
  /**
   * Constructor function of the NEM library.
   *
   * @param {String} network
   */
  constructor(network = 'mainnet') {
    super();

    // setup the network provider
    let provider = nem.model.network.data.mainnet.id;

    // is the network testnet?
    if (network === 'testnet') {
      // set the nem network testnet
      provider = nem.model.network.data.testnet.id;
    }

    // set it to the class
    this.provider = provider;
  }

  /**
   * Generates a random nem wallet and returns the address, public key,
   * and the private key.
   *
   * @return {Object}
   */
  async generate() {
    // create private key via random bytes from PRNG and convert to hex
    const rBytes      = nem.crypto.nacl.randomBytes(32);
    const privateKey  = nem.utils.convert.ua2hex(rBytes);

    // create key keyPair
    const nemKeyPair = nem.crypto.keyPair.create(privateKey);

    // get address based on public key
    const address = nem.model.address.toAddress(nemKeyPair.publicKey.toString(), this.provider)

    return {
      address,
      public_key: nemKeyPair.publicKey.toString(),
      private_key: privateKey
    }
  }
}

module.exports = NEM;
