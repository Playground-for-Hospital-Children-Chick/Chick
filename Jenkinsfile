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
                 sh 'chmod +x ./gradlew'
                  sh './gradlew build'
              }
            }

          }
        }
   
        stage('Deploy') {
          steps {
            dir('backend/build/libs') {
              sh 'java -jar backend-0.0.1-SNAPSHOT.jar'
          }
        }
    }
  }
}
