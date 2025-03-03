import conf from "../conf/conf.js";
import { initializeApp } from "firebase/app";
import { addDoc, getDocs, getFirestore } from "firebase/firestore";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

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

    this.databases = getFirestore(this.app);
    this.createPost = this.createPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
  }

  async createPost(Category, Amount, Date, type, user_id) {
    try {
      console.log(
        `Category : ${Category} Amount : ${Amount} and Date is : ${Date} type is ${type}`
      );

      return await addDoc(collection(this.databases, "expense-data"), {
        Category: Category, // don't write like this Category:{Category}
        Amount: Amount, // don't write like this amount:{amount}
        Date: Date,
        type: type,
        user_id : user_id
      });
    } catch (error) {
      console.log("Firebase service :: createPost :: error", error);
    }
  }

  async updateCard(id, Category, Amount, Date, type) {
    try {
      await updateDoc(doc(this.databases, "expense-data", id), {
        Category: Category,
        Amount: Amount,
        Date: Date,
        type: type,
      });
    } catch (error) {
      console.log("Firebase service :: updatePost :: error", error);
    }
  }

  async deleteCard(id) {
    try {
      await deleteDoc(doc(this.databases, "expense-data", id));
    } catch (error) {
      console.log("Firebase service :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts(id) {
    try {
      const q = query(
        collection(this.databases, "expense-data"),
        where("user_id", "==", id)
      );

      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs;
    } catch (error) {
      console.log("Firebase service :: getPosts :: error", error);
      return false;
    }
  }

  //file Upload Services
}

const service = new AuthService();

export default service;
