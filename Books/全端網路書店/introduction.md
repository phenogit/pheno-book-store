---
title: 前言
seoTitle: nextjs, 全端
seoDescription: 利用全端技術打造自己的網路書城
isFree: true
---

## 你會學到什麼?

在這本書裡，你將會從無到有寫出一個 JavaScript 的網頁應用程式(Web Application)。你將會學習到如何架構你的程式碼，並且在過程中透過 API 將整個應用程式的不同模塊給連接起來。

在瀏覽器(browser)端，你主要會學到的相關科技為：Next.js, React.js, Material-UI。
在伺服器(server)端，你主要會學到的相關科技為：Next.js, Node.js, Express.js, MongoDB 資料庫。

除了上述的技術之外，你也將學會如何跟以下的外部系統透過 API 介接：

- Google OAuth API
- Github API
- AWS SES API

在跟著這本書 coding 的同時，你也會接觸到許多網頁技術的概念，例如`session`, `cookie`, headers, HTTP request-response, middleware, `Promise`, `async/await`等。如果你想成為一個網頁工程師，這些概念都是不管使用哪個程式語言都應該要具備的知識。

## 這本書會實作什麼?

在這本書裡，你會跟著書本實作[Pheno 書城](https://pheno-book-store.vercel.app/)。這個網站本身就是由這本書的內容所描述建構出來的! 歡迎你在完成這本書的內容後，將成果為自己的履歷加分。你甚至可以以這個為基礎，販賣你自己的內容，甚或是增加屬於自己的功能(哈，可以做得漂亮點~XD)。

這個專案除了提供學習的目標以外，還有以下幾個主要的用途：

- 可以透過 Github 作為版控來撰寫跟管理文件
- 可以在線上販售書籍跟文章
- 把專案當作延伸為其他 SaaS(Software as a Service)的範本

這個專案的使用者將會有三個角色：**Public**, **Customer** 及 **Admin**。

- **Public** 角色可以看到所有書城上面被上架的書籍，並且可以看到書籍內被公開允許未購買前就可以免費閱讀的部分
- **Customer** 角色除了上述的權限外，額外有購買書籍，並且閱讀所購買的書籍的完整內容的權限
- **Admin** 角色除了包括上面的權限外，更有上架書籍(書籍內容是透過 Github 控管), 並且修改書籍內容的權限
