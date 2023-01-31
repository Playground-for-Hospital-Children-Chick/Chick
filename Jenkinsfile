pipeline {
    agent any

    stages {
        stage('Pull') {
            steps {
				script{
				  git branch: 'back-end', credentialsId: '760b1940-c17d-4576-afe4-efb309aad1c4', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207'
				}
            }
        }
        stage('SpringBoot Build') {
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
              sh 'docker build -t springboot ./backend/'
            }
          }
        }
           stage('Deploy') {
            steps {
              script {
                sh 'docker stop springboot && docker rm springboot'
                sh 'docker run -d -v /var/lib/image:/root/pictures -v /etc/timezone:/etc/timezone -v /etc/localtime:/etc/localtime --name springboot -p 5000:8080 -u root springboot'
              }
            }
   }
  }
}
