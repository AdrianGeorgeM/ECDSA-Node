const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress() {
    const privateKey = secp.utils.randomPrivateKey();
    let publicK = secp.getPublicKey(privateKey);
    console.log('private key:', toHex(privateKey));//private key
    console.log('public key:', toHex(publicK));//long public key
    return toHex(publicK);
}
getAddress();

// console.log('private key:', toHex(privateKey));
// const publicKey = secp.getPublicKey(privateKey);
// console.log('public key:', toHex(publicKey));

// take the last 20 bytes of the keccak hash and return this.
// let publicK = publicKey.slice(1);
// const hash = keccak256(publicK).slice(-20);
// console.log('public key:', toHex(hash)); //short public key
// // //end of the snippet
// const privateKey = secp.utils.randomPrivateKey();// this is the function that generates the private key
// // console.log('private key:', privateKey);
// //Run into server: node scripts/generate.js to see the private key
// console.log('private key:', toHex(privateKey));// this is the function that converts the private key to hex
// const publicKey = secp.getPublicKey(privateKey);// this is the function that generates the public key
// // take the last 20 bytes of the keccak hash and return this.
// console.log('public key:', toHex(publicKey));// this is the function that converts the public key to hex

// let publicK = publicKey.slice(1);
// const hash = keccak256(publicK);
// const address = keccak256(hash).slice(-20);
// console.log('public key:', toHex(address)); // this is the function that converts the public key to hex


// //Take the last 20 bytes of the keccak hash and return this.

// // function getAddress(publicKey) {
// //     let publicK = publicKey.slice(1);
// //     const hash = keccak256(publicK);
// //     const address = keccak256(hash).slice(-20);
// //     return toHex(address);
// // }

// // getAddress(publicKey);

