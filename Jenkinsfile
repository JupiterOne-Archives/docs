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

      }
    }

    stage("Deploying to vanilla staging") {
      when {
        beforeAgent true
        branch 'vanilla-staging' 
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
                    TOKEN="$TOKEN" targetVanillaEnv=staging yarn start
                  '''
                }
            
      }
    }
    stage("Deploying to vanilla production") {
      when {
        beforeAgent true
        branch 'vanilla-prod' 
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
            string(credentialsId: 'VANILLIA_PRODUCTION_ENV_TOKEN', variable: 'TOKEN')
                ]) {
                  sh '''
                    TOKEN="$TOKEN" targetVanillaEnv=prod yarn start
                  '''
                }
            
      }
    }
  }
}
