import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDBService extends DBSchema {
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
  private schema = ['day1', 'day2', 'day3'];

  constructor() {
    this.dbPromise = openDB<MyDBService>('my-database', 2, {
      upgrade: (db, oldVersion, newVersion, transaction) => {
        // Obtener todas las tablas existentes
        const existingStores = Array.from(db.objectStoreNames);

        // Eliminar tablas que no están en el esquema
        existingStores.forEach(store => {
          if (!this.schema.includes(store)) {
            db.deleteObjectStore(store);
          }
        });

        // Crear tablas que están en el esquema y no existen
        this.schema.forEach(store => {
          if (!existingStores.includes(store as 'day1' | 'day2' | 'day3')) {
            db.createObjectStore(store as 'day1' | 'day2' | 'day3', { keyPath: 'id', autoIncrement: true });
          }
        });
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
