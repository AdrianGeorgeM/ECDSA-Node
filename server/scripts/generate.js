const secp = require("ethereum-cryptography/secp256k1");// this is the library that we will use to generate the private key
const { toHex } = require("ethereum-cryptography/utils");// this is the library that we will use to convert the private key to hex

const { keccak256 } = require("ethereum-cryptography/keccak");
const privateKey = secp.utils.randomPrivateKey();// this is the function that generates the private key
// console.log('private key:', privateKey);
//Run into server: node scripts/generate.js to see the private key
console.log('private key:', toHex(privateKey));// this is the function that converts the private key to hex

const publicKey = secp.getPublicKey(privateKey);// this is the function that generates the public key
// take the last 20 bytes of the keccak hash and return this.
console.log('public key:', toHex(publicKey));// this is the function that converts the public key to hex

let publicK = publicKey.slice(1);
const hash = keccak256(publicK);
const address = keccak256(hash).slice(-20);
console.log('public key:', toHex(address)); // this is the function that converts the public key to hex


//Take the last 20 bytes of the keccak hash and return this.

// function getAddress(publicKey) {
//     let publicK = publicKey.slice(1);
//     const hash = keccak256(publicK);
//     const address = keccak256(hash).slice(-20);
//     return toHex(address);
// }

// getAddress(publicKey);

