const fs = require('fs')
const path = require('path')
const util = require('util')

const program = require('commander')
const _ = require('lodash')
const moment = require('moment')
const toMarkdown = require('to-markdown')
const version = require('./package.json').version
const fetch = require('node-fetch')
const FormData = require('form-data')

program
  .version(version)
  .usage('<userId> <output>')
  .parse(process.argv)

const userId = program.args[0]
const outputPath = path.resolve(program.args[1] || '.')

const postTemplate = `
---
layout: post
title: "%s"
comments: true
---

%s
`

const handleResponse = response => {
    if (response.ok) {
        return response.json()
    } else {
        console.error('Data could not be fetched or user with that ID does not exist!')
    }
}
// filter identifier for fields needed to create post
// more here http://api.stackexchange.com/docs/filters
const filter = ')6CfgeqC-RztHyzXwYPXt(U4)rQBVKuYo24H'

fetch(`https://api.stackexchange.com/2.2/users/${userId}/posts?order=desc&site=stackoverflow&filter=${filter}`)
    .then(handleResponse)
    .then(data => {
        if (!data) {
            return
        }

        if (!data.items) {
            console.error('No results returned!')
            return
        }

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath)
        }

        data.items.forEach(post => {
            const title = _.kebabCase(post.title)
            const date = moment(post.creation_date * 1000).format('YYYY-MM-DD')
            const filename = `${date}-${title}.md`
            const markdown = toMarkdown(post.body, { gfm: true })
            const postData = util.format(postTemplate, post.title, markdown)

            console.log(`Creating post ${title}`)

            fs.writeFileSync(
                path.resolve(outputPath, filename),
                postData,
                'utf8'
            )
        })
    })
