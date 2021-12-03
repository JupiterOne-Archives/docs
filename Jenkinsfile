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

            if [ "${JUPITERONE_ACTION}" == "apply" ]; then
          credstash put -a "${TARGET_NAME}-vanilla-staging-env-token" "${VANILLA_STAGING_ENV_TOKEN}"
            fi

                    withCredentials([
          string(credentialsId: 'vanilla_staging_env_token', variable: 'TOKEN')
        ]) {
          sh '''
            TOKEN="$TOKEN" yarn start
          '''

        }
            
      }
    }
  }
}
