const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
// const { hashMessage } = require("ethereum-cryptography/hash");
const PRIVATE_KEY = secp.utils.randomPrivateKey();

const getAddress = () => {
	const privateKey = secp.utils.randomPrivateKey();
	let publicK = secp.getPublicKey(privateKey);
	console.log("private key:", toHex(privateKey)); //private key
	console.log("Long public key:", toHex(publicK)); //long public key
	let public = publicK.slice(1);
	const hash = keccak256(public);
	const address = hash.slice(-20);
	console.log("Sliced public key:", toHex(address)); //short public key
	return toHex(address);
};

//After we have the message hash we can sign it with our private key to prove that a particular address votes yes on proposal 327.
const hashMessage = (message) => {
	const bytes = utf8ToBytes(message);
	const hash = keccak256(bytes);
	console.log("hash:", toHex(hash));
	return hash;
};

// Signing the Hash
// This will allow a blockchain node to take a signature of a transaction and understand which address authenticated this particular transaction.
const signMessage = (msg) => {
	const messageHash = hashMessage(msg);
	return secp.sign(messageHash, PRIVATE_KEY, { recovered: true });
};

// When the signature is passed with all of its components (recovery bit included), the public key can be recovered. This means that blockchain nodes will be able to understand who signed the transaction that was sent to them
const recoverKey = (message, signature, recoveryBit) => {
	const messageHash = hashMessage(message);
	console.log(secp.recoverPublicKey(messageHash, signature, recoveryBit));
	return secp.recoverPublicKey(messageHash, signature, recoveryBit);
};

const address = getAddress();
console.log(address);
const message = "Hello world";
const signature = signMessage(message);
console.log(signature);
// const recoveredKey = recoverKey('Hello world', signature.signature, signature.recovery);
// console.log(recoveredKey);
