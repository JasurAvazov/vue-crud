import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCk1vQF8lCC8MOFO7OCnTl8vycTRC0XzZ0",
  authDomain: "my-first-project-b449e.firebaseapp.com",
  databaseURL: "https://my-first-project-b449e-default-rtdb.firebaseio.com",
  projectId: "my-first-project-b449e",
  storageBucket: "my-first-project-b449e.appspot.com",
  messagingSenderId: "448091764362",
  appId: "1:448091764362:web:ef24ae82a21224f8c59f73"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;