import { CryptoService } from './crypto.service.js';
import DIDModel from '../models/did.model.js';
import { DIDDocument } from '../types/did.js';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';

export class DIDService {
  static async createDID(): Promise<DIDDocument> {
    const keyPair = CryptoService.generateKeyPair();
    const publicKeyBase58 = uint8ArrayToString(keyPair.publicKey, 'base58btc');
    const did = `did:key:z${publicKeyBase58}`;

    const didDocument: DIDDocument = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/ed25519-2020/v1'
      ],
      id: did,
      verificationMethod: [{
        id: `${did}#keys-1`,
        type: 'Ed25519VerificationKey2020',
        controller: did,
        publicKeyBase58
      }],
      authentication: [`${did}#keys-1`],
      assertionMethod: [`${did}#keys-1`],
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    // Encrypt the private key before storing
    const encryptedPrivateKey = CryptoService.encryptPrivateKey(keyPair.privateKey);

    await DIDModel.create({
      ...didDocument,
      context: didDocument['@context'],
      encryptedPrivateKey
    });

    return didDocument;
  }

  static async resolveDID(did: string): Promise<DIDDocument | null> {
    const didDoc = await DIDModel.findOne({ id: did }, { encryptedPrivateKey: 0 }).lean();
    if (!didDoc) return null;

    const { context, _id, __v, ...rest } = didDoc;
    
    return {
      ...rest,
      '@context': context,
      id: did
    } as DIDDocument;
  }
}