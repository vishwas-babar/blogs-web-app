

// sometimes what happend due to some reason env variables cant load everytime thats why we load all this in one object and export it
// if env variables not loaded then our web app crashes
// we should convert it in the string some values are just a numbers and we need to convert it in string

const conf = {
    appwriteApiEndpoint: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDBId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteArticleCollectionId: String(import.meta.env.VITE_APPWRITE_ARTICLE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;