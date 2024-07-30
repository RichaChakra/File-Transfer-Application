const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'my_secret_key';

const decrypt = (hash) => {
    const [iv, encryptedText] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
    return decrypted.toString();
};

module.exports = { decrypt };
