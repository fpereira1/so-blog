const fs = require('fs')
const path = require('path');
const util = require('util');

const program = require('commander');
const csv = require('csv-parser')
const _ = require('lodash');
const moment = require('moment');
const toMarkdown = require('to-markdown');
const version = require('./package.json').version;

program
  .version(version)
  .usage('<input> <output>')
  .parse(process.argv);

const file = program.args[0];
const outputPath = path.resolve(program.args[1] || '.');

const postTemplate = `
---
layout: post
title: "%s"
comments: true
---

%s
`;
//parameter is passed

fs.createReadStream(file)
  .on('error', function (err) {
    if(~err.toString().indexOf('no such file or directory')) {
      console.error('Unable to find file', file, 'Please check the file exists');
    }
  })
  .pipe(csv())
  .on('data', function (data) {
    
    const title = _.kebabCase(data.Title);
    const date = moment(data.CreationDate).format('YYYY-MM-DD');
    const filename = `${date}-${title}.md`;
    const markdown = toMarkdown(data.Body, { gfm: true });
    const post = util.format(postTemplate, data.Title, markdown);
    
    fs.writeFileSync(
      path.resolve(outputPath, filename),
      post,
      'utf8'
    );
    
  });
