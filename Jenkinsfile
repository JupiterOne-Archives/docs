#!groovy

pipeline {
  agent none

  options {
    ansiColor('xterm')
    timestamps()
  }
  triggers {
    cron('H/15 * * * *')
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

      stage('Checking for Integration Doc Updates') {
      when {
        beforeAgent true
        triggeredBy 'TimerTrigger'
      }

      agent { label 'ecs-builder-node14' }
        steps {
          initBuild()
        sh 'yarn install --frozen-lockfile'

        sh 'yarn lint'

        sh 'yarn test:unit'

        sh 'yarn bundle'

        sh 'jupiterone-build'

          sh '''

                  yarn updateIntegrations
                  '''
        }
      }

    stage('Deploying to vanilla staging') {
      when {
        beforeAgent true
        branch 'vanilla-staging'
        not {
          triggeredBy 'TimerTrigger'
        }
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
              string(credentialsId: 'VANILLA_STAGING_ENV_TOKEN', variable: 'TOKEN')
                ]) {
          sh '''
                    TOKEN="$TOKEN" targetVanillaEnv=staging yarn start
                  '''
                }
      }
    }
    stage('Deploying to vanilla production') {
      when {
        beforeAgent true
        branch 'main'
        not {
          triggeredBy 'TimerTrigger'
        }
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
            string(credentialsId: 'VANILLA_PROD_ENV_TOKEN', variable: 'TOKEN')
                ]) {
          sh '''
                    TOKEN="$TOKEN" targetVanillaEnv=prod yarn start
                  '''
                }
      }
    }
  }
}
