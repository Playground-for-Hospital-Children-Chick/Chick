# 병아리(병원 아이들을 위한 놀이터)

WebRTC를 활용한 비대면 놀이터

## 🚀프로젝트 소개

### 📅진행 일정
23.01.02(월) ~ 23.02.17(금) (총 7주)
- 기획 및 설계 : 01.02 ~ 01.20 (3주)
  - 기획 : 프로젝트 아이디어 논의, 주제 구체화, 기술 스택 선정
  - 설계 : 기능 요구 명세서 작성, ERD, 와이어프레임, 프로젝트 구조 설계, REST API 설계
- 개발 : 01.23 ~ 02.10 (3주)
  - API 구현
  - 프로젝트 주요 기능 구현
  - 배포 및 인프라 구축
- 테스트 및 유지보수 : 02.13 ~ 02.17 (1주)
  - 데모 서비스 시작
  - 통합 테스트
  - 오류 수정
  - 산출물 정리

## 🤝팀 소개

#### 🌈프론트엔드

| 이름 | 개발 내용 |
| ------ | ------------ |
|[👨🏻‍💻 최정온](https://github.com/choijeongon) [📧](mailto:chjo0330@gmail.com) | 팀장, 프론트 리더 <br /> React, Socket.io(client), WebRTC<br />웹사이트 전체 디자인 및 UI/UX 기획 <br /> 웹소켓 게임 기능 <br /> UCC <br />|
|[👨🏻‍💻 엄희원](https://github.com/eomtiger) [📧](mailto:eomtiger@gmail.com)   | React, WebRTC <br /> 게임방 페이지 구현 |
|[👨🏻‍💻 김민준](https://github.com/GotPrgmer) [📧](mailto:gofiction95@gmail.com) |React <br /> 마이 페이지, 로그인, 회원가입 및 회원 관리 페이지 구현|
#### 🛰벡엔드

| 이름 | 개발 내용 |
| ------ | ------------ |
|[👨🏻‍💻 한재욱](https://github.com/Jaeukhan) [📧](mailto:hju9707@gmail.com)        | Spring Boot REST API<br />Socket.io(server)<br /> 웹소켓 게임 기능 <br /> 젠킨스와 도커를 활용한 CI/CD
|[👨🏻‍💻 김주성](https://github.com/Sigmaflo) [📧](mailto:kjschocolate@gmail.com)   | Spring Boot REST API<br /> 자동 매칭 알고리즘 <br /> 젠킨스와 도커를 활용한 CI/CD|


### 🏁목표
주제, 기획의도에 충실한, 완성도 있는 프로젝트를 구현하여 무중단 배포까지 달성하기!!

### 🤔기획 의도
병원에 장기 입원하는 아이들이 웃게 할수 있는 비대면 놀이터 영상 플랫폼

#### 🎯서비스 대상
만 6 - 10세 아이들

#### 🎨UI/UX
아이들이 쉽게 조작할 수 있으며,
어린이들이 좋아하는 색상으로 디자인 하였음.

#### ⚙Technical

##### 📡프론트엔드
OpenVidu, AR로 얼굴 바꾸기

##### 📡벡엔드
자동 매칭 알고리즘, 그림판 소켓 통신

## 🛠기술 스택
![Architecture](/uploads/ded2e30cc1b0609813b2adcaeaf09345/Architecture.png)

- 세부내역
>구분|기술스택|상세내용|버전
>:--|:--|:--|:--
>공통|형상관리|GitLab|-
>&nbsp;|이슈관리|Jira|-
>&nbsp;|커뮤니케이션|Mattermost, Notion|-
>FrontEnd|HTML5|
>&nbsp;|CSS3|
>&nbsp;|JavaScript(ES6)|
>&nbsp;|styled-components|Tailwind|2.2.0
>&nbsp;|React|React|18.2.0
>&nbsp;|&nbsp;|Redux|8.0.5
>&nbsp;|&nbsp;|Redux-Toolkit|1.9.2
>&nbsp;|IDE|Visual Studio Code|1.75.1
>BackEnd|Java|OpenJDK|11.0.16
>&nbsp;|Build|Gradle|7.5.1
>&nbsp;|Spring|Boot|2.5.9
>&nbsp;|&nbsp;|Security|2.1.7
>&nbsp;|API Docs|Swagger2|2.9.2
>&nbsp;|DB|Mysql|8.0.32
>&nbsp;|&nbsp;|Spring-Data-jpa|2.1.10
>&nbsp;|WebRTC|OpenVidu|2.25.0
>&nbsp;|Socket|Nodejs|14.21.2
>&nbsp;|IDE|IntelliJ|22.3.1
>Server|AWS EC2|Ubuntu|20.04
>&nbsp;|배포|Docker|23.0.0
>&nbsp;|&nbsp;|Jenkins|2.375.2
>&nbsp;|WebServer|Nginx|1.23.3
>성능테스트|&nbsp;|Grafana|&nbsp;
>&nbsp;|&nbsp;|Prometheus|&nbsp;

### 📬배포 방법
>- [[링크 참조](/exec/1_2_TechStack.md)]

## 💼기획/설계

### 📑기능 요구 명세서

### 📑ERD
![ERD](/uploads/3afb539bde47f68677077f46033234c1/ERD.png)
<br>

### 🧩와이어프레임
![피그마](/uploads/18d6f520d99da3c38e92c09847917758/피그마.png)

피그마를 활용하여 작성함

처음 와이어프레임 기획단계에서는 웹 화면으로 구상하였으나, 피드백을 받고 테블릿 화면으로 전환함

<br>

## 🛰프로젝트 관리/운영

### 🛰프로젝트 디렉토리
| 🖼프론트엔드                                                  | 📡백엔드                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![프론트디렉토리구조](/uploads/d0f94b2c4ac0fb303dd1f8d38696de6d/프론트디렉토리구조.png) | ![벡엔드디렉토리구조](/uploads/de09769496e8629179fb9cd5706126c5/벡엔드디렉토리구조.png) |
<br>

### 📢Jira
![지라](/uploads/41d405c9e4fb9bf302c76dd9b2722482/지라.png)

<br>

### 🧾Notion
![노션](/uploads/37d6cd4d6ea352316af00de4ab61ac50/노션.png)

<br>

## 📱서비스 구현 내용

### 🕹주요 기능

#### 변신놀이
![변신놀이](/uploads/46dbc378201f2baabcbde3eadc923ff7/변신놀이.png)
<br>

#### 그림놀이
![그림놀이](/uploads/0dbb29d25163ecadfcb180a2ca94a02e/그림놀이.png)
<br>

#### 율동놀이
![율동놀이](/uploads/da4bb61823af638e30a6cb11c24304a0/율동놀이.png)
<br>

#### 만화보기
![만화](/uploads/d08ca4ccc03a21ba9104fa57c4a0af5a/만화.png)
<br>

#### 마이페이지
![마이페이지](/uploads/e1b61618d9db817b23af7f732b0dd0bb/마이페이지.png)
<br>

### 🧪데모 서비스 실행

서버의 안정성과 버그를 찾기 위해 프로젝트 배포를 하고 Prometheus 와 Grafana를 통해 로그를 추적함

![image](/uploads/47cafd88aa28dc687a2c85ca457e6a62/image.png)

- 배포 시작 3시간 경과 637번의 매칭 요청이 있었으며 403에러가 많이 발생하는 것을 확인
- 같은 세션에 4명을 넘는 사람이 동시 접속이 되어 코드 수정 후 재배포 하였음
- 에러를 해결함으로서 403에러가 줄어드는 것을 확인

<br>

## 😁프로젝트 회고

### 최정온
> > 이번 프로젝트에서의 목표는 열심히 팀원들과 즐겁게 프로젝트를 잘 마무리하는 것이었는데 목표한대로 이루어진것 같아 만족스럽습니다.
또한 후회가 남지 않을 정도로 최선을 다 해서 뿌듯합니다. 
아쉬었던점은 병원 섭외가 빠르게 이루어지지 않아서 아쉬웠고 애자일 방법론을 도입하였지만 
실제로는 프로젝트 진행 상황이 더디어서 제대로된 애자일을 하지 못한 것 같습니다.
또한 테스팅과 리팩토링도 꼼꼼하게 하지 못한 것 같아서 다음 프로젝트에서는 개인 실력을 늘리는데도 집중하고 싶습니다. 

<br>

### 엄희원
>너무 잘 하는 팀원들을 만나서 정말 재미있게 프로젝트를 진행했습니다. 처음엔 5명 팀이라 프로젝트를 완성할 수 있을까 하는 생각을 했지만 모두들 열심히 참여하고 서로 독려하여 잘 마무리했다고 생각합니다. 다른 팀원에 비해 제가 실력이 부족하다고 느꼈는데 조금 느려도 팀원들이 재촉하지 않고 끝까지 해낼 수 있게 도와줬습니다. 
모든 부분이 정말 좋았지만 제가 좀 더 실력을 늘려서 다음에 이 팀과 함께 프로젝트를 진행한다면 많은 도움이 되는 프로젝트를 진행하고 싶습니다.

<br>

### 김민준
> 처음에 든 생각은 아이디어는 좋다고 생각했지만 실제로 잘 구현할 수 있을지 
걱정이 많았습니다. 하지만 팀원들이 너무 잘 해주었고, 부족한 제가 헤메고 있을 때
인내심있게 기다려주어서 재밌고 행복하게 프로젝트 했던 것 같습니다.
또한 제가 로그인 회원가입 그 외 다른 기타 컴포넌트를 맡게 되었는데, jwt방식에 대해 제대로 공부한 것이
처음이었지만 끝까지 포기하지 않고 공부하고 팀원들에게 설명도 해주며 이해도가 올라갔던 것 같습니다.
이번 프로젝트에서 개발자는 혼자 열심히 공부하는 것도 중요하지만, 공부하는 행위도 팀원들을 잘 만나면
능률이 더욱 좋아진 다는 것을 깨달았습니다.
뿐 아니라, 후에 회사에서 백엔드 분야를 일하고 싶습니다. 하지만 프론트엔드를 맡게 되어 아쉽다는 생각을
처음에 하였지만, 프론트에서 로그인과 회원가입을 하면서 백엔드가 해주는 처리에 대해서 생각을 할 수 있는 기회였습니다.
특히 jwt방식에 대해서 백을 직접 구현하고 싶다는 생각을 하게 되었습니다. 특히 가장 매력적인 부분이 accessToken을 서버에 보내
만료됐는지 확인하고 만료되었다면 만료되었다고 신호를 그리고 클라이언트에서는 해당 신호를 받아 다시 서버에 accessToken과 refreshToken을 보내주어 accessToken을 재발급하게 되는 절차가 너무 매력적이었습니다.
또한 최신 보안에 대해서 알게 되었는데, 브라우저에 대한 기능중에서 같은 도메인인 쿠키만 가져오는 sameSite쿠키설정을 몰라서
일주일을 해메게 되었지만 현재는 꼭 필요한 시간이었다고 생각합니다.
다음 프로젝트때는 지금보다 훨씬 나은 개발실력과 소통을 잘하는 사람이 되겠습니다.

<br>

### 한재욱
> 길다고 생각했던 7주가 빠르게 지나갔습니다. 항상 열심히 하는 팀원분들 덕분에, 더 열심히 개발하게 된것 같네요. 배포와 nodejs를 이용한 소켓통신을 경험해 볼 수 있어 좋았습니다. 처음 해본 기술 스택이라 많은 어려움이 있었지만, 포기하지 않고 도전해서 데모서비스를 진행 했을 때 뿌듯했습니다. 7주간 프로젝트 하시느라 다들 고생하셨고, 남은 프로젝트도 화이팅 입니다☺


<br>

### 김주성
> 여러 사람들과 같이 하는 협업 프로젝트는 처음이기 때문에 긴장도 되고 걱정도 많았는데, 너무 좋은 팀원들을 만나서 7주가 짧게 느껴질 만큼 즐겁게 개발했습니다. 실제로 기획부터 개발까지 해보며 순탄히 흘러가기보다는 중간에 엎어지는 일도 생겼지만 든든한 팀원들과 함께하면서 큰 불안함 없이 진행할 수 있었습니다. 배울 점이 많았고 행복했던 7주였습니다.

<br>



