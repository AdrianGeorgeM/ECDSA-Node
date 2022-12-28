const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "d094c3c7647ba9eca0534b4ef553d9a7753bb9fa25f6e082fece486c344f1065": 100,//this is the public key address  of the first account
  "1d48b9a33db00b86f7e698a89576bcebb2bbbb13c6a3244a828f48f99e264560": 50,// this is the public key address  of the second account
  "d269a59496943f6a3cea71cfe8a76adf140675bbfbb064728c286b1f0b90ce3e": 75, // this is the public key address  of the third account
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
