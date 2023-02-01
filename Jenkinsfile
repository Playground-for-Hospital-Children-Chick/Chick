pipeline {
    agent any

    stages {
        stage('Pull') {
            steps {
				script{
				  git branch: 'back-end', credentialsId: '3f6c0b0d-69b2-42a6-8eab-dc5ed7d829c8', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207'
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
                sh 'docker run -d -v /var/lib/image:/root/pictures -v /etc/timezone:/etc/timezone -v /etc/localtime:/etc/localtime --name springboot -p 9000:9000 -u root springboot'
              }
              script{
                sh 'docker stop openvidu' 
                sh 'docker run -p 4443:4443 --rm -e openvidu.publicurl=http://i8b207.p.ssafy.io:4443/ -e OPENVIDU_SECRET=MY_SECRET --name openvidu openvidu/openvidu-server-kms:2.23.0'
              }
            }
   }
  }
}
