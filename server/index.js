const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "040f96b2b0f0e05020478696e876bcecb75de99764d54a7748d8e8ceecde88940c796689fe7c2dc9707283a023f519715014ffda29e64d04c209f1c49962a011df": 100,//this is the public key address  of the first account
  "042be07eaccba5af4702d35a317773f899615e1ac7d834667105d03584b82258deee2456bafee8386829466e8b6209b51867aab352a457cb128d41c48d10eabd23": 50,// this is the public key address  of the second account
  "0454f801b1f0e86461768d2f706dbbf28584f9c1b42d6e9b034d4f25ce4af466884292ff7ebff4c776a2570478ae04c1f13431e7dc1c79c389c5eabbf1d73c565a": 75, // this is the public key address  of the third account
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
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
