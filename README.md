This script creates blog posts from your stack overflow contributions

## Install

    npm install -g so-blog

## Usage
    so-blog userId ./posts/
- userId param is your StackOverflow user ID.

## How to use

Download your questions from StackOverflow:

1. Go to: https://stackoverflow.com/
2. Login and go to your profile page
3. Copy userId from browser url, it should looks something like this: https://stackoverflow.com/users/200/john-downey (200 is the user ID in this example)
4. Run `so-blog userId ./posts/` to generate posts
