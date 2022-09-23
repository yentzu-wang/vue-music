import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

type UploadTask = firebase.storage.UploadTask
type DocumentData = firebase.firestore.DocumentData

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const usersCollection = db.collection("users")
const songsCollection = db.collection("songs")
const commentsCollection = db.collection("comments")

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
  UploadTask,
  DocumentData
}
