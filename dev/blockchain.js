class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }

  createNewBlock(nonce, previousBlockHash, hash, date=Date.now()) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: date,
      transactions: this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  getLastBlock() {
      return this.chain[this.chain.length-1];
  }

  createNewTransaction(amount, sender, recipient) {
    const newTransaction = {
        amount,
        sender,
        recipient
    };
    this.pendingTransactions.push(newTransaction);
  }
}

module.exports = Blockchain;
