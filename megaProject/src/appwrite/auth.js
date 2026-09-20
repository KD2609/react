import conf from '../config/config.js'

import { Client, Account, ID } from 'appwrite'

export class AuthService {

    client = new Client()
    account

    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {

        try {

            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            })

            if (userAccount) {
                return await this.login({ email, password })
            }

            return userAccount

        } catch (error) {
            console.log("CREATE ACCOUNT ERROR:", error)
            throw error
        }
    }

    async login({ email, password }) {

        try {

            return await this.account.createEmailPasswordSession({
                email,
                password
            })

        } catch (error) {
            console.log("LOGIN ERROR:", error)
            throw error
        }
    }

    async getCurrentUser() {

        try {

            return await this.account.get()

        } catch (error) {

            console.log("GET CURRENT USER ERROR:", error)

            return null
        }
    }

    async logout() {

        try {

            await this.account.deleteSessions()

        } catch (error) {

            console.log("LOGOUT ERROR:", error)
            throw error
        }
    }
}

export default new AuthService()