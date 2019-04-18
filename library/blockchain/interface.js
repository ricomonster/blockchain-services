class Interface {
  async generate() {
    throw('Unknown method generate method.');
  }

  async getBalance() {
    throw('Unknown method getBalance method.');
  }

  async sendTransaction() {
    throw('Unknown method sendTransaction method.');
  }
}

module.exports = Interface;
