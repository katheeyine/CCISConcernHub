import { auth, provider } from '../auth/auth';
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import User from '../models/user';

export default class ClientUser {
    static async signInWithMicrosoft() {
        const result = await signInWithPopup(auth, provider);
        return new ClientUser(result.user);
    }

    static onAuthStateChanged(listener) {
        onAuthStateChanged(auth, listener);
    }

    static async signOut() {
        await auth.signOut();
    }

    constructor(firebaseUser) {
        this.firebaseUser = firebaseUser
    }

    // Method to get corresponding User class from the database
    async getUserFromDatabase() {
        const email = this.firebaseUser.email;
        return await User.findByEmail(email);
    }
}
