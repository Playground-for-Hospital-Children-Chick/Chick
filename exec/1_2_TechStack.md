### Port Number

> 각각의 구성요소는 Docker container 로 격리하였습니다
> Port|이름
> :--|:--
> 80|HTTP => 443(HTTPS)로 리다이렉트
> 443|HTTPS
> 3000|React, Nginx Docker Container
> 3306|Mysql Docker Container
> 8001|nodejs
> 8081|Jenkins Docker Container
> 8443|Openvidu Docker Container
> 9000|SpringBoot Docker Container
> 9009|Grafana Docker Container
> 9090|Prometheus Docker Container

### ssl 인증서 발급

> - nginx 설치
>
> ```
> sudo apt-get install nginx
> ```
>
> - letsencrypt 설치
>
> ```
> sudo apt-get install letsencrypt
>
> sudo systemctl stop nginx
>
> sudo letsencrypt certonly --standalone -d 도메인
>
> # 발급 경로
> cd /etc/letsencrypt/live/도메인/
> # 발급 확인
> ls
> ```

### How To Run in Local

> - Frontend
>
> ```
> npm install
>
> npm run dev
> ```
>
> - Backend
>   > - 사용하는 IDE 로 import 후 src/main/java/com/ssafy/api BackendApplication.java 실행

### How To Run in EC2

> - 개요
>   > - 병아리 서비스는 Jenkins 를 이용한 CI/CD 자동화 환경으로 구성하여 팀 구성원 각자 작성한 코드를 Gitlab 에 푸쉬하면 Webhook 을 통해 Jenkins 의 Pipeline Script 에 작성한 대로 CI/CD 흐름이 진행됩니다

> - EC2 배포 환경 구성 순서
>   > 1. ufw (uncomplicated firewall) 방화벽 포트 개방
>   > 2. Docker 설치
>   > 3. Openvidu 설치, 설정, Openvidu ssl 발급
>   > 4. Jenkins 도커 이미지 설치 및 컨테이너 실행 및 설정
>   > 5. Mysql 도커 이미지 설치 및 컨테이너 실행 및 설정
>   > 6. frontend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>   > 7. backend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>   > 8. Nginx 설치 및 설정
> - ### ufw (uncomplicated firewall) 방화벽 포트 개방
>
> ```
> # ufw 명령 도움말
> sudo ufw -help
>
> # ufw 상태 확인
> sudo ufw status
>
> # ufw 포트 허용
> sudo ufw allow portnumber
> ```
>
> - Docker 설치
>
> ```
> # 도커 공식 GPG key를 생성
> sudo apt-get update
>
> sudo apt-get install \
> ca-certificates \
>    curl \
>    gnupg \
>    lsb-release
> ```
>
> ```
> # 키저장소 추가
> sudo mkdir -p /etc/apt/keyrings
>
> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | <\>sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
>
> echo \
>  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/>keyrings/docker.gpg] https://download.docker.com/linux/ubuntu\
> $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
> ```
>
> ```
> # 도커 패키지 설치
> sudo apt-get update
>
> $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
>
> ```
>
> - Openvidu 설치, 설정, Openvidu ssl 발급
>   > - https://docs.openvidu.io/en/stable/deployment/ce/on-premises/ 공식 문서를 참고하여 진행
> - Jenkins 도커 이미지 설치 및 컨테이너 실행 및 설정
>
> ```
> # jenkins 이미지 가져오기
> docker pull jenkins/jenkins:lts
>
> # jenkins 컨테이너 실행
> docker run --name jenkins-docker -d -p 8889:8080 -p 50000:50000 -v /home/opendocs/jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -u root jenkins/jenkins:lts
> ```
>
> - Mysql 도커 이미지 설치 및 컨테이너 실행 및 설정
>
> ```
> # mysql 이미지 가져오기
> docker pull mysql
>
> # mysql 컨테이너 실행
> docker run -d -p 3306:3306 mysql [옵션은 자유롭게]
> ```
>
> - frontend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>
> ```
> # git repo 가져오기
> git pull [주소]
>
> # React 빌드
> npm install -g yarn
> yarn install
> yarn build
>
> # Docker 이미지 생성
> docker build [이미지 이름]
>
> # Docker Container 실행
> docker run -d [이미지 이름]
> ```
>
> - backend 폴더의 Dockerfile 을 이용하여 도커 이미지 생성 및 컨테이너 실행
>
> ```
> # git repo 가져오기
> git pull [주소]
>
> # SpringBoot 빌드
> gradlew build
>
> # SpringBoot 이미지 생성
> docker build [이미지 이름]
>
> # Docker Container 실행
> docker run -d [이미지 이름]
> ```
>
> - Nginx 설치 및 설정
>
> ```
> # Nginx 설치
> sudo apt-get install nginx
> ```
>
> - ec2 nginx
>
> ```conf
> # /etc/nginx/sites-available/test.conf
> server {
>        location /{
>                proxy_pass http://localhost:3000;
>        }
>
>        location /api {
>                proxy_pass http://localhost:9000;
>        }
>        location /socket.io {
>                proxy_pass http://localhost:8001;
>        }
>
>        location /actuator/prometheus {
>                proxy_pass http://localhost:9000;
>        }
>
>       listen 443 ssl; # managed by Certbot
>       ssl_certificate /etc/letsencrypt/live/i8b207.p.ssafy.io/fullchain.pem;
>       # managed by Certbot
>       ssl_certificate_key /etc/letsencrypt/live/i8b207.p.ssafy.io/privkey.pem; # managed by Certbot
> }
>
> server {
>    if ($host = i8b207.p.ssafy.io) {
>        return 301 https://$host$request_uri;
>    } # managed by Certbot
>
>        listen 80;
>        server_name i8b207.p.ssafy.io;
>    return 404; # managed by Certbot
> }
> ```
>
> - jenkins frontend pipeline
>
> ```pipeline
> pipeline {
>    agent any
>    tools {
>       nodejs "nodejs"
>    }
>    stages {
>        stage('Pull') {
>            steps {
> 				script{
> 				  git branch: 'front-end', credentialsId: 'jaeuk', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207'
> 				}
>            }
>        }
>        stage('React Build') {
>          steps {
>            script {
>              script {
>                sh 'npm install -g yarn'
>                sh 'yarn --cwd ./frontend install --network-timeout 100000'
>                sh 'yarn --cwd ./frontend build'
>              }
>            }
>          }
>        }
>
>        stage('Build') {
>          steps {
>            script {
>              sh 'docker build -t basepage/nginx ./frontend/'
>            }
>          }
>        }
>           stage('Deploy') {
>            steps {
>              script {
>                sh 'docker stop nginx'
>                sh 'docker rm nginx'
>                sh 'docker run -d --name nginx -p 3000:80 -u root basepage/nginx'
>              }
>           }
>       }
>    }
> }
> ```
>
> - jenkins backend pipeline
>
> ```pipeline
> pipeline {
>   agent any
>   tools {
>       gradle "gradle7.6"
>   }
>    stages {
>        stage('Pull') {
>            steps {
> 				script{
> 				  git branch: 'back-end', credentialsId: 'jaeuk', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207'
> 				 }
>            }
>        }
>         stage('React Build') {
>           steps {
>               script {
>                   dir('backend') {
>                       sh 'chmod +x ./gradlew'
>                       sh './gradlew build'
>                   }
>               }
>           }
>        }
>
>        stage('Build') {
>          steps {
>            script {
>              sh 'docker build -t basepage/nginx ./frontend/'
>            }
>          }
>        }
>        stage('Deploy') {
>            steps {
>              script {
>                sh 'docker stop nginx'
>                sh 'docker rm nginx'
>                sh 'docker run -d --name nginx -p 3000:80 -u root basepage/nginx'
>             }
>           }
>       }
>    }
> }
> ```
>
> - Frontend
>   > - DockerFile
>
> ```dockerfile
> ## Dockerfile(client)
> # nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
> FROM nginx:latest
> # root 에 app 폴더를 생성
> RUN mkdir /app
> # work dir 고정
> WORKDIR /app
> # work dir 에 dist 폴더 생성 /app/dist
> RUN mkdir ./dist
> # host pc의 현재경로의 dist 폴더를 workdir 의 dist 폴더로 복사
> ADD ./dist ./dist
> # nginx 의 default.conf 를 삭제
> RUN rm /etc/nginx/conf.d/default.conf
> # host pc 의 default.conf 를 아래 경로에 복사
> COPY ./nginx.conf /etc/nginx/conf.d
> # 80 포트 오픈
> EXPOSE 80
> # container 실행 시 자동으로 실행할 command. nginx 시작함
> CMD ["nginx", "-g", "daemon off;"]
> ```
>
> > - nginx.conf
> >
> > ```conf
> > server {
> >    listen       80;
> >    listen  [::]:80;
> >    server_name  i8b207.p.ssafy.io;
> >
> >    location / {
> >        root    /app/dist;
> >        index   index.html;
> >        try_files $uri $uri/ /index.html;
> >    }
> > }
> > ```
>
> - Backend DockerFile
>   > - DockerFile
>   >
>   > ```Dockerfile
>   > FROM    openjdk:11
>   > ARG     JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
>   > COPY    ${JAR_FILE} app.jar
>   > ENTRYPOINT ["java", "-jar", "app.jar"]
>   > ```
