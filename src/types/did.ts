export interface DIDDocument {
  '@context': string[];
  id: string;
  verificationMethod: {
    id: string;
    type: string;
    controller: string;
    publicKeyBase58: string;
  }[];
  authentication: string[];
  assertionMethod: string[];
  created: string;
  updated: string;
}

export interface DIDKeyPair {
  publicKey: Buffer;
  privateKey: Buffer;
}

export interface SecureDIDDocument extends DIDDocument {
  encryptedPrivateKey?: string;
}