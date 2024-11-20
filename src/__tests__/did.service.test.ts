import { DIDService } from '../services/did.service.js';
import DIDModel from '../models/did.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/did-service-test');
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await DIDModel.deleteMany({});
});

describe('DIDService', () => {
  it('should create a new DID', async () => {
    const didDocument = await DIDService.createDID();
    
    expect(didDocument.id).toMatch(/^did:key:z/);
    expect(didDocument['@context']).toContain('https://www.w3.org/ns/did/v1');
    
    // Verify the DID was saved to the database
    const savedDID = await DIDModel.findOne({ id: didDocument.id });
    expect(savedDID).toBeDefined();
    expect(savedDID?.id).toBe(didDocument.id);
  });

  it('should resolve an existing DID', async () => {
    // First create a DID
    const didDocument = await DIDService.createDID();
    
    // Then try to resolve it
    const resolved = await DIDService.resolveDID(didDocument.id);
    
    expect(resolved).toBeDefined();
    expect(resolved?.id).toBe(didDocument.id);
    expect(resolved?.['@context']).toEqual(didDocument['@context']);
  });

  it('should return null for non-existent DID', async () => {
    const nonExistentDID = 'did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK';
    const resolved = await DIDService.resolveDID(nonExistentDID);
    expect(resolved).toBeNull();
  });
});