import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, privateKey }) {
	const [sendAmount, setSendAmount] = useState("");
	const [recipient, setRecipient] = useState("");
	const [signature, setSignature] = useState("");
	const [recoveryBit, setRecoveryBit] = useState("");

	const setValue = (setter) => (evt) => setter(evt.target.value);

	const hashMessage = (message) => {
		const bytes = utf8ToBytes(message);
		const hash = keccak256(bytes);
		// console.log("hash:", toHex(hash));
		return toHex(hash);
	};

	async function transfer(evt) {
		evt.preventDefault();

		const message = {
			address,
			sendAmount,
			recipient,
		};

		const hash = hashMessage(JSON.stringify(message));

		const [sig, recoveryBit] = await secp.sign(hash, privateKey, {
			recovered: true,
		});

		const signMessage = (hash, privateKey) => {
			const messageHash = hashMessage(hash);
			return secp.sign(messageHash, privateKey, { recovered: true });
		};

		const recoverKey = (message, signature, recoveryBit) => {
			const messageHash = hashMessage(message);
			// console.log(
			// 	toHex(secp.recoverPublicKey(messageHash, signature, recoveryBit))
			// );
			return toHex(secp.recoverPublicKey(messageHash, signature, recoveryBit));
		};

		const verifySignature = (message, signature, publicKey) => {
			const messageHash = hashMessage(message);
			return secp.verifySignature(messageHash, signature, publicKey);
		};

		// hashMessage(message);
		recoverKey(hash, sig, recoveryBit);
		const signMessageV = signMessage(hash, privateKey);
		message.sign = toHex(sig);
		message.recoveryBit = recoveryBit;
		setSignature(toHex(sig));
		setRecoveryBit(recoveryBit);
		console.log("MESSAGE:", message);
		// console.log("recoverKey:", recoverKey(hash, sig, recoveryBit));
		// console.log("signMessage:", signMessageV);

		try {
			const {
				data: { balance },
			} = await server.post(`send`, {
				sender: address,
				amount: parseInt(sendAmount),
				recipient,
			});
			setBalance(balance);
		} catch (ex) {
			alert(ex.response.data.message);
		}
	}

	return (
		<form className='container transfer' onSubmit={transfer}>
			<h1>Send Transaction</h1>

			<label>
				Send Amount
				<input
					placeholder='1, 2, 3...'
					value={sendAmount}
					onChange={setValue(setSendAmount)}
				></input>
			</label>

			<label>
				Recipient
				<input
					placeholder='Type an address, for example: 0x2'
					value={recipient}
					onChange={setValue(setRecipient)}
				></input>
			</label>
			<div>Signature: {signature}</div>
			<div>Recovery Bit: {recoveryBit}</div>
			<input type='submit' className='button' value='Transfer' />
		</form>
	);
}

export default Transfer;
