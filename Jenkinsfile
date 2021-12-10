#!groovy

pipeline {
 agent none

  options {
    ansiColor('xterm')
    timestamps()
  }

  stages {
    stage('Build and scan') {
      agent { label 'ecs-builder-node14' }
      steps {
        initBuild()
        securityScan()
        sh 'yarn install --frozen-lockfile'

        sh 'yarn lint'

        sh 'yarn test:unit'

        sh 'yarn bundle'

        sh 'jupiterone-build'
     withCredentials([
              string(credentialsId: 'VANILLIA_STAGING_ENV_TOKEN', variable: 'TOKEN')
                ]) {
                  sh '''
                    TOKEN="$TOKEN" yarn start
                  '''

                }
      }
    }

    stage("Deploy") {
      when {
        beforeAgent true
        branch 'main' 
        }
      
      agent { label 'ecs-builder-node14' }
      steps {
         initBuild()
            sh 'yarn install --frozen-lockfile'

            sh 'yarn lint'

            sh 'yarn test:unit'

            sh 'yarn bundle'

            sh 'jupiterone-build'

            withCredentials([
              string(credentialsId: 'VANILLIA_STAGING_ENV_TOKEN', variable: 'TOKEN')
                ]) {
                  sh '''
                    TOKEN="$TOKEN" yarn start
                  '''

                }
            
      }
    }
  }
}
