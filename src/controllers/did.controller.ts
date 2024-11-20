import { Request, Response } from 'express';
import { DIDService } from '../services/did.service.js';

export class DIDController {
  static async createDID(req: Request, res: Response): Promise<void> {
    try {
      const didDocument = await DIDService.createDID();
      res.status(201).json({
        didDocument,
        message: 'DID created successfully'
      });
    } catch (error) {
      console.error('Error creating DID:', error);
      res.status(500).json({ error: 'Failed to create DID' });
    }
  }

  static async resolveDID(req: Request, res: Response): Promise<void> {
    try {
      const { did } = req.params;
      const didDocument = await DIDService.resolveDID(did);
      
      if (!didDocument) {
        res.status(404).json({ error: 'DID not found' });
        return;
      }

      res.json(didDocument);
    } catch (error) {
      console.error('Error resolving DID:', error);
      res.status(500).json({ error: 'Failed to resolve DID' });
    }
  }
}