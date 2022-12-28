const secp = require("ethereum-cryptography/secp256k1");// this is the library that we will use to generate the private key
const { toHex } = require("ethereum-cryptography/utils");// this is the library that we will use to convert the private key to hex

const privateKey = secp.utils.randomPrivateKey();// this is the function that generates the private key

//Run into server: node scripts/generate.js to see the private key
console.log('private key:', toHex(privateKey));// this is the function that converts the private key to hex  