const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


const getAddress = () => {
    const privateKey = secp.utils.randomPrivateKey();
    let publicK = secp.getPublicKey(privateKey);
    console.log('private key:', toHex(privateKey));//private key
    console.log('Long public key:', toHex(publicK));//long public key
    let public = publicK.slice(1);
    const hash = keccak256(public);
    const address = hash.slice(-20);
    console.log('Sliced public key:', toHex(address));//short public key
    return toHex(address);
}
getAddress();
