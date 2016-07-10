var sync = require('synchronize');
var request = require('request');

module.exports = function(req, res) {
  var url = req.query.url.trim();

  var firebase_url = 'https://hacker-news.firebaseio.com/v0/item/';

  var matches = url.match(/(?:news\.ycombinator\.com\/item\?id=)([0-9]+)$/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var id = matches[1];
  try {
    response = sync.await(request({
      url: firebase_url + id + '.json'
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }


  var data = JSON.parse(response.body);
  var style = "<style>"
	+ ".demo {"
	+	"border:1px solid #C0C0C0;"
	+	"border-collapse:collapse;"
	+	"padding:5px;"
	+ "}"
	+ ".demo th {"
	+	"border:1px solid #C0C0C0;"
	+	"padding:5px;"
	+	"background:#ff6600;"
	+ "}"
	+ ".demo td {"
	+	"border:1px solid #C0C0C0;"
	+	"padding:5px;"
	+ "}"
+ "</style>";

  var html = "<table class='demo'>"
	+ "<thead>"
	+ "<tr>"
		+ "<th>" + data.title + "</th>"
	+ "</tr>"
	+ "</thead>"
	+ "<tbody>"
	+ "<tr>"
		+ "<td>" + data.by + "</td>"
	+ "</tr>"
	+ "<tr>"
		+ "<td>" + data.url + "</td>"
	+ "</tbody>"
        + "</table>";

  res.json({
    body: style + html
  })
};
