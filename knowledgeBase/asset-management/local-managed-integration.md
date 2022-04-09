# How to configure and run a managed integration locally

There are a number of reasons why a JupiterOne managed integration should be run locally. Some examples include the tool is running within a VPC, firewall rules don’t allow external access, or the tool is running on-prem. This article outlines the steps for running an integration locally. These steps include extracting the data, viewing them as a graph, and loading the data back into JupiterOne’s graph.

You can find additional developer documentation here in our JupiterOne SDK. This documentation, along with some of the commands we’ll review and pre-requisites in the JupiterOne platform will be needed when creating your own custom integrations.

## Set up in JupiterOne

Before you can send the integration results into JupiterOne, you will need your **JupiterOne Account ID** and you will need to create a Mock Integration Instance so that you can capture the **Integration Instance ID** and create an **Integration API Key**.

1. Your JupiterOne Account ID

Find this ID by navigating to the account management page or running this query: <br>

`FIND jupiterone_account as a return a._accountId`

2. An Integration Instance ID
3. An Integration API Key

For 2 and 3, follow these steps:

### Create a template integration instance using dummy data:

1. Navigate to the integrations page and select the integration you are going to configure and click the add integration instance button (we’ll use Jira as an example throughout this article).
2. Fill in the all required fields (see the screenshot for an example)
- Fill in the Account Name field with a value that includes the word custom, manual, or local. You especially want a descriptive name if you have multiple integration instances configured for the same tool. 
- Set the Polling Interval to be Disabled so that the JupiterOne platform does not try to run the integration at a specific interval.
- Fill in the rest of the fields with dummy data. The create configuration button is not clickable until all required fields have been filled in or selected.

![](../assets/local-managed-integration-create.png)

3. After you create the configuration, you should see an ID field appear. This is the Integration Instance ID. You’ll need this value later.

![](../assets/local-managed-integration-integration-id.png)

4. You will also see towards the bottom of the page a section to create an integration API key. Click the create button.

![](../assets/local-managed-integration-api-key-create.png)

You can now click to reveal the Integration API Key. You'll also need this value later.

![](../assets/local-managed-integration-api-key-view.png)

## Cloning and Running the Integration

Next you'll clone the repository of the integration you are trying to run locally. Integration repositories are public and can be found under the [JupiterOne Organization](https://github.com/JupiterOne). When you search for an integration repository, you'll notice each follows a naming convention of **graph-\***. We’ll continue with our Jira example by navigating to the [Jira Repository](https://github.com/JupiterOne/graph-jira).

Copy the link under Code so we can clone the repository.

![](../assets/local-managed-integration-graph-jira.png)

We'll describe two methods for installing dependencies and running the integrtion: running the job locally using a Mac terminal or using a provided Dockerfile to run the job from within a Docker container. 

### Using the Mac Terminal

1. Make sure all prerequisites are installed.

- Install Homebrew (this will take a moment)
- Install Node.js using the installer or a version manager such as nvm or fnm

2. Next, open a terminal in the location where you'd like the repo to live. Type in `git clone` followed by the url copied from GitHub. 

`git clone https://github.com/JupiterOne/graph-jira.git` 

Remember which directory you clone the repo to. You’ll want to perform the next steps in the same place directory.

