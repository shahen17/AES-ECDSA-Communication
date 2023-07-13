const { secp256k1 } = require('ethereum-cryptography/secp256k1.js');
const { keccak256 } = require('ethereumjs-util');


const pprivate = secp256k1.utils.randomPrivateKey(); 
const privateKey = Buffer.from(pprivate).toString('hex');
const eth_private_key = '0eb94a7347812205753af18f405f09f9dfa3812b168a7ab208cf1ecd53f1cebc'; // generated
const publicKey = secp256k1.getPublicKey(eth_private_key);
const public_Key = Buffer.from(publicKey).toString('hex');
const eth_public_key = '03eb4af8fb0850fada0df21f3d4914a0fb3d32d059329489279eb20e48395857a1'; //generated



function hash_message(message) { //keccak256 hash
  const buffer_message = Buffer.from(message, 'utf8');
  y = keccak256(buffer_message);
  c = Buffer.from(y).toString('hex');
  return c
};

function sign(message,privateK){ 
  const a = hash_message(message);
  const signature = secp256k1.sign(a, privateK);
  return signature;
}

function verify(signature, messageHash, publicK){
  const isSigned = secp256k1.verify(signature, messageHash, publicKey);
  return isSigned;
}

module.exports = {
  hash_message,
  sign,
  verify
};