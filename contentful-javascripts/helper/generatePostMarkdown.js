const fs = require('fs');

/**
* Takes Article info & Author info & markdown
* Creates a Markdown template
* Write files to a blog folder using template
*/

function generatePostMarkdown(author, title, description, tags, categories, draft, type, date, body) {

  // Escape new lines and quotes for markdown format
  let cleanTitle = title.replace(/\"/g,'\\"');
  let cleanDescription =  description.replace(/\"/g,'\\"');
  let cleanBody = body.trim();

  const template = `+++
  date = "${date}"
  title = "${cleanTitle}"
  categories = ["${categories}"]
  tags = ["example", "Lorem Ipsum"]
+++\n\n

${cleanBody}
`
  // Write markdown files to blog folder for Hugo to build html pages

  fs.writeFile(`../hugo/content/blog/${title}_BY_${author}.md`, template, function(err) {
    if (err) {
      console.log(err)
    }
  });

  return
}

module.exports = generatePostMarkdown;
