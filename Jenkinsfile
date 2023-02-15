pipeline {
    agent any
   tools {
   gradle "gradle7.6"
 }
    stages {
        stage('Pull') {
            steps {
				script{
				  git branch: 'back-end', credentialsId: 'jaeuk', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207'
				}
            }
        }
        stage('React Build') {
          steps {
            script {
              dir('backend') {
                 sh 'chmod +x ./gradlew'
                sh './gradlew build'
              }
            }
          }
        }
   
        stage('Build') {
          steps {
            script {
              sh 'docker build -t basepage/nginx ./frontend/'
            }
          }
        }
           stage('Deploy') {
            steps {
              script {
                sh 'docker stop nginx'
                sh 'docker rm nginx'
                sh 'docker run -d --name nginx -p 3000:80 -u root basepage/nginx'
              }
            }
   }
  }
}
