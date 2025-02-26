import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDBService extends DBSchema {
  'clicked-events': {
    key: string;
    value: any;
  };
  'day1': {
    key: string;
    value: any;
  };
  'day2': {
    key: string;
    value: any;
  };
  'day3': {
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
      if (db.objectStoreNames.contains('clicked-events')) {
        db.deleteObjectStore('clicked-events');
      }
      if (!db.objectStoreNames.contains('day1')) {
        db.createObjectStore('day1', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('day2')) {
        db.createObjectStore('day2', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('day3')) {
        db.createObjectStore('day3', { keyPath: 'id', autoIncrement: true });
      }
      }
    });
  }

  async addEvent(event: any, table: any) {
    const db = await this.dbPromise;
    await db.add(table, event);
  }

  async getEvents(table: any) {
    const db = await this.dbPromise;
    return await db.getAll(table);
  }

  async eventExists(title: string, table: any): Promise<boolean> {
    const db = await this.dbPromise;
    const events = await db.getAll(table);
    return events.some(event => event.title === title);
  }

    async removeEvent(event: any, table: any) {
        const db = await this.dbPromise;
        await db.delete(table, event.id);
    }
}
