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

        sh 'yarn install --frozen-lockfile'

        sh 'yarn lint'

        sh 'test:unit'

        securityScan()

        sh 'yarn bundle'

        sh 'jupiterone-build'

        script {
          if (env.BRANCH_NAME == 'main') {
            sh 'jupiterone-publish'
            sh 'yarn start'
            // Publish @jupiterone/user-action-service-types
            // publishNewNpmVersionIfAny('./packages/user-action-service-types/package.json', './packages/user-action-service-types/dist')
          }
        }
      }
    }

    stage("Deploy") {
      when { branch "main" }
      steps {
        deployToJupiterEnvironments (
          autoPopulateCM: [jiraComponent: 'Cloud Platform']
        )
      }
    }
  }
}
