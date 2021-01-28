require('dotenv').config();

const { KMSService } = require('./kms.service');

const kmsService = new KMSService(process.env.KEY_ID);

const secret = "i can totally keep a secret";

console.log('secret: ', secret);

kmsService.encrypt(secret).then(encrypted => {
  console.log('encrypted: ', encrypted);
  kmsService.decrypt(encrypted).then(decrypted => {
    console.log('decrypted: ', decrypted);
  })
})
