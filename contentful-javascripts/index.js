'use strict'

const contentful = require('contentful')
const chalk = require('chalk')
const Table = require('cli-table2')
const moment = require('moment');
// helper functions

const generatePostMarkdown = require('./helper/generatePostMarkdown');

const SPACE_ID = "";
const ACCESS_TOKEN = "";

const client = contentful.createClient({
  // This is the space ID. Like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space.
  accessToken: ACCESS_TOKEN
});

console.log(chalk.green.bold('\nQuering Contentful for article and author information\n'))
console.log('This is a simplified version of the query\n')

client.getEntries({ content_type: 'article' })
.then(function (entries) {
  entries.items.forEach(entry => {
    // Grab & format all revlevant information from query to generate blog post Markdown
    let type = entry.sys.contentType.sys.id;
    let author = entry.fields.author.fields.name;
    let { title, body, date, category, tags,
      slug, description } = entry.fields;
    date = moment(date).format(); // format for markdown

      // Create markdown
      generatePostMarkdown(author, title, description, tags, [category], false, type, date, body)
  });
})
