#!groovy

pipeline {
  agent none

  options {
    ansiColor('xterm')
    timestamps()
  }
  triggers {
    cron('0 0 * * *')
  }
  stages {
    stage('Build and scan') {
      agent { label 'ecs-builder-node14' }
      steps {
        initBuild()

        sh 'echo "hello"'
        sh 'yarn install --frozen-lockfile'

        sh 'yarn lint'
        sh 'yarn test:unit'
        sh 'yarn bundle'

        securityScan()

        sh 'jupiterone-build'
      }
    }

      stage('Updating Prod Integration Articles') {
        when {
          beforeAgent true
          branch 'main'
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

            withCredentials([
              string(credentialsId: 'VANILLA_PROD_ENV_TOKEN', variable: 'TOKEN')
                ]) {
          sh '''
                    TOKEN="$TOKEN" targetVanillaEnv=prod yarn replaceIntegrationDocs
                  '''
                }
          }
      }

      stage('Sleeping prior to updating staging integrations') {
        when {
          beforeAgent true
          branch 'vanilla-staging'
          triggeredBy 'TimerTrigger'
        }
      steps {
        sleep(time:1, unit:'HOURS')
      }
      }

      stage('Updating Staging Integration Articles') {
        when {
          beforeAgent true
          branch 'vanilla-staging'
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
            withCredentials([
              string(credentialsId: 'VANILLA_STAGING_ENV_TOKEN', variable: 'TOKEN')
                ]) {
          sh '''
                    TOKEN="$TOKEN" targetVanillaEnv=staging yarn replaceIntegrationDocs
                  '''
                }
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
                TOKEN="$TOKEN" targetVanillaEnv=staging yarn start;
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
