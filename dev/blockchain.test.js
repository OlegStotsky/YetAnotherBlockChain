const Blockchain = require("./blockchain");

describe("Blockchain", () => {
    describe("createNewBlock", () => {
        it("Correctly creates new block", () => {
            const blockchain = new Blockchain();
            const nonce = 2389;
            const prevBlockHash = "OINA90SDNF90N";
            const hash = "90ANSD9F0N900N";
            const date = Date.now();
            const block = blockchain.createNewBlock(nonce, prevBlockHash, hash, date);
            expect(block).toMatchObject({
                index: 2,
                timestamp: date,
                transactions: [],
                hash,
                previousBlockHash: prevBlockHash
            });  
            expect(blockchain.chain.length).toEqual(2);
            expect(blockchain.chain[1]).toEqual(block);
        });
    });
    describe("createNewTransaction", () => {
        it("Correctly adds new to transaction to pendingTransactions array", () => {
            const blockchain = new Blockchain();
            blockchain.createNewTransaction(10, "Oleg", "Vasya");
            expect(blockchain.pendingTransactions.length).toEqual(1);
            expect(blockchain.pendingTransactions[0]).toMatchObject({
                amount: 10,
                sender: "Oleg",
                recipient: "Vasya"
            });
        });
    });
    describe("proofOfWork", () => {
        it("Correctly generates hash that starts with 0000", () => {
            const blockchain = new Blockchain();
            const hash = blockchain.proofOfWork("ANFASFASK;L124", [
                {
                    amount: 50,
                    sender: "Oleg",
                    recepient: "Vasya"
                }
            ]);
            expect(hash).toMatch(/^0000/);
        });
    });
});