var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var images = require('metalsmith-project-images');
var stylus = require('metalsmith-stylus');
var nib = require('nib');
var dateFormatter = require('metalsmith-date-formatter');
drafts = require('metalsmith-drafts')

Metalsmith(__dirname)
  .metadata({
    title: "EJ Fox",
    description: "",
    url: "http://www.ejfox.com/"
  })
  .source('./src')
  .use(dateFormatter({
    dates: [
        {
            key: 'date',
            format: 'MMMM D YYYY'
        }
    ]
  }))
  .use(stylus({
  	// Set stylus output to compressed
  	compress: true,
  	// Use the 'nib' plug-in
  	use: [nib()]
  }))
  .destination('./build')
  .clean(true)
  .use(drafts())
  .use(markdown())
  .use(permalinks())
  .use(images({
    pattern: 'articles/**/*.md',
    imagesDirectory: 'images'
  }))
  .use(collections({
    articles: {
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
