import conf from "../config/config";
import {
    Client,
    Account,
    ID,
    TablesDB,
    Query,
    Storage
} from 'appwrite';

export class Service {

    client = new Client();

    account;
    tablesDB;
    bucket;

    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);

        this.tablesDB = new TablesDB(this.client);

        this.bucket = new Storage(this.client);
    }

    // =========================
    // POST SERVICES
    // =========================

    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId
    }) {

        try {

            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });

        } catch (error) {

            console.log(error);
            return false;

        }
    }


    async updatePost(
        slug,
        {
            title,
            content,
            featuredImage,
            status
        }
    ) {

        try {

            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });

        } catch (error) {

            console.log(error);
            return false;

        }
    }


    async deletePost(slug) {

        try {

            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });

            return true;

        } catch (error) {

            console.log(error);
            return false;

        }
    }


    async getPost(slug) {

        try {

            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            });

        } catch (error) {

            console.log(error);
            return false;

        }
    }


    async getPosts(
        queries = [Query.equal("status", "active")]
    ) {

        try {

            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries
            });

        } catch (error) {

            console.log(error);
            return false;

        }
    }


    async uploadFile(file) {

        try {

            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            });

        } catch (error) {

            console.log(error);
            return false;

        }
    }


    async deleteFile(fileId) {

        try {

            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            });

            return true;

        } catch (error) {

            console.log(error);
            return false;

        }
    }


    getFilePreview(fileId) {

        return this.bucket.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        });

    }
}


export default new Service();