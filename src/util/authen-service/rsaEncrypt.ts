import JSEncrypt from "jsencrypt";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZg1n1eaSiKOL+eZktj12yBBo4aGPyXCv0nZUyiNWDO+JmYK45gUKG4g0dr77PQU66XW+8WngLRhd2QpNT2jiBE31XjQtpPIMxosSIwrp+m76JBg4JhY00y6ZBWxmSdnepbwQceB134CeFT4KXAigtEmYIaCD/5bzOCqz+tm3VmQIDAQAB
-----END PUBLIC KEY-----`;

export const encryptRSA = (plaintext: string): string => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUBLIC_KEY);
  const encrypted = encryptor.encrypt(plaintext);
  return encrypted ? encrypted : '';
}
