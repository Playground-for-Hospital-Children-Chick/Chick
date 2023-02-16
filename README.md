# 병아리(병원 아이들을 위한 놀이터)

WebRTC를 활용한 비대면 놀이터

## 프로젝트 소개

### 진행 일정
23.01.09(월) ~ 23.02.17(금) (총 6주)

### WBS
- Sub pjt1 - 기획; 프로젝트 아이디어 논의, 주제 구체화, 기능 요구 명세서 작성
- Sub pjt2 - 설계; ERD, 와이어프레임, 프로젝트 구조, 사용 기술 스택 선정
- Sub pjt3 - 개발; 기능 구현, 배포, 통합 테스트, UCC, 발표

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

##### 벡엔드

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


