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
            sshPublisher(publishers: [sshPublisherDesc(configName: 'UBUNTU SERVER SASTAMALA', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'echo ""', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'noiser/', remoteDirectorySDF: false, removePrefix: 'dist/', sourceFiles: 'dist/**/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
          }
    }

  }
}
