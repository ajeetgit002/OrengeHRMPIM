pipeline {
    agent any

    environment {
    DOCKER_IMAGE = 'ajeetdocker002/orengehrm-pim'
    DOCKER_TAG = "latest"
    
    PATH = "C:\\Program Files\\nodejs;${env.PATH}"
}

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                git url: 'https://github.com/ajeetgit002/OrengeHRMPIM.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'
            }
        }

        stage('Run Pre-Test Script') {
            steps {
                echo 'Generating Excel test data...'
                bat 'npx ts-node src/utils/generateExcel.ts'
            }
        }

        stage('Run Cucumber Tests') {
    steps {
        echo 'Running Cucumber smoke tests...'
       bat 'npx cucumber-js features/PIMCreation.feature --tags "@smoke"'
    }
}
stage('Publish Test Results') {
    steps {
        echo 'Publishing JUnit results...'
        junit 'reports/results.xml'
        archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
    }
}

stage('Build Docker Image') {
    steps {
        echo 'Building Docker image...'
        bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
    }
}

stage('Docker Login') {
    steps {
        echo 'Logging in to Docker Hub...'
        withCredentials([usernamePassword(credentialsId: 'dockerhub-login', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
        }
    }
}


        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
