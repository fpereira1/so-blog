This script creates blog posts from your stack overflow contributions

## Install

    npm install -g so-blog

## Usage:

    so-blog QueryOutput.csv ./posts/

## How to use

Download your questions from StackOverflow:

1. Go to: https://data.stackexchange.com/stackoverflow/query/new
2. Run query:

```
select Id, PostTypeId, Title, Body, Tags, CreationDate, LastEditDate, ViewCount 
from Posts
where OwnerUserId = 123123 # change this to your user id
and PostTypeId = 1
order by ViewCount desc
```
3. Download CSV file
4. Run `so-blog QueryOutput.csv ./posts/` to generate posts
