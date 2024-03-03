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

    async createPost({ title, content, coverImageUrl, coverImageId, status, userId }){
        try {

            console.log("crating the new Post: ")

            return await this.databases.createDocument( 
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    coverImageUrl,
                    coverImageId,
                    status,
                    userId,
                }
             )
        } catch (error) {
            console.log("error occured: ", error);
        }
    }


    async updatePost(postId, { title, content, coverImageId, coverImageUrl, status }){
        try {
            console.log("updating the post")
            return await this.databases.updateDocument(
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                postId,
                {
                    title,
                    content,
                    coverImageUrl,
                    coverImageId,
                    status
                }
            )
        } catch (error) {
             console.log("error occured: ", error);
             throw error;
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
            throw error
            return null;
        }
    }

    async getManyPost( queries = [Query.equal("status", "active")] ){
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDBId,
                conf.appwriteArticleCollectionId,
                queries,
            )
            return posts;
        } catch (error) {
            console.log("error occured: ", error);
            return null;
        }
    }


    // upload file service
    async uploadFile(file){
        console.log("got the file input - ", file)
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("error occured: ", error);
            throw error;
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile( conf.appwriteBucketId, fileId )

            return true;
        } catch (error) {
            console.log("error occured: ", error);
            throw error;
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            const fileUrl =  await this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
            console.log(fileUrl)
            return fileUrl
        } catch (error) {
            console.log("error when getting the preview of image")
            throw error
        }
    }

}


const appwriteService = new Service();

export default appwriteService;