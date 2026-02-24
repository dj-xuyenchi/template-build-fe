import JSEncrypt from "jsencrypt";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGY0v/NOLubRNBXJ83ejAbAlH/lH
HkrztMY5xaYId1qwCrY2Y9+iWUGR/NM+/C1MxyTtzbxRLRM+7NA2ldNl5GhmkYq2
wNZWIxv7rzFku2q5UI8dAgqChaeGk+RsB0OCfUyMskvOPNgQLZxAMZc3Wvpglyu2
dSexRUcdFY1A/NVLAgMBAAE=
-----END PUBLIC KEY-----`;

export const encryptRSA = (plaintext: string): string => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUBLIC_KEY);
  const encrypted = encryptor.encrypt(plaintext);
  return encrypted ? encrypted : '';
}
