// dependencies
const bitcoin = require('bitcoinjs-lib');
const BN      = require('bignumber.js');
const isaac   = require('isaac');

// library
const BlockchainInterface = require('./interface');

/**
 * Bitcoin Blockchain Library
 */
class Bitcoin extends BlockchainInterface {
  /**
   * Constructor function of the Bitcoin library.
   *
   * @param {String} network
   */
  constructor(network = 'mainnet') {
    super();

    // setup the bitcoin network
    this.network = (network && network === 'mainnet') ?
      bitcoin.networks.bitcoin :
      bitcoin.networks.testnet;
  }

  /**
   * Generates a random bitcoin wallet and returns the address, public key,
   * and the private key.
   *
   * @return {Object}
   */
  async generate() {
    try {
      const keyPair = bitcoin.ECPair.makeRandom({ network: this.network, rng: this._rng });
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.network });

      return {
        address,
        public_key: keyPair.publicKey.toString('hex'),
        private_key: keyPair.toWIF(),
      }
    } catch (e) {
      throw(e.message || 'Could not generate bitcoin wallet.');
    }
  }

  /**
   * RNG Functionality to make the address a little bit random
   *
   * Reference: https://github.com/Overtorment/BlueWallet/blob/b9ec7ac420f56454bf517e61e555c2b8e1768324/class/legacy-wallet.js#L49
   */
   _rng(c) {
    let buf = Buffer.alloc(c);
    let totalhex = '';
    for (let i = 0; i < c; i++) {
      let randomNumber = isaac.random();
      randomNumber = Math.floor(randomNumber * 256);
      let n = new BN(randomNumber);
      let hex = n.toString(16);
      if (hex.length === 1) {
        hex = '0' + hex;
      }
      totalhex += hex;
    }

    totalhex = bitcoin.crypto.sha256('oh hai!' + totalhex).toString('hex');
    totalhex = bitcoin.crypto.sha256(totalhex).toString('hex');
    buf.fill(totalhex, 0, 'hex');
    return buf;
  }
}

module.exports = Bitcoin;
