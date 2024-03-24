<div align="center">
<img src="https://github.com/likelion-6team/HanNuNet-front/assets/76903801/daa271a8-7cf5-4348-b445-7a227a14a460.png"  width="500" height="300"/>
</div>

## HanNuNet(한누넷) https://hannunet.pages.dev/
- 중고나라, 당근마켓, 번개장터를 한눈에 볼 수 있습니다.

## 배포 
   - frontend : cloudflare page
   - backend : PythonAnywhere
   - chatbot : AWS Lambda

## Skills
- frontend : react, typescript, reactquery
- chatBot : node.js
  
## Setup
   #### 프로젝트를 클론:
```
git clone [GITHUB_URL]
```
   #### 디펜던시 설치:
- yarn 
```
yarn
```
- npm
```
npm install
```
  


## [Git] Commit Message Convention

- Feat	새로운 기능을 추가

- Fix	버그 수정

- Design	CSS 등 사용자 UI 디자인 변경

- Style	코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우

- Refactor	프로덕션 코드 리팩토링

- Comment	필요한 주석 추가 및 변경

- Docs	문서 수정

- Test	테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음

- Chore	빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음

- Rename	파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우

- Remove	파일을 삭제하는 작업만 수행한 경우

- !BREAKING CHANGE	커다란 API 변경의 경우

- !HOTFIX	급하게 치명적인 버그를 고쳐야하는 경우



## Home
<img width="1494" alt="스크린샷 2023-08-19 오후 11 49 46" src="https://github.com/likelion-6team/HanNuNet-front/assets/76903801/6dd40ad6-fc1c-41a7-abb5-85d8b177882f">

#### 인기 상품들과 검색 창입니다.

---

<img width="379" alt="스크린샷 2023-08-19 오후 11 50 16" src="https://github.com/likelion-6team/HanNuNet-front/assets/76903801/dcd6363b-cadc-4548-8109-563512cc012f">

#### 자신에게 맞는 전자기기를 챗봇이 추천해 줍니다.

---

## Search
<img width="1236" alt="스크린샷 2023-08-19 오후 11 50 50" src="https://github.com/likelion-6team/HanNuNet-front/assets/76903801/5287fcdb-8fff-46db-87a0-3aa599777eab">

#### 검색 시 당근마켓, 중고나라, 번개장터의 게시글을 볼 수 있습니다. 각 사이트마다의 물품만을 볼 수도 있습니다. 가격순으로 정렬 할 수 있습니다.

<img width="807" alt="스크린샷 2023-08-19 오후 11 51 02" src="https://github.com/likelion-6team/HanNuNet-front/assets/76903801/6c92136a-6fd6-4079-bf08-f974b8b05cc7">

#### 원하는 가격으로 필터링을 할 수 있습니다. 원하는 가격안에 있는 중고 상품들의 평균가를 알 수 있습니다.

#### react query의 select 옵션을 사용해 필터링을 구현하였습니다.
```
 select: (data: totalDataType) => {
        //시간순 정렬
        data?.data?.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        //가격순 정렬
        data?.data?.sort(
          priceSortFilterValue === "lowToHigh"
            ? (a, b) => a.price - b.price
            : (a, b) => b.price - a.price
        );

        let newData = { ...data };
        newData.data = newData.data?.filter((i) => selectedSiteFiltering(i));
        newData.data = newData.data?.filter(
          (i) => i.price > minFilterValue && i.price < maxFilterValue
        );
        return newData;
      },
```

