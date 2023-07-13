const axios = require('axios');
const http = require('http');
const { decryptMessage } = require('./encryption.js');
const { verify } = require('./ecdsa.js');


const key = 'b9360fcb4afea1a2070d23978cc304fd925390d2665c1770cba9d2e2e77861d7'; // unique key for aes-256 encryption/decryption which is generated..
const public_key = '03eb4af8fb0850fada0df21f3d4914a0fb3d32d059329489279eb20e48395857a1'; //generated: encryptopn.js

// Server to receive HTTP requests
const receiveServer = http.createServer((req, res) => {
    let requestData = '';
    
  
    req.on('data', (chunk) => {
      requestData += chunk;
    });
  
    req.on('end', () => {
      let array = requestData.split(',');
      const dec_msg = decryptMessage(array[0],key);
      const v = signature = {
                r: `${array[2]}`,
                s: `${array[3]}`,
                v: array[4]
                }
      const sender_verification = verify(v,array[1],public_key);
      if (sender_verification){
        console.log(`Decryted Message: ${dec_msg}`);
        console.log(`Sender Verified: TRUE`);
        res.end('Received HTTP request');
      } else {
        console.log(`Decryted Message: ${dec_msg}`);
        console.log(`Sender Verified: FALSE`);
        res.end('Received HTTP request');
      }
      
    });
  });
  
  receiveServer.listen(8080, () => {
    console.log('Receive server listening on port 8080');
  });