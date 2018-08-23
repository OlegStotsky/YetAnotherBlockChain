const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const BlockChain = require('./blockchain');

const nodeAddress = uuid().split("-").join("");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const blockChain = new BlockChain();

app.get("/blockchain", (req, res) => {
    res.send(blockChain);
});

app.post('/transaction', (req, res) => {
    const blockIndex = blockChain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({ note: `Transaction will be added in block ${blockIndex}.`});
});

app.get("/mine", (req, res) => {
    const prevBlock = blockChain.getLastBlock();
    const [hash, nonce] = blockChain.proofOfWork(prevBlock, blockChain.pendingTransactions);
    const newBlock = blockChain.createNewBlock(nonce, prevBlock.hash, hash);

    blockChain.createNewTransaction(12.5, "00", nodeAddress);

    res.json({
        note: "New block mined successfully",
        block: newBlock
    });
});

app.listen(3000);