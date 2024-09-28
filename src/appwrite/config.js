import { Databases, Query, Client, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client()
    databases
    storage

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.databaseId, conf.collectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                })
        } catch (error) {
            throw error
        }
    }

    async deleteDocument(slug) {
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Error: ", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log("Error at getPost(): ", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
        } catch (error) {
            console.log("Error at getPosts(): ", error)
            return false
        }
    }

    //file services

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error at uploadFile(): ", error)
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            await this.storage.deleteFile(
                conf.bucketId,
                fileID
            )
            return true
        } catch (error) {
            console.log("Error at deleteFile(): ", error)
            return false
        }
    }

    getFilePreview(fileID) {
        this.storage.getFilePreview(
            conf.bucketId,
            fileID
        )
    }
}

const service = new Service
export default service