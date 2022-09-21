function syncCompanies() {
  startLoading();
  fetch(
    "https://jqtxxjkq5cjbwdkrl36qrmtwpi0zuszx.lambda-url.ap-northeast-1.on.aws/"
  )
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      console.log(data.length);
      if (data.length > 0) {
        alert("内容にエラーがあります。");
        exportCSV(data, ",", "振込先データエラー");
      } else {
        alert("同期が完了しました！");
      }
    });
}

function syncPayouts() {
  const fd = new FormData();
  const input_month = document.querySelector("input[name=input_month]");
  const input_logizard_file = document.querySelector(
    "input[name=logizard_file"
  );

  alert(input_month.value);
}

function jsonToCsv(json, delimiter) {
  var header = Object.keys(json[0]).join(delimiter) + "\n";
  var body = json
    .map(function (d) {
      return Object.keys(d)
        .map(function (key) {
          return d[key];
        })
        .join(delimiter);
    })
    .join("\n");
  return header + body;
}

//csv変換
function exportCSV(items, delimiter, filename) {
  //文字列に変換する
  var csv = jsonToCsv(items, delimiter);

  //拡張子
  var extention = delimiter == "," ? "csv" : "tsv";

  //出力ファイル名
  var exportedFilenmae = (filename || "export") + "." + extention;

  //BLOBに変換
  var bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  var blob = new Blob([bom, csv], { type: "text/csv;charset=utf-8;" });

  if (navigator.msSaveBlob) {
    // for IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    //anchorを生成してclickイベントを呼び出す。
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function startLoading() {
  let insertHtml = `
  <!-- loading -->
  <div id="loading" class="is-hide">
      <div class="cv-spinner">
          <span class="spinner"></span>
      </div>
  </div>
  <!-- loading -->
  `;
  let insertCSS = `
  <style>
      #loading{
          position: fixed;
          top: 0;
          left: 0;
          z-index: 999;
          width: 100%;
          height:100%;
          background: rgba(0,0,0,0.6);
      }
      #loading .cv-spinner {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      #loading .spinner {
          width: 80px;
          height: 80px;
          border: 4px #ddd solid;
          border-top: 4px #999 solid;
          border-radius: 50%;
          animation: sp-anime 0.8s infinite linear;
      }
      @keyframes sp-anime {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(359deg); }
      }
      #loading.is-hide{
          display:none;
      }
  </style>
  `;

  document
    .getElementsByTagName("head")[0]
    .insertAdjacentHTML("beforeend", insertCSS);
  document
    .getElementsByTagName("body")[0]
    .insertAdjacentHTML("afterbegin", insertHtml);

  showLoading();
}

function showLoading() {
  document.getElementById("loading").classList.remove("is-hide");
}

function hideLoading() {
  document.getElementById("loading").classList.add("is-hide");
}
