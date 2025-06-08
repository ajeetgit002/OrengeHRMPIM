pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'ajeetdocker002/orengehrm-pim'
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS = credentials('dockerhub-login')
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
        echo 'Generating Excel file...'
        bat 'npx ts-node src/utils/generateExcel.ts'

        echo 'Running Cucumber smoke tests...'
       bat'npx cucumber-js --tags "@smoke"'
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
                bat """
                    echo "${DOCKER_CREDENTIALS_PSW}" | docker login -u "${DOCKER_CREDENTIALS_USR}" --password-stdin
                """
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
