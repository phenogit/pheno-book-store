---
title: 第三章-進行 OAuth
seoTitle: This is the title that Google shows on a search result.
seoDescription: This is the short description that Google shows on a search result.
excerpt: "This is a free excerpt of the chapter. To see the rest, you'll have to buy the book."
---

我們目前進度是有了可以透過 Material-UI 去設計前端介面的網頁應用程式。接下來，我們就可以真的開始實作一些功能，然後再決定這些功能要使用什麼 UI 介面來呈現給我們的使用者。

我想了想，先來實作認證，現在的世界，總是要有個使用者認證才比較有意義了。

## OAuth

OAuth 算是現在現在主流且規範完整的一種使用者認證流程，幾乎所有大的知名網站(Google, Github, Facebook, Twitter...)都有提供這個支援。
對大網站的好處在於，他們可以透過支援這個流程，讓使用者可以在跟他們無關的網站上面還是可以使用這些大網站的帳號資訊，增加使用者跟大網站的耦合度。
對我們現在的小網站的好處是，我們可以利用大網站已經有很多使用者的特性，基本上讓使用者可以無感的登入，不用再申請帳號之類的東西。
對使用者來說，他們也不用到處去記不同網站用的帳密，可以一個帳密到處通用。

整體來說，我個人是覺得 OAuth 是一個趨勢，我以一個使用者的角色來說，其實也會抗拒讓我的帳密跟某個平台綁死，但是也不可否認的，這讓生活方便了很多。XD
不管怎麼說，我們身為程式設計師，是一定要知道一下 OAuth 到底如何運作。

從程式開發的角度來看，OAuth 這個機制跟流程最主要的目的，就是在拿到一個第三方(Google, Github...etc)的合法 Access Token。而這個合法 token 就可以讓我們可以拿到我們會需要的資料。就這麼簡單。

我對 OAuth (先用 Google OAuth 當例子)流程做個簡單的介紹：

1. 使用這在我們的應用程式(我們的書店)上點擊用 Google 登入這樣的按鈕時
2. 我們書店會將使用者導去 Google 指定的一個認證伺服器並且提供 Google 的伺服器以下的幾個重要資訊
   - Redirect URI
   - 要透過 Google 認證後得到的使用者資訊(舉例來說，使用者名稱、大頭照、email 等資訊)
3. 使用者透過 Google 認證伺服器的頁面做登入的動作(帳密、無密碼登入、人臉識別等等)
4. 在第三步成功的時候 Google 會跟使用者確認允許我們的書店使用我們在第二步所提到的要的資訊
5. 使用者確認允許之後，Google 會將使用者從 Google 的伺服器導回我們書店
   - 導回到哪裡就是我們在第二步在將使用者導去 Google 的時候帶過去的 Redirect URI(這會是在我們書店應用程式的伺服器的某個位置了)
   - Google 在導回這個 Redirect URI 的時候也會提供給書店應用程式一個認證碼
6. 接著我們的書店就可以透過這個認證碼去跟 Google 拿到一個 Access Token
7. 海闊天空了，我們透過這個 Access Token 就可以在使用者允許的範圍內，跟 Google 拿到我們需要的資料
   - 以上面的例子，我們要求要有權限可以拿到使用者名稱、大頭照、email
   - 走完上述的步驟，我們取得 Access Token 之後就可以去跟 Google 的伺服器要到上面這些資訊

[Google OAuth 文件](developers.google.com/identity/protocols/oauth2)

## NextAuth

前置作業，要去 Google Cloud Platform 註冊一個 App, 拿到對應的 client id & secret。
有了這個才能夠進行上面提到的 step 2, 有這個 id & secret 才能造訪 Google 的認證伺服器。

[NextAuth](next-auth.js.org) 是 Next.js 官方認證的一個 open source 處理解決方案，我們就用這個吧。
截至今日(2021/11/21)，看起來 v4 還在 beta, 因此，我們就來使用 v3 的 NextAuth。以後當 v4 成為正式的時候我們再升級到 v4。

```
npm install --save next-auth
```

另外的，我們把首頁做個小調整，/pages/index.js

```
return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppBarWithMenu />

      {!session && (
        <>
          <span>未登入</span>
        </>
      )}

      {session && (
        <>
          <span>已登入</span>
        </>
      )}
    </>
  );
```

上面的寫法是 react 常用的條件式渲染小技巧，然後現在的 react 可以透過 **<>** **</>** 來當作 fragment 使用，我個人是覺得程式碼比以前的 react 版本簡潔許多。

上面加的東西應該不難理解，我們透過檢查 session 是否存在，來認定現在有沒有登入，然後沒登入就顯示未登入，有登入的話就顯示已登入~XD
真的要當超級好國民的話，在做上面之前可以先做 test case, 但是我自己個人是覺得過頭了。

你可以稍微試驗一下，在你的程式裡面隨便設個

```
session = "something"
```

就可以看到已登入的字樣~XD
記得把這行 code 刪掉，這只是隨便測試的東西。

跟著他的文件，要在**pages/api/auth**裡面加上一個**[...nextauth].js**的檔案。
**NEXTAUTH_URL**, **SECRET**, **GOOGLE_ID**, **GOOGLE_SECRET**

接下來，我們把 UI 的 code 調整一下：

pages/index.js

```
{!session && (
    <>
        <span>未登入</span>
        <button onClick={() => signIn()}>登入</button>
    </>
)}

{session && (
    <>
        <strong>{session.user.email || session.user.name}</strong>
        <span>已登入</span>
        <button onClick={() => signOut()}>登出</button>
    </>
)}
```

可以看到多了個登出的按鈕，還有對應的 signOut 這個 onClick 的 callback 動作。

book-store.spec.js 我們還是調整一下。

```
describe("首頁測試", () => {
  before(() => {
    cy.visit("/");
    cy.waitForReact();
  });
  it("head 元素內應該要有對的 viewport 屬性", () => {
    cy.document();
    cy.get("head meta[name='viewport']").should(
      "have.attr",
      "content",
      "initial-scale=1, width=device-width"
    );
  });
  it("應該要有個 App Bar", () => {
    cy.react("AppBarWithMenu").should("to.exist");
  });
});
```

可以看到把共同的造訪網頁跟等待 react 元件渲染這個動作，放到 before 這個函式內，其他測試情境就比較單純的驗證實際情境要測的東西。
還有，App Bar 的 assertion 也改了一個比較直覺的描述。

現在我們能夠登入後，我們回頭來把登入的這些資訊跟功能整併到 AppBarWithMenu 這個元件中，不用再醜醜的放在網頁上。

index.js

```
<AppBarWithMenu session={session} />
```

AppBarWithMenu.js

```
import { signIn, signOut } from "next-auth/client";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
export default function AppBarWithMenu({ session })
```

我們把 signIn 還有 signOut 移到 AppBarWithMenu 去，並且換幾個 icon 看看感覺。

```
import React from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { signIn, signOut } from "next-auth/client";

export default function AppBarWithMenu({ session }) {
  const signInOrSignOut = session ? signOut : signIn;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="選單"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pheno 書店
          </Typography>
          <>
            <IconButton
              size="large"
              aria-label="登入的使用者"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => signInOrSignOut()}
            >
              {!session && <LoginIcon />}
              {session && <LogoutIcon />}
            </IconButton>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
```

## 章節總結

走到這邊，我們的網頁應用程式現在是一個有支援 Google OAuth 登入的 AppBar，並且在下面的內容區有個簡單文字描述現在是否登入(很快就要拿掉了)。

目前程式結果在 Chapters/Chapter-3-End, 這個可以算是 Material-NextAuth-Next 的 boilerplate。
