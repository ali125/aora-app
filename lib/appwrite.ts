import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import {
  APP_WRITE_PROJECT_ID,
  APP_WRITE_DB_ID,
  APP_WRITE_USER_COLLECTION_ID,
  APP_WRITE_VIDEO_COLLECTION_ID,
  APP_WRITE_STORAGE_ID,
} from "@env";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.rn",
  projectId: APP_WRITE_PROJECT_ID,
  databaseId: APP_WRITE_DB_ID,
  userCollectionId: APP_WRITE_USER_COLLECTION_ID,
  videoCollectionId: APP_WRITE_VIDEO_COLLECTION_ID,
  storageId: APP_WRITE_STORAGE_ID,
} as const;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};
type CreateUser = (params: CreateUserParams) => Promise<any>;

export const createUser: CreateUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

type SignIn = (email: string, password: string) => Promise<any>;

export const signIn: SignIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

type GetCurrentUser = () => Promise<any>;
export const getCurrentUser: GetCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
