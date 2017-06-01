const fs = require('fs');
function generatePostMarkdown(author, title, description, tags, categories, draft, type, date, body) {
  let cleanTitle = title.replace(/\"/g,'\\"')
  let cleanDescription =  description.replace(/\"/g,'\\"')

  const template = `+++
  date = "${date}"
  title = "${cleanTitle}"
  categories = ["${categories}"]
  tags = "${tags}"
  author = "${author}"
  description = "${cleanDescription.trim()}"
  draft = ${draft}
  type = "${type}"
+++\n\n

${body}
`
  fs.writeFile(`../hugo/content/blog/${title}_BY_${author}.md`, template, function(err) {
    if (err) {
      console.log(err)
    }
  });

  return
}

module.exports = generatePostMarkdown;
