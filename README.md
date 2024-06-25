# MovieMate

## 개요

MovieMate는 사용자가 영화 목록을 탐색하고, 리뷰를 작성하며, 실시간 채팅을 통해 영화에 대해 토론할 수 있는 웹 애플리케이션입니다. Supabase를 이용한 회원가입 및 로그인 기능, TMDb API를 통한 영화 데이터 연동 등 다양한 기능들이 포함되어 있습니다.

## 프로젝트 기간

- 6월 25일 ~ 7월 14일

## 이번 주 목표

- 영화 추천 사이트 MVP 완성

## 사용된 기술

- React: 프론트엔드 라이브러리
- Supabase: 백엔드 서비스 (인증 및 데이터베이스)
- TMDb API: 영화 데이터 제공

## 기능

- 회원가입 및 로그인
- 영화 목록 탐색
- 리뷰 작성
- 북마크 기능
- 영화 추천 설문 기능
- 사용자 프로필 관리

## 향후 계획

- 추가 기능 구현: 실시간 채팅, 알림 기능 (새로운 댓글, 리뷰 알림), 데이터 분석 및 시각화 (사용자 활동 통계) 등.
  문서화: 프로젝트의 자세한 문서화 진행

```
movie_mate
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 02
│  │  │  └─ d51aabc2e35f266b0d94f23b91ebf73bce79e5
│  │  ├─ 0d
│  │  │  └─ 6babeddbdbc9d9ac5bd4d57004229d22dbd864
│  │  ├─ 11
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 2b
│  │  │  └─ be4f6af41b7decc3b40eb77470c3775f9209cc
│  │  ├─ 2e
│  │  │  └─ 7af2b7f1a6f391da1631d93968a9d487ba977d
│  │  ├─ 3a
│  │  │  └─ fdd6e38438be7612befbd4b656af7bed27a31a
│  │  ├─ 3d
│  │  │  └─ 7150da80e43e3650342aa4758fa8b74e95d6d6
│  │  ├─ 55
│  │  │  └─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  ├─ 5a
│  │  │  └─ 33944a9b41b59a9cf06ee4bb5586c77510f06b
│  │  ├─ 61
│  │  │  └─ 4c86b487fa1bb02b80dcf725f9438d772f010a
│  │  ├─ 6c
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 94
│  │  │  ├─ a85ad532a8f22ad799fd147a450a087cfc80b1
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ b5
│  │  │  └─ c61c956711f981a41e95f7fcf0038436cfbb22
│  │  ├─ b6
│  │  │  └─ 62a274340c94c8049afeb78e406760f1254725
│  │  ├─ ce
│  │  │  └─ f412386e0d24e478ae267bd074f02391ae6835
│  │  ├─ d6
│  │  │  └─ c953795300e4256c76542d6bb0fe06f08b5ad6
│  │  ├─ d7
│  │  │  └─ 39292ae0143669e21b30df04a74b5baf985175
│  │  ├─ d8
│  │  │  └─ 2f1406c453826be5ad46618988a1067450e395
│  │  ├─ e4
│  │  │  └─ b78eae12304a075fa19675c4047061d6ab920d
│  │  ├─ e7
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ ea
│  │  │  └─ 9d0cd8255683d84f125948115daf1de0f06b1f
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ api.ts
│  │  ├─ auth.api.ts
│  │  └─ supabaseAPI.ts
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ index.ts
│  │  │  ├─ login
│  │  │  │  ├─ index.ts
│  │  │  │  └─ LoginForm.tsx
│  │  │  └─ signup
│  │  │     ├─ index.ts
│  │  │     └─ SignUpForm.tsx
│  │  ├─ common
│  │  ├─ index.ts
│  │  └─ shared
│  │     ├─ hooks
│  │     └─ utils
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ AuthPage
│  │  │  ├─ AuthPage.tsx
│  │  │  └─ index.ts
│  │  └─ index.ts
│  ├─ routers
│  │  └─ router.tsx
│  ├─ store
│  ├─ styles
│  ├─ types
│  │  └─ supabase.d.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```