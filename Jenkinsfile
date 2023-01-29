pipeline {
    agent any

    stages {
        stage('Pull') {
            steps {
				script{
				  checkout scmGit(branches: [[name: '*/back-end']], extensions: [submodule(parentCredentials: true, reference: '', trackingSubmodules: true)], userRemoteConfigs: [[credentialsId: 'jaeuk', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207']])
				}
            }
        }
        stage('SpringBoot Build') {
          steps {
            script {
              dir('backend') {
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