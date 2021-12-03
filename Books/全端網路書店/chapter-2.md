---
title: 第二章-弄個能看的頁面
seoTitle: This is the title that Google shows on a search result.
seoDescription: This is the short description that Google shows on a search result.
excerpt: "This is a free excerpt of the chapter. To see the rest, you'll have to buy the book."
---

## Material-UI

```
npm install @mui/material @emotion/react @emotion/styled
```

```
import Button from "@mui/material/Button";

function IndexPage() {
  return <Button variant="contained">Hello World</Button>;
}

export default IndexPage;
```

現在我們要來逐步增加一些簡單的 UI 框架，因為我自己本人就不能說很有美感，透過一些簡單的 UI 框架，至少東西看起來乾乾凈凈。
我的習慣是我們先以完成為主軸，直到需要的時候再來重構。
這樣也比較符合一般開發的狀況，總是會漏考慮東西的。

### 響應式的 meta 標籤

Material UI 建議的是 <head> 這個標籤內有以下這個元素，用來確保響應式畫面的可靠性：

```
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

我來示範一下 TDD, TDD 基本概念是，先把測試情境寫出來，寫完後，由於產品還未實做此情境，因此測試會失敗，然後透過實作來讓測試通過。
依上面的例子來示範：

1. 我們先在 cypress 裡面寫一個測試，測試我們的網頁裡面存在

```
<head>
  <meta name="viewport" content="initial-scale=1, width=device-width" />
</head>
```

2. 這個測試寫完後，cypress test runner 會顯示"紅燈"，因為並沒有實作，所以網頁裡面並不會有上面的元素
3. 實作 => 也就是實作讓網頁裡面實際有這個 meta 元素
4. cypress 變綠燈
5. 我們成為好國民，這項情境以後都有測試可以驗證，也透過測試程式知道這個需求是我們網頁應用程式的一個特色

我們一步步來

Step 1

```
describe("Head 元素測試", () => {
  it("應該要有對的 viewport 元素", () => {
    cy.visit("http://localhost:3000");
    cy.document();
    cy.get("head meta[name='viewport']").should(
      "have.attr",
      "content",
      "initial-scale=1, width=device-width"
    );
  });
});
```

Step 2
紅燈!

Step 3
網頁加上這個 head
使用 next/head

```
import Head from "next/head";

import Button from "@mui/material/Button";

function IndexPage() {
  return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Button variant="contained">Hello World</Button>;
    </>
  );
}

export default IndexPage;
```

我們走到這邊，Material UI 的東西可以適當的引用進我們專案了，接下來我們退一步，來想一下我們的網頁應用程式到底接著應該做什麼呢？
我想，第一步應該是先給這個應用程式一個簡單的 App Bar。

先來加個 App Bar 的 test case。
我發現我們每次都在呼叫**cy.visit("http://localhost:3000")**
Copy Paste 三次，該重構了，這是我喜歡的格言。

```
{
    "baseUrl": "http://localhost:3000"
}
```

```
cy.visit(/); //cy.visit("http://localhost:3000)
```

[Cypress 選擇元素的 best practice](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)
用 data-\* 屬性來記錄你要 test 的東西

Hello World test case 可以拿掉了，我們長大了~

```
describe("首頁測試", () => {
  it("應該要有個 App Bar", () => {
    cy.visit("/");
    cy.get("[data-cy=appBar]").contains("Pheno 書店");
  });
});
```

```
<div data-cy="appBar">Pheno 書店</div>
```

綠燈! 但是到這邊我不會太拘泥 TDD 了，因為我們證明了 test runner 可以把 data-cy="appBar" 屬性的元素抓出來，我會認定接下來只要實作出一個 AppBar 元件，cypress 確認有真的在網頁上被抓得到，這樣就已經很妥當了。

不過接著我們碰到一個問題，上面寫到的 data-cy 屬性，在網頁的 dom 元素上會出現，但是我們 UI 都是由 react 元件組成，這樣使用測試會有點麻煩，我接下來的目標是要讓 cypress 的測試可以抓取 React 元件，而不是抓取實際的 dom 元素。

我們用個實例說明現在的問題是什麼。

我們先做一個 React Component, 放在 ~/components/Test.js (我們 React component 以後都會放在這邊)。

```
import React from "react";

export default function Test() {
  return <div>Pheno 書店</div>;
}
```

然後在 ~/pages/index.js 裡面引用這個 Test 元件，並且帶入 data-cy="appBar"

```
export default function IndexPage() {
  return (
    <>
      <Head>
        <title>書店首頁</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Test data-cy="appBar" />
    </>
  );
}
```

紅燈!
code 看起來很像，但是最主要的差別是，這時候 data-cy 雖然看起來是一個元素的屬性，但是實際上，他被 react 給當作是一個 react prop 而不是 DOM 實際元素的屬性。

因此，我這邊為了當個好國民，我要想辦法讓 cypress 可以抓到我指定的 react 元件，

```
npm install cypress-react-selector --save-dev
```

cypress/support/index.js

```
import "cypress-react-selector";
```

```
describe("首頁測試", () => {
  it("應該要有個 App Bar", () => {
    cy.visit("/");
    //cy.get("[data-cy=appBar]").contains("Pheno 書店");
    cy.waitForReact();
    cy.react("Test").contains("Pheno");
  });
});
```

綠燈 again!

有了這個我們接下來就可以透過 select React 元件來指定 cypress 要確認存在的東西。

接下來，我們就可以實作 App Bar 了。

實作 App Bar 就是 Material-UI 進來幫忙的地方了。要自己實作這些 UI 元件相當累人，而且多半做得很醜~XD
我們盡量的一步步的走一遍，應該可以看到使用 Material-UI 的基本方式。
[App Bar 介紹](mui.com/components/app-bar/)

我看起來 App Bar with Menu 給我感覺最適合，所以我們來抄抄他們吧。

好國民，來個 App Bar test case, 然後接下來 Test 元件相關東西(test case, 還有 components/Test.js)可以刪掉了。

```
describe("首頁測試", () => {
  /* 這個可以刪掉了，我們要真的做 App Bar 了
  it("抓得到 Test 元件", () => {
    cy.visit("/");
    cy.waitForReact();
    cy.react("Test").should("have.length", "1");
  });
  */
  it("應該要有個 App Bar", () => {
    cy.visit("/");
    cy.waitForReact();
    cy.react("AppBarWithMenu").should("have.length", "1");
  });
});
```

App Bar 我們跟著範例一步步來吧。

```
import React from "react";
import { Box, AppBar } from "@mui/material";

export default function AppBarWithMenu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">something</AppBar>
    </Box>
  );
}
```

加個 Toolbar

```
import React from "react";
import { Box, AppBar, Toolbar } from "@mui/material";

export default function AppBarWithMenu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
    </Box>
  );
}
```

```
npm install @mui/icons-material
```

我們先把範例中互動類的部分先拿掉，不過我們有一天會回來加上使用者互動的部分的。

```
import React from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function AppBarWithMenu() {
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
          <div>
            <IconButton
              size="large"
              aria-label="登入的使用者"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

```

## 章節總結

走到這邊，我們成功地把一個 Material-UI 的框架給裝到我們的 Next.js 網頁應用程式上了。Material-UI 有很多的 UI 元件可以用，我們現在只是稍微接觸而已。
另外的，我們將 Cypress 擴增到可以支援 React 元件的測試，以現在前端的開發方式，不太會直接去碰觸原生的 DOM 元素，所以這個擴充會讓我們比較實際的測試我們所寫的程式。

目前程式結果在 Chapters/Chapter-2-End, 某種程度上這個可以算是一個 Material-Next 的 boilerplate。
