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
              echo 'SpringBoot Build....'
          }
        }
   
        stage('Build') {
          steps {
              echo 'Build....'
          }
        }
   
        stage('Deploy') {
          steps {
              echo 'Deploy'
          }
        }
    }
}