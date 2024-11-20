import mongoose, { Schema, Document } from 'mongoose';
import { DIDDocument } from '../types/did.js';

// Create a type that omits both @context and id from DIDDocument
type DIDDocumentBase = Omit<DIDDocument, '@context' | 'id'>;

// Define the interface extending Document with the correct types
export interface DIDModel extends Document, DIDDocumentBase {
  context: string[];
  id: string;
  encryptedPrivateKey: string;
}

const DIDSchema = new Schema({
  context: [{ type: String, required: true }],
  id: { type: String, required: true, unique: true },
  verificationMethod: [{
    id: { type: String, required: true },
    type: { type: String, required: true },
    controller: { type: String, required: true },
    publicKeyBase58: { type: String, required: true }
  }],
  authentication: [{ type: String, required: true }],
  assertionMethod: [{ type: String, required: true }],
  created: { type: String, required: true },
  updated: { type: String, required: true },
  encryptedPrivateKey: { type: String, required: true, select: false }
});

const DIDModel = mongoose.model<DIDModel>('DID', DIDSchema);
export default DIDModel;