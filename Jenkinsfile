pipeline {
    agent any

    stages {
        stage('Pull') {
            steps {
				script{
				  git branch: 'back-end', credentialsId: 'jaeuk', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207'
				}
            }
        }
        stage('SpringBoot Build') {
          steps {
            script {
              dir('backend') {
                  chmod +x gradlew
                  sh './gradlew build'
              }
            }
          }
        }
   
        stage('Build') {
          steps {
              echo 'Deploying....'
          }
        }
   
        stage('Deploy') {
          steps {
              echo 'Deploy'
          }
        }
    }
}