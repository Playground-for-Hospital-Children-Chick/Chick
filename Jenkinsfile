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
<<<<<<< HEAD
              echo 'SpringBoot Build....'
=======
            script{
                 sh 'chmod +x ./gradlew'
            }
            script {
              dir('backend') {
                  sh './gradlew build'
              }
            }
>>>>>>> 85a48f06ca306fd523661de213a7aa41bea90e6b
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
