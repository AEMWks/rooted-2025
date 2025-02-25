import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDBService extends DBSchema {
  'clicked-events': {
    key: string;
    value: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbPromise: Promise<IDBPDatabase<MyDBService>>;

  constructor() {
    this.dbPromise = openDB<MyDBService>('my-database', 1, {
      upgrade(db) {
        db.createObjectStore('clicked-events', { keyPath: 'id', autoIncrement: true });
      }
    });
  }

  async addEvent(event: any) {
    const db = await this.dbPromise;
    await db.add('clicked-events', event);
  }

  async getEvents() {
    const db = await this.dbPromise;
    return await db.getAll('clicked-events');
  }

  async eventExists(title: string): Promise<boolean> {
    const db = await this.dbPromise;
    const events = await db.getAll('clicked-events');
    return events.some(event => event.title === title);
  }

    async removeEvent(event: any) {
        const db = await this.dbPromise;
        await db.delete('clicked-events', event.id);
    }
}
