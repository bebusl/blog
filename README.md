# BLOG

- [배포 링크](http://brillbe.com:8080)
  - 테스트 계정
      - id : test@test.com , pw : test 
- 목표
    1. graphql 을 사용해볼 것
    2. github-action을 통해 서버 배포를 자동화 해볼 것
    3. webpack, babel 설정을 직접 해볼 것

## 💬 원하는 태그의 포스트를 묶어서 보세요,  BLOG

> markdown 형식으로 글을 작성합니다. 글에는 태그를 지정할 수 있고, 나중에 특정 태그를 묶어서 ‘카테고리’화 할 수 있습니다.
여러 태그의 글을 묶어서 보고싶을 때 카테고리를 생성하면 됩니다.
단 개인이 글을 쓰기 위한 용도로, 댓글 외에 다른 커뮤니티 기능은 지원하지 않습니다.
> 
- 주요 기능 소개
    - 카테고리 생성 기능
    - 글쓰기 및 글 보기
      - 목차 생성

## 🖥️ 샘플
![블로그](https://user-images.githubusercontent.com/49019236/223942245-11b14339-62a4-4b08-a98f-121a29494560.gif)



## 🛠️ 기술스택

**FrontEnd**

- graphql, apollo-client, axios, webpack, typescript, react, redux, styled-components

**BackEnd**

- graphql, apollo-server, mongodb, Spring boot

**Deploy**

- [BACKEND] : Jenkins, AWS(Elastic Load Balancing, Route 53, Certificate Manager, EC2)
- [FRONTEND] : Raspberrypi 4, github actions, ssh, scp, nginx

---

## 🗞️ api설계

**Login 기능(관리자** **로그인만** **되면** **됨!)**

`Query  login`

- 성공 시 토큰 아이디만 반환(jwt, id:String)
- 실패 시 “Null” | msg=”실패” return

**Logout 기능**

`Query logout`

- 성공 시 토큰 제거.
- 실패 시 “Null” | msg=”실패” return

**글** **등록** **기능**

`Mutation post(title:String!, tag:[String]!, content: String)`

- 제목, 태그 저장
- markdown 형식으로 쓰인 글
- 파일 첨부(썸네일)가 가능해야 함.
- 날짜 저장 필수 => 요청 받은 시각

**글** **리스트** **보기** **기능(페이지네이션** **필요)**

`Query post-list(tag:[String]!)`

- 최신 순으로 10개씩 제공
- Filter에 조건있으면 넣어줄 것.
- Return 썸네일 이미지(any)/제목(title,String)/태그(tags,[String])/글 내용 일부(1~2줄)(content, String) 가져와야 함

**글** **보기** **기능**

`Query post(id : String)`

- 제목(title, String), 태그(tags, [String]), content(String) , file(any), 날짜 반환(Date or Int ex.20211225)

**태그** **카테고리** **관리**

- 글 쓸 때 단 태그의 카테고리를 설정할 수 있음(mutation)

`Mutation category(category:String, tags:[String]!) 성공 여부만 반환.(boolean)`

- 글1 => 태그(자바스크립트) 글2=>태그(c++) 글3=>태그(자바스크립트, 리액트)

카테고리1. 웹 : 자바스크립트, 리액트

카테고리2. 언어 : c++

- 각 카테고리, 태그 별로 몇 개의 포스팅이 있는지 반환

`Query category(category:[string], tags:[string])`

Return {카테고리 이름: 포스트개수(Int),{속한 태그 이름: 포스트개수(int), 속한 태그 이름2 : 포스트개수(int)}

- 카테고리 혹은 태그 선택 시 해당 태그를 가진 포스트만 불러오는 기능.

`Query category-post(category:string, tag:string) , default는 모든 카테고리의 내용 다 반환,`

만약 category parmeter값을 줬다면, 해당 카테고리에 속하는 내용만!

- Return값은 포스트별 제목, 태그, content 날짜 반환

## 📂 프로젝트 구조

```
🗂 blog
├── index.css
├── index.html
├── index.tsx
├── package-lock.json
├── package.json
├── public/
│   └── images/
│       ├── favicon/
│       └── test.png
├── src/
│   ├── App.tsx
│   ├── components/ # 컴포넌트
│   │   ├── FlexBox.tsx
│   │   ├── IconButton.tsx
│   │   └── MarkdownViewer.tsx
│   ├── hooks/ # 공유하는 커스텀 훅
│   │   ├── useInput.ts
│   │   └── usePosts.ts
│   ├── layouts/ # 레이아웃 관련 컴포넌트
│   │   ├── DefaultContainer.tsx
│   │   ├── TopNav.tsx
│   │   └── SideNav.tsx
│   ├── pages/ # 페이지들
│   │   ├── Admin/
│   │   ├── Login/
│   │   ├── Main/
│   │   ├── Read/
│   │   ├── Test/
│   │   └── Writing/
│   ├── routes/ # 기본 라우트
│   │   └── defaultRoutes.tsx
│   ├── shared/ # 공유하는 컴포넌트
│   │   ├── List.tsx
│   │   ├── Modal.tsx
│   │   ├── global-style.ts
│   │   └── styled.d.ts
│   ├── store/ # Redux 관련 
│   │   ├── authReducer.tsx
│   │   ├── hooks.tsx
│   │   └── store.tsx
│   └── utils/ # utility 함수들
│       ├── fetch.tsx
│       ├── setCookie.ts
│       └── validator.ts
├── tsconfig-for-webpack-config.json ## 아래는 타입스크립트, 웹팩 설정파일
├── tsconfig.json
└── webpack.config.ts
```

## ⬇️ 설치 방법 / 실행 방법

```bash
git clone https://github.com/bebusl/blog.git
cd blog
npm i
npm start
```

## 🕶️ Contributors

| [이진희](https://github.com/salangdung-ibebusl) | [윤정환](https://github.com/dungbik) |
| --- | --- |
| *프론트엔드 | *백엔드 전반 |
