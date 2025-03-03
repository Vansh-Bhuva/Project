import conf from "../conf/conf.js";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export class AuthService {
  app;
  databases;

  constructor() {
    this.app = initializeApp({
      apiKey: conf.firebaseApi,
      authDomain: conf.firebaseAuthDomain,
      databaseURL: conf.firebaseUrl,
      projectId: conf.firebaseProjectId,
      appId: conf.firebaseAppId,
      messagingSenderId: conf.firebaseMessengerSenderId,
    });
    this.auth = getAuth(this.app);
  }

  async createAccount(email, password) {
    try {
      const userAccount = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userAccount;
    } catch (error) {
      console.log("Firebase service :: CreateAccount :: error", error);
    }
  }

  async Login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      
      return userCredential.user;
    } catch (error) {
      console.log("Firebase service :: Login :: error", error);
    }
  }

  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      try {
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            resolve({id : user.uid , email : user.email}); // ✅ Correctly resolves user UID
          } else {
            resolve(0);
          }
        });
      } catch (error) {
        console.log("Firebase service :: getCurrentUser :: error", error);
        reject(error);
      }
    });
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log("Firebase service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
