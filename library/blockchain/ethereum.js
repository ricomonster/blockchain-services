// dependencies
const ethWallet = require('ethereumjs-wallet');
// const Web3 = require('web3');

// library
const BlockchainInterface = require('./interface');

class Ethereum extends BlockchainInterface {
  constructor(network = 'mainnet') {
    super();

    // setup web3
    // setup infura connection
    const infura = (network && network === 'testnet') ?
      'https://rinkeby.infura.io/v3/da034c9d3bb84d3b819a76e9e93e2162' :
      'https://mainnet.infura.io/v3/da034c9d3bb84d3b819a76e9e93e2162';

    // // instantiate web3
    // this.web3 = new Web3(new Web3.providers.HttpProvider(infura));
  }

  /**
   * Generates a random ethereum wallet and returns the address, public key,
   * and the private key.
   *
   * @return {Object}
   */
  async generate() {
    // generate wallet
    const key     = await ethWallet.generate();
    const wallet  = await ethWallet.fromPrivateKey(key._privKey);

    return {
      address: wallet.getAddressString(),
      public_key: wallet.getPublicKeyString(),
      private_key: wallet.getPrivateKeyString()
    }
  }
}

module.exports = Ethereum;
