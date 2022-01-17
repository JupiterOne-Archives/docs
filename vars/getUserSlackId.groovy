#!/usr/bin/env groovy

def call(String name) {
  def KNOWLEDGE_BASE_CHANGERS = [

    "Bryan Schauerte": 'bryan.schauerte@jupiterone.com',
 "Janette Lynch": 'janette.lynch@jupiterone.com',
  ]

  def email = KNOWLEDGE_BASE_CHANGERS.get(name)
  if(KNOWLEDGE_BASE_CHANGERS.containsKey(name) == false){
    slackSend(channel: '#build-status-docs-community', message: "No slack email mapping configured for $name")
    return null;
  }
  def userId = slackUserIdFromEmail(email)
  return userId
}