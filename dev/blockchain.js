const sha256 = require('sha256');

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

  hashBlock(prevBlockHash, curBlockData, nonce) {
      const dataAsString = prevBlockHash + nonce.toString() + JSON.stringify(curBlockData);
      const hash = sha256(dataAsString);
      return hash;
  }
}

module.exports = Blockchain;
