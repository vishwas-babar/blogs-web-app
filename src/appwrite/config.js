import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";



export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {

        this.client
            .setEndpoint(conf.appwriteApiEndpoint)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, coverImage, status, userId }){
        try {
            return await this.databases.createDocument( 
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    coverImage,
                    status,
                    userId,
                }
             )
        } catch (error) {
            console.log("error occured: ", error);
        }
    }


    async updatePost(postId, { title, content, coverImage, status }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                postId,
                {
                    title,
                    content,
                    coverImage,
                    status
                }
            )
        } catch (error) {
             console.log("error occured: ", error);
        }
    }

    async deletePost(postId){
        try {
            await  this.databases.deleteDocument(
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                postId
            )

            return true;
        } catch (error) {
            console.log("error occured: ", error);

            return false;
        }
    }

    async getSinglePost(postId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                postId,
                
            )
        } catch (error) {
            console.log("error occured: ", error);
            return null;
        }
    }

    async getManyPost( queries = [Query.equal("status", "active")] ){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                queries,
            )
        } catch (error) {
            console.log("error occured: ", error);
            return null;
        }
    }


    // upload file service
    async uploadFile(file){
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )

            return true;
        } catch (error) {
            console.log("error occured: ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile( conf.appwriteBucketId, fileId )

            return true;
        } catch (error) {
            console.log("error occured: ", error);
            return false;
        }
    }

}


const appwriteService = new Service();

export default appwriteService;