# 병아리(병원 아이들을 위한 놀이터)

WebRTC를 활용한 비대면 놀이터

## 프로젝트 소개

### 진행 일정
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

### 팀
최정온 엄희원 김민준 한재욱 김주성

### 목표
주제, 기획의도에 충실한, 완성도 있는 프로젝트를 구현하여 무중단 배포까지 달성하기!!

### 기획 의도
병원에 장기 입원하는 아이들이 웃게 할수 있는 비대면 놀이터 영상 플랫폼

#### 서비스 대상
만 6- 10세 아이들

#### UI/UX
아이들이 쉽게 조작할 수 있게 간편하게 디자인하고,
색상도 어린이 플랫폼과 가까운 방향으로 구성하였음

#### Technical

##### 프론트엔드
OpenVidu, AR로 얼굴 바꾸기

##### 벡엔드
자동 매칭 알고리즘, 그림판 소켓 통신

## 기술 스택
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

### 배포 방법
>- [[링크 참조](/exec/1_2_TechStack.md)]

## 기획/설계

### 기능 요구 명세서

### ERD

### 와이어프레임

피그마를 활용하여 작성함

처음 와이어프레임 기획단계에서는 웹 화면으로 구상하였으나, 피드백을 받고 테블릿 화면으로 전환함

<br>

### 서비스 플로우 차트

## 프로젝트 관리/운영

### 프로젝트 디렉토리

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

### 데모 서비스 실행

서버의 안정성과 버그를 찾기 위해 프로젝트 배포를 하고 Prometheus 와 Grafana를 통해 로그를 추적함

![image](/uploads/47cafd88aa28dc687a2c85ca457e6a62/image.png)

- 배포 시작 3시간 경과 637번의 매칭 요청이 있었으며 403에러가 많이 발생하는 것을 확인
- 같은 세션에 4명을 넘는 사람이 동시 접속이 되어 코드 수정 후 재배포 하였음
- 에러를 해결함으로서 403에러가 줄어드는 것을 확인

<br>

## 😁프로젝트 회고

### 최정온
>

<br>

### 엄희원
>

<br>

### 김민준
>

<br>

### 한재욱
>

<br>

### 김주성
>

<br>



