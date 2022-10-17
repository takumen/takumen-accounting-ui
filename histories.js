fetch(
  "https://fo4zofa5nyu2zzg67mqd7w6hge0niluj.lambda-url.ap-northeast-1.on.aws/"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((json) => initialize(json))
  .catch((err) => console.error(`Fetch problem: ${err.message}`));

function initialize(json) {
  var tableElem = document.getElementById("histories-table");
  for (const obj of json) {
    var trElem = tableElem.tBodies[0].insertRow(-1);
    // td要素を追加
    var createdAtCell = trElem.insertCell(0);

    // td要素にテキストを追加
    var createdAt = obj[2];
    createdAtCell.appendChild(document.createTextNode(createdAt));

    var fileUrlCell = trElem.insertCell(1);
    // td要素にテキストを追加
    var fileUrl = obj[1];

    var a = document.createElement("a");
    // Create the text node for anchor element.
    var link = document.createTextNode(fileUrl);
    // Append the text node to anchor element.
    a.appendChild(link);
    // Set the title.
    a.title = fileUrl;
    // Set the href property.
    a.href = fileUrl;

    fileUrlCell.appendChild(a);
  }
}
