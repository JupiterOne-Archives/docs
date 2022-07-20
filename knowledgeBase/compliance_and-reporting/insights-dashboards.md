# Getting Started with Insights Dashboards

J1 Insights enables you to build reporting dashboards using J1QL queries. You can either import prebuilt Insights dashboards or create a custom one of your own.

You can configure each dashboard either as a team dashboard that you share with other account users or a personal dashboard for a single user. 

The layout of each dashboard is individually saved per user, including the layout for team boards, so that you can configure layouts according to your own preferences without impacting others. Administrators can save a team board layout as a default for other users.

Here are a few example boards and their configurations: [https://github.com/JupiterOne/insights-dashboards](https://github.com/JupiterOne/insights-dashboards).

To learn more about how to use the dashboards, see [General Insights Dashboard Functionality](../insights-dashboards-general.md).

## Import Prebuilt Insights Dashboards

1. Go to https://github.com/JupiterOne/insights-dashboards to see the list of prebuilt dashboards available for you to import into your JupiterOne account

2. Select a prebuilt dashboard.

3. Click `board.json`.

4. Right-click **Raw** -> **Save link as...**.

   

   ![save-dashboard](../assets/save-dashboard.gif)

   

5. Navigate to J1 **Insights** to add a board.
   

   ![insights](../assets/insights.png)
    
   
6. Click the ‘>’ carrot to expand the left sidebar.

7. Click **Add** ![](C:\Users\lynch\OneDrive\Documents\GitHub\docs\knowledgeBase\assets\icons\insight-add.png) and choose whether you want to add a personal or team board.

8. Click **Upload From JSON Schema** and navigate to the `board.json` file you previously saved.
   ​

   ![import-dashboard](../assets/import-dashboard.gif) 

   

   Alternatively, you can just click the tile to quickly add a starter configuration for that dashboard. 
   
   
   ![](../assets/insights-starters.png) 
   
   
   
   For more information about J1 standard Insights dashboards, [watch this video](https://try.jupiterone.com/blog/video-how-to-modify-out-of-the-box-dashboards), and read more [here](./insights-dashboards-starters.md).

## Creating a Custom Insights Dashboard with Custom Charts

You can build your own custom dashboard with customized, individual charts. Each chart is powered by one or more J1QL queries.

1. Go to **J1** **Insights**.
   ​

   ![insights](../assets/insights.png)

   

2. Click the ‘>’ carrot to expand the left sidebar.

3. Click **Add** ![](C:\Users\lynch\OneDrive\Documents\GitHub\docs\knowledgeBase\assets\icons\insight-add.png) and choose whether you want to add a personal or team board.

4. Click **Start Adding Charts** and in the **Add Chart** workflow.

5. Enter the details of your query/chart, which include information such as:

   - Type of visual chart, such as number, pie, line, bar.

   - The chart query or queries.

   - Formatting options 
     ​

     ![custom-board](../assets/custom-board.gif) 

For more information about custom Insights dashboards, [watch this video](https://try.jupiterone.com/blog/how-to-create-customized-dashboards).

#### Additional support documentation/resources for writing queries:

- [J1QL query tutorial](../jupiterOne-query-language_(J1QL)/tutorial-j1ql.md)
- [Search quickstart](../getting-started_and-admin/quickstart-search.md)
- [J1QL language specs](../jupiterOne-query-language_(J1QL)/jupiterOne-query-language.md)
- [All questions and queries](https://ask.us.jupiterone.io/filter?tagFilter=all)

