var btn = document.getElementById("btn");
var wordinfo = document.getElementById("word-info");
var WordReturnObj = [];

var RandomWordComplete = function (data) {
    var word = data.Word;

    document.getElementById("word-info").innerHTML = data.Word;
    wordMeaning(word);
}

btn.addEventListener("click", function () {
    $.ajax({
        type: "GET",
        url: "http://randomword.setgetgo.com/get.php",
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
});


function wordMeaning(word) {
    $.ajax({
        type: "GET",
        url: 'http://www.stands4.com/services/v2/defs.php?uid=5454&tokenid=HYX3k1HH7QfiTUXH&word=' + encodeURIComponent(word),
        dataType: "xml",
        success: function (xml) {
            var defintions = $(xml).find('definition');
            if (defintions.length == 0) {
                document.getElementById("def-bajs").innerHTML = "";
                document.getElementById("myAnchor").innerHTML = "google it";
                document.getElementById("myAnchor").href = "https://www.google.se/#q=" + encodeURIComponent(word);
            } else {
                document.getElementById("def-bajs").innerHTML = defintions[0].innerHTML;
                document.getElementById("myAnchor").innerHTML = "";
            }
        }
    });
}