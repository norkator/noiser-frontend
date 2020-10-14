pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Install front end packages') {
      steps {
        bat 'npm install'
      }
    }

    // stage('Test front end') {
    //   steps {
    //     bat 'cd .\\api\\front-end && npm run test-ci'
    //   }
    // }

    stage('Build front end') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Deployment') {
          when {
            // Only execute this stage when building from the `master` branch
            branch 'master'
          }
          steps {
            bat 'npm run build'
          }
    }

  }
}
