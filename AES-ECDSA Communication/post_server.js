const axios = require('axios');
const http = require('http');
const { encryptMessage, decryptMessage } = require('./encryption.js');
const { hash_message, sign, verify } = require('./ecdsa.js');

const key = 'b9360fcb4afea1a2070d23978cc304fd925390d2665c1770cba9d2e2e77861d7'; // unique key for aes-256 encryption/decryption which is generated..
const private_key = '0eb94a7347812205753af18f405f09f9dfa3812b168a7ab208cf1ecd53f1cebc'; // generated:encryption.js
const public_key = '03eb4af8fb0850fada0df21f3d4914a0fb3d32d059329489279eb20e48395857a1'; //generated: encryptopn.js

const sample_message = 'hello';
const hash = hash_message(sample_message);
const encr = encryptMessage(sample_message,key); // encrypting the sample message using aes-256
const mk_signature = sign(sample_message,private_key);
const { r, s, v } = mk_signature;
//listening on 3000, posting to 8080
const post_server = http.createServer((req,res) => {
    axios
        .post('http://localhost:8080/',`${encr},${hash},${r},${s},${v}`)
        .then((response) => {
            console.log('Data from post_server Client_a', response.data)

        })  
        .catch((error) => {
            console.error(error.message);
        });
    res.end('Message Sent!!!');
});

post_server.listen(3000, () => {
    console.log('listening on port 3000');
});



  