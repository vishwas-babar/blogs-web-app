import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client(); // set this value and in constructor set the endpoint
    account;

    constructor() {
        const client = new Client()
            .setEndpoint(conf.appwriteApiEndpoint)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(client);
    }

    async createAccount({ email, password, name }){

        try {
            
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            console.log("account created sunccessfully");
            if (userAccount) {
                // call the other method for login the user or perform any other action
                return this.loginAccount({ email, password });
            }else{
                // suppose user is created but it is null or undefined then 
                return;
            }
        } catch (error) {
            console.log('error occured')
            throw error;
        }
    }

    async loginAccount({ email, password }){

        try {
            const userAccount = await this.account.createEmailPasswordSession( email, password );
            return userAccount;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logoutAccount(){
        try {
            return await this.account.deleteSessions(); // this method logout all sesions of user from all device
        } catch (error) {
            throw error;
        }

        return;
    }
}

const authService = new AuthService(); // we created object here directly
// so we dont have to create a object everytime when we have use any service from this
// we can use this directly authService.createAccount(parameters);
export default authService;
