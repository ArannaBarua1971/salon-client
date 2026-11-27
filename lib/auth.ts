import { betterAuth, boolean } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODBURL as string)
const db = client.db("salon")

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user:{
    additionalFields:{
      role:{
        type:["customer","admin"],
        required:false,
        defaultValue:"customer",
        input:false
      },
      isBlocked:{
        type:"boolean",
        required:false,
        defaultValue:false,
        input:false,
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins:[jwt()],
  session:{
    cookieCache:{
      strategy:"jwt",
      enabled:true,
      maxAge:7*24*60*60
    }
  },
  database: mongodbAdapter(db, {
    client,
  }),
})
