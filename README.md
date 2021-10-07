# Description

This is a webpage with visualizations of Twitter data using D3. The visualizations allows for exploratory data analysis of Twitter data. However, only dummy data is provided by me - you have to collect real data with your own Twitter credentials to comply with data protection laws and rules.

This is a part of my undergraduate project within [Project MEP](https://lamastex.github.io/scalable-data-science/sds/research/mep/).

Using this project Ammar Aldhahyani extended so that interactive visualizations can run in the browser fornt-end without a back-end server.
This project was supported by an internship at Combinet Competence Centre for Data Enginerring Sciences in the Summer of 2021.

# Get started

## Docker environment for project

```
###navigate to twitterVisualizations folder
cd /twitterVisualizations

###then run
docker-compose -f docker-compose.dev.yaml up

###when it is done open it in localhost:3000 and make sure this port is available


If that's working, we're set to add data. Change the dummy files to real data and change the filenames in the JavaScript files.


# Data format

Note that the code expects csv-files with column names generated from [Project MEP](https://lamastex.github.io/scalable-data-science/sds/research/mep/) code:


`userTimeline.csv`:

| CurrentTweetDate | CurrentTwID | CurrentTweet | TweetType |
| --- | --- | --- | --- |


`tree.csv`:

| UserID | ScreenName | followersCount | NrOfRetweets | NrOfRetweeters |
| --- | --- | --- | --- | --- |

`links.csv`:

| source | target | weight |
| --- | --- | --- |

`nodes.csv`: (group is not implemented and thus not really needed)

| id | idNr | weight | group |
| --- | --- | --- | --- |


```
