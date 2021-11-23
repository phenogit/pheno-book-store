import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// 可以到 https://next-auth.js.org/configuration/options 看各種 option 的設定
export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
});
