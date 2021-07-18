import {Injectable} from '@angular/core';
import { openDB } from 'idb';
import {from, Observable, Subject} from 'rxjs';
import {IDBPDatabase} from "idb/build/esm/entry";

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  private _dbPromise: Promise<IDBPDatabase>;

  constructor() {
  }

  connectToIDB(): void {
    this._dbPromise = openDB('pwa-database', 1, {
      upgrade(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains('Users')) {
          upgradeDb.createObjectStore('Users', {keyPath: 'id', autoIncrement: true});
        }
      }
    });
  }

  addItem(target: string, value: Object): void {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      tx.objectStore(target).put(value);
      return tx.complete;
    });
  }

  deleteItem(target: string, value: Object): void {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      store.delete(value);
      return tx.complete;
    });
  }

  getAllData(target: string): Observable<any> {
    return from(this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      return store.getAll();
    }));
  }

  getByKey(target: string, id: string): Observable<any> {
    return from(this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      return store.get(id);
    }));
  }
}
