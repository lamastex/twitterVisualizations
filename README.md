# Description

This is a webpage with visualizations of Twitter data using D3. The visualizations allows for exploratory data analysis of Twitter data. However, no data is provided by me - you have to collect it with your own Twitter credentials to comply with data protection laws and rules.

This is a part of my undergraduate project within [Project MEP](https://lamastex.github.io/scalable-data-science/sds/research/mep/).

# Get started

Requirements: [Node](https://nodejs.org/en/) to run the web server.

From the command line:


1. Download the repository:

    `
    $ git clone https://github.com/olofbjorck/twitterVisualizations.git
    `

2. Navigate to the files:

    `
    $ cd twitterVisualizations
    `

3. Start the web server (this is where Node is required):

    `
    $ node server.js
    `

4. Open the webpage in a browser: 
    
    http://localhost:8080/

    **Note:** I've only used and tested it in Chrome.
    
    
If that's working, we're set to add data. If there's no `/data/` folder in the `twitterVisualizations` folder, create one by (while located in the `twitterVisualizations` folder):

`
$ mkdir data
`

In the `/data/` folder, add the user of interest data and the Twitter network data (the graph isn't working yet). Then, in `userTimeline.js` and in `tree.js`, make sure the filenames are correct.


# Data format

Note that the code expects csv-files with column names generated from [Project MEP](https://lamastex.github.io/scalable-data-science/sds/research/mep/) code:


`userTimelineData.csv`: (not all columns are needed)

| CurrentTweetDate | CurrentTwID | CreationDateOfOrgTwInRT | OriginalTwIDinRT | CreationDateOfOrgTwInQT | OriginalTwIDinQT | OriginalTwIDinReply | CPostUserId | userCreatedAtDate | OPostUserIdinRT | OPostUserIdinQT | OPostUserIdinReply | CPostUserName | OPostUserNameinRT | OPostUserNameinQT | CPostUserSN | OPostUserSNinRT | OPostUserSNinQT | OPostUserSNinReply | favouritesCount | followersCount | friendsCount | isVerified | isGeoEnabled | CurrentTweet | UMentionRTiD | UMentionRTsN | UMentionQTiD | UMentionQTsN | UMentionASiD | UMentionASsN | URLs | hashTags | TweetType | MentionType | Weight |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |



`treeData.csv`:

| UserID | ScreenName | followersCount | NrOfRetweets | NrOfRetweeters |
| --- | --- | --- | --- | --- |


