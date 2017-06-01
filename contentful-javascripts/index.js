'use strict'

const contentful = require('contentful')
const chalk = require('chalk')
const Table = require('cli-table2')
const moment = require('moment');
// helper functions

const generatePostMarkdown = require('./helper/generatePostMarkdown');

const SPACE_ID = "awpxl2koull4";
const ACCESS_TOKEN = "76d3e2e6deab94079609a2cc7d146b47acd2495e16ea3f09143d2f1859e5ec8b";

const client = contentful.createClient({
  // This is the space ID. Like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space.
  accessToken: ACCESS_TOKEN
});

console.log(chalk.green.bold('\nWelcome to the Contentful JS Boilerplate\n'))
console.log('This is a simplified example to demonstrate the usage of the Contentful CDA\n')
client.getEntries({ content_type: 'article' })
.then(function (entries) {
  entries.items.forEach(entry => {
    let type = entry.sys.contentType.sys.id === 'article' ? 'post' : '';
    let author = entry.fields.author.fields.name;
    let { title, body, date, category, tags,
      slug, description } = entry.fields;
    date = moment(date).format();
      generatePostMarkdown(author, title, description, tags, [category], false, type, date, body)
  });
})

// entry.sys.contentType.sys.id - type
// entry.fields.title - article - title
// entry.fields.headerPhoto - ???
// entry.fields.body - Markdown
// entry.fields.date - Date created
// entry.fields.author.fields.name - ?? getter
// entry.fields.category - category single
// entry.fields.tags - array of tags
// entry.fields.slug - slug
// entry.fields.description - description
// entry.fields.promoted - ???
