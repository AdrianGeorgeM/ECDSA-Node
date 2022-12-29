const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04f3e09f3a2264f96e610cb144d165ba66f604891fe641968b5832abc6b82145db167a30a007ea0936004603f5af4d24f0155f03c7ec3344e963d81ba611807285": 100,//this is the public key address  of the first account
  "0468afdac4b8c264377956a20445ec2fc2cc8a3a4b13f90572dd8a338c1c5f1d47b514c11822cbcedbb8dfbdd01f6040bb8a2c966d0f748cd77bb8894250ad2a4c": 50,// this is the public key address  of the second account
  "04c319b871a0ccb8e21312e8fbac685b865a9ed1949285aa771849d3a40f9932515159cc65e0905c924ef0f45cf24f0be37b18c8dc77b9dd9d9db627c0cc45fa2a": 75, // this is the public key address  of the third account
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
