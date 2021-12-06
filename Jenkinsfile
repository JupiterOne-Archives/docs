#!groovy

pipeline {
 agent none

  options {
    ansiColor('xterm')
    timestamps()
  }

  stages {
    stage('Build and scan') {
      agent { label 'ecs-builder-node12' }
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
          sh `TOKEN=${TOKEN} yarn start`

        }


      }
    }

    stage("Deploy") {
      when { branch "main" }
      agent { label 'ecs-builder-node12' }
      steps {
         initBuild()
            sh 'yarn install --frozen-lockfile'

            sh 'yarn lint'

            sh 'yarn test:unit'

            sh 'yarn bundle'

            sh 'jupiterone-build'


          sh '''
            TOKEN="$VANILLIA_STAGING_ENV_TOKEN" yarn start
          '''
            
      }
    }
  }
}
