import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method
                return this.loginAccount({email, password})
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw (error)
        }
    }

    async loginAccount ({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw(error)
        }
    }
    async getCurrentUser () {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error :: appwrite: getCurrentUser: ", error)
        }

        return null
    }

    async logoutUser () {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Error: appwrite: logoutUser: ", error)
        }
    }
}

const authService = new AuthService()

export default authService