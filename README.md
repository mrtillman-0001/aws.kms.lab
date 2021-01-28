# aws.kms.lab

single control point to manage encryption keys

---

## Resources

- [Getting Started with AWS Key Management Service](https://aws.amazon.com/kms/getting-started/)
- [AWS Encryption SDK for JavaScript examples](https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/js-examples.html)
- [Class: AWS.KMS](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html)

## Usage

First, create a new symmetric key in KMS. Retain the id.

Next, rename `demo.env` to `.env` and place your key id into this file:

```sh
# .env
KEY_ID={your-key-id}
```

Be sure to [install](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and [configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) the [AWS CLI](https://aws.amazon.com/cli)

Finally, follow the example found in [index.js](https://github.com/mrtillman-0001/aws.kms.lab/blob/main/index.js):

```js
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
```