import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('Text added to the database');

  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ content });
  const result = await request;
  console.log('Texsed saved to the database', result);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('Getting from the database');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Text retrieved from the database', result);
  return result;
};

// Starts the database
initdb();