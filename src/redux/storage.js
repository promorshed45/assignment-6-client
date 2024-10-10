// storage.js
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create a noop storage implementation for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null); // Always resolves to null
    },
    setItem(_key, value) {
      return Promise.resolve(value); // Just resolves with the value
    },
    removeItem(_key) {
      return Promise.resolve(); // Does nothing
    },
  };
};

// Check if running in a browser environment
const storage = typeof window !== "undefined" 
  ? createWebStorage("local") // Use local storage in the browser
  : createNoopStorage(); // Use noop storage in SSR

export default storage;
