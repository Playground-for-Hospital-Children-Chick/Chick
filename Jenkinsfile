pipeline {
    agent any
    tools {
    nodejs "nodejs"
    }
    stages {
        stage('Pull') {
            steps {
				script{
				  git branch: 'front-end', credentialsId: 'jaeuk', url: 'https://lab.ssafy.com/s08-webmobile1-sub2/S08P12B207'
				}
            }
        }
        stage('React Build') {
          steps {
            script {
              script {
                sh 'npm install -g yarn'
                sh 'yarn --cwd ./frontend install --network-timeout 100000'
                sh 'yarn --cwd ./frontend build'
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
                // sh 'docker stop nginx'
                // sh 'docker rm nginx'
                sh 'docker run -d --name nginx -p 3000:80 -u root basepage/nginx'
              }
            }
   }
  }
}
