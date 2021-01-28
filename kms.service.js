const { KMSClient, EncryptCommand, DecryptCommand } = require("@aws-sdk/client-kms");

class KMSService {

  constructor(keyId) {
    this._keyId = keyId;
    this._region = "us-east-1";
    this.kmsClient = new KMSClient({
      region: this._region,
    });
  }

  async encrypt(input) {
    const encryptCommand = new EncryptCommand({
      KeyId: this._keyId,
      Plaintext: Buffer.from(input),
    });
    try {
      let result = await this.kmsClient.send(encryptCommand);
      return Buffer.from(result.CiphertextBlob).toString("base64");
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async decrypt(input) {
    const decryptCommand = new DecryptCommand({
      KeyId: this._keyId,
      CiphertextBlob: Buffer.from(input, "base64"),
    });
    try {
      let result = await this.kmsClient.send(decryptCommand);
      return Buffer.from(result.Plaintext).toString();
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}

module.exports.KMSService = KMSService;
