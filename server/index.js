const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
	"78667289ba046040d0b8030b43df0020bd60ab2b": 100, //private key: 4b7dac24309b95122db428cd86fd1d3933344d8bbb57f2187051fede961a2d7e
	"04614eb26b5091e9194dff3132d517ae4016f3fa8447a1b25569d10aab3d69a21bca815d07e4bc741349c52b1d4791a739a6836f5cdc4f49d20cdc5b6ff60d9bce": 520, // private key: 2b25e896ebce975ba7a8c6323d35bf66070cb1c42fa5a41594ef18c2ca2e7836
	"19a92164c94e8f9b60938e208bdbc8c8c11c3b1e": 75, // private key: db5337b9f5dc15a94b0dfd6863cbf35feb279af520a1e60eff43164e1460739b
};

app.get("/balance/:address", (req, res) => {
	const { address } = req.params;
	const balance = balances[address] || 0;
	res.send({ balance });
});

app.post("/send", (req, res) => {
	//TODO get a signature from the clien-side application and
	//recover the public key from the signature
	const { sender, recipient, amount } = req.body;

	setInitialBalance(sender);
	setInitialBalance(recipient);

	if (balances[sender] < amount) {
		res.status(400).send({ message: "Not enough funds!" });
	} else {
		balances[sender] -= amount;
		balances[recipient] += amount;
		res.send({ balance: balances[sender] });
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
	if (!balances[address]) {
		balances[address] = 0;
	}
}
