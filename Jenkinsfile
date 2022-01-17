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
        post {
          success {
            script {
                def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
                def buildUrl = "${RUN_DISPLAY_URL}"
                def prUrl = "${CHANGE_URL}"
                slackSend(channel: "#build-status-docs-community", color: "good", message: "<@$userId> PR READY FOR REVIEW\nBUILD: $buildUrl \nPR: $prUrl")
              }
          }
            failure {
            script {
                def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
                def buildUrl = "${RUN_DISPLAY_URL}"
                def prUrl = "${CHANGE_URL}"
                slackSend(channel: "#build-status-docs-community", color: "danger", message: "<@$userId> PR FAILED STATUS CHECK \nBUILD: $buildUrl \nPR: $prUrl")
              }
          }
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
            script {
              def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
              def buildUrl = "${RUN_DISPLAY_URL}"
              def prUrl = "${CHANGE_URL}"
              slackSend(channel: "#build-status-docs-community", color: "good", message: "<@$userId> Pineline has Started for STAGING \nBUILD: $buildUrl \nPR: $prUrl")
            }
            withCredentials([
              string(credentialsId: 'VANILLA_STAGING_ENV_TOKEN', variable: 'TOKEN')
                ]) {
                  sh '''
                    TOKEN="$TOKEN" targetVanillaEnv=staging yarn start
                  '''
                }
            post {
                success {
                  script {
                      def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
                      def buildUrl = "${RUN_DISPLAY_URL}"
                      def prUrl = "${CHANGE_URL}"
                      slackSend(channel: "#build-status-docs-community", color: "good", message: "<@$userId> Pineline has completed for STAGING \nBUILD: $buildUrl \nPR: $prUrl")
                    }
                }
                  failure {
                  script {
                      def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
                      def buildUrl = "${RUN_DISPLAY_URL}"
                      def prUrl = "${CHANGE_URL}"
                      slackSend(channel: "#build-status-docs-community", color: "danger", message: "<@$userId> Pineline has failed for STAGING \nBUILD: $buildUrl \nPR: $prUrl")
                    }
                }
            }
            
      }
    }
    stage("Deploying to vanilla production") {
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
         script {
              def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
              def buildUrl = "${RUN_DISPLAY_URL}"
              def prUrl = "${CHANGE_URL}"
              slackSend(channel: "#build-status-docs-community", color: "good", message: "<@$userId> Pineline has Started for PROD \nBUILD: $buildUrl \nPR: $prUrl")
            }
          withCredentials([
            string(credentialsId: 'VANILLA_PROD_ENV_TOKEN', variable: 'TOKEN')
                ]) {
                  sh '''
                    TOKEN="$TOKEN" targetVanillaEnv=prod yarn start
                  '''
                }
          post {
            success {
              script {
                  def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
                  def buildUrl = "${RUN_DISPLAY_URL}"
                  def prUrl = "${CHANGE_URL}"
                  slackSend(channel: "#build-status-docs-community", color: "good", message: "<@$userId> Pineline has completed for PROD \nBUILD: $buildUrl \nPR: $prUrl")
                }
            }
              failure {
              script {
                  def userId = getUserSlackId("${CHANGE_AUTHOR_DISPLAY_NAME}")
                  def buildUrl = "${RUN_DISPLAY_URL}"
                  def prUrl = "${CHANGE_URL}"
                  slackSend(channel: "#build-status-docs-community", color: "danger", message: "<@$userId> Pineline has failed for PROD \nBUILD: $buildUrl \nPR: $prUrl")
                }
            }
            }
            
      }
    }
  }
}
