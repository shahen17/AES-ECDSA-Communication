const crypto = require('crypto');

const generate_Key = crypto.randomBytes(32); 
const to_hex = generate_Key.toString('hex');
const key = 'b9360fcb4afea1a2070d23978cc304fd925390d2665c1770cba9d2e2e77861d7'; // generated output


function encryptMessage(message, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted_msg = cipher.update(message, 'utf8', 'hex');
  encrypted_msg += cipher.final('hex');
  return encrypted_msg;
}

function decryptMessage(en_msg, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted_msg = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted_msg += decipher.final('utf8');
  return decrypted_msg;
}

module.exports = {
  encryptMessage,
  decryptMessage
};


