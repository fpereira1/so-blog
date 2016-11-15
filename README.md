This script creates blog posts from your stack overflow contributions

## Install

    npm install -g so-blog

## Usage:

    so-blog QueryOutput.csv ./posts/
    
To download your questions from stackoverflow follow these steps:

Head to this location
http://data.stackexchange.com/stackoverflow/query

And run this query

```
select Id, PostTypeId, Title, Body, Tags, CreationDate, LastEditDate, ViewCount 
from Posts
where OwnerUserId = 123123 # change this to your user id
and PostTypeId = 1
order by ViewCount desc
```

Now, download a CSV of your query and use the tool to create the posts in markdown format.
