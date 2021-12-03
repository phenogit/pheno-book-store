---
title: 第一章-準備開發環境
seoTitle: This is the title that Google shows on a search result.
seoDescription: This is the short description that Google shows on a search result.
excerpt: "This is a free excerpt of the chapter. To see the rest, you'll have to buy the book."
---

我們整個專案會是藉由 Next.js 這個框架來串聯起整個應用程式，所謂的串聯，指的是，透過 Next.js 這個框架來把前端, 後端, 雲端等各個子系統給整合起來，這些觀念我們會不斷地在本書中重複強調。就讓我們一步一步開始吧。

## Node.js

而 Next.js 這個底層則是建立在 Node.js 這個熱門的 JavaScript 執行環境之下，所以我們首先的步驟就是要在自己的電腦上安裝 Node.js(這應該就是你唯一需要獨立安裝的東西了)。

我強力建議使用 Node Version Manager 來安裝 Node, 這個管理程式可以協助你在需要在電腦上面使用不同 Node 版本的時候，無痛的自由切換不同的 Node 版本。

## 第一版 package.json

Node.js 程式的一切根本就在於 package.json 這個檔案，這個檔案會被放在專案的根目錄裡。

在你專案的根目錄(目前應該是赤裸裸空的)，我們現在就來一步步地建立我們的專案。

`npm init` => 把東西填一填

`npm init` 之後，Node 就會在你的專案資料夾裡產生出我上面說的 package.json 檔了。

```
{
  "name": "pheno-book-store",
  "version": "1.0.0",
  "description": "這是我個人書店商城的 code",
  "main": "index.js"
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/phenogit/pheno-book-store.git"
  },
  "keywords": [
    "bookstore",
    "nextjs",
    "full-stack"
  ],
  "author": "Pheno Huang",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/phenogit/pheno-book-store/issues"
  },
  "homepage": "https://github.com/phenogit/pheno-book-store#readme"
}
```

可以拿掉 `"main": "index.js"` 這個屬性拿掉，因為我們接下來會仰賴 Next.js 的框架。
也是可以透過 `npx create-next-app` 這個工具，但是我希望從最根本的部分帶大家走一遍。

這是個最陽春的版本，我們接下來把 Next.js 這個框架加進專案。

## 加上 next/react/react-dom 相依套件

接著在這個目錄下跑 **npm install next react react-dom**

```
"dependencies": {
    "next": "^12.0.4",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
}
```

這時候我們的專案有三個相依的專案：next(也就是 Next.js), react(react.js), 及 react-dom(react.js 用來操作網頁物件的 package)

**npm**除了進行 package 的管控之外，另外一個額外的功能就是可以執行腳本，在你的 package.json 裡面加入下面這個 script:

```
"scripts": {
    "dev": "next dev",
},
```

這時候你在專案根目錄下執行 **npm run dev** 就會被轉換成執行 **next dev** 這個腳本 => 而這個代表的則是會把 next 這個框架給運作起來。
不過你目前跑 **next dev** 會出錯，原因很簡單，因為雖然已經有框架了，但是這個框架需要有一些指定的檔案才知道要做什麼事情(最簡單的例子就是要指定網頁長什麼樣子，這樣 Next 跑起來才知道在伺服器端需要提供什麼資料給客戶端使用)

Next.js 的架構是依照資料夾與檔案名稱的架構來協助網站路由的設定。用實作說明應該是最簡單明瞭的。在根目錄下建立一個 **pages/index.js** 檔案，然後檔案內容輸入：

```
function IndexPage() {
  return <div>Hello World</div>;
}

export default IndexPage;
```

index.js 上面這個內容是一個最簡單的 functional react component，而 Next.js 所謂的依照資料夾結構來設定路由，代表的是他在 {server_url}/ 這個路由會將上面這個 react 元件給回傳給客戶端。

再跑一次 **npm run dev** => 然後到 **http://localhost:3000**，你應該可以看到一個 hello world 了! Next.js 另外支援的一個功能是熱更新，如果你現在把 index.js 這個檔案內的文字隨意改一下，它會立刻反應在網頁上。

## Cypress

我們遵照點好的開發習慣，不完全的用 TDD(Test-Driven Development)，但是還是要適當地加上測試，這樣我隨著每個章節作改動，都可以確保我已經要有的行為還正確。
我決定使用 [cypress](https://cypress.io) 這個套件來幫忙。透過寫測試案例，我們也可以在某個程度上定義出我們寫的網頁應用程式的規格。

```
npm install cypress --save-dev
```

scripts 裡面加上一個讓開啟 cypress 比較方便的腳本：

```
"scripts": {
  "cypress:open": "cypress open"
}
```

這時候在 terminal 裡面跑：

```
npm run cypress:open
```

就會把 cypress 的測試執行程式(test-runner)給打開了。
我們走極簡風，把目前 test-runner 裡面的檔案都刪掉吧~

在 test-runner 裡面加一個 **book-store.spec.js** 檔案(它會位於你 /cypress/integration 這個目錄之下)。
如果你這時候在 test-runner 上面點擊這個 **book-store.spec.js** 檔案，cypress 就會嘗試進行這個檔案內的測試案例，你可以試試，不過因為我們什麼都還沒寫，很正常的，會顯示沒有任何測試。

## 寫一個簡單的測試

題外話一下，一個好的測試基本上包含以下幾個大步驟：

1. 將應用程式設定到適合的起始狀態
2. 做某個測試動作
3. 確認應用程式結束狀態是否如預期

在我們的應用程式裡，我們先用以下的方式跟上面的步驟對應：

1. 造訪網站(這就是我們目前的起始狀態，以後則會有造訪不同頁面，還有是否已登入等分支)
2. 確認某 html 元素(element) 是否存在
3. 確認頁面上的內容是否跟我們預期相同

```
describe("第一個測試", () => {
  it("首頁會顯示 Hello World", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Hello World");
  });
});
```

這時候跑 test-runner 會看到成功。我們作為好國民，應該在一些功能完成的時候將對應的測試程式補上，這樣以後要改版就輕鬆安全多了。

## 章節總結

進行到這裡，你的專案內容應該是如同 **~/Chapters/Chapter-1-End**，可以比對一下看看有沒有一致。

我們在這章做了幾件事：

1. 從根目錄下利用 **npm init** 建立專案
2. 利用 **npm install** 將 Next.js 這個相依性給加入專案(其中也加了 react 及 react-dom)
3. 快速地介紹了 **package.json** 裡面可以利用 "scripts" 屬性設定執行腳本
4. 在專案根目錄下加上 **~/pages/index.js**，Next.js 會透過 **~/pages/** 這個資料夾下的檔案來對應實際網頁應用程式的各個路由
5. 用 react 的 functional component 快速地寫了一個 Hello World 頁面
6. 用 **npm run dev** 將伺服器架起來 => 連過去就可以看到 Hello World 了
7. 額外安裝了 cypress 這個套件，我們當個會定期測試的好公民
8. 寫了一個檢查 Hello World 是否存在的第一個測試程式

到這邊，我想是第一章合適的收尾處。我們現在有個可執行的 Next.js 框架，瀏覽器可以連到我們的伺服器，還有一個測試框架可以讓我們確認開發的時候不會造成本來的行為被改變。

讓我們繼續吧。
