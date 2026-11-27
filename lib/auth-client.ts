import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins"
import { auth } from "./auth"
export const { signIn, signUp,signOut, useSession,token,updateUser } = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    jwtClient()
  ],
})