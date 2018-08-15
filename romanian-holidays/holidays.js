// get date info
var d = new Date();
var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getYear() + 1900;


// grab references to the <section> element and store it in variable
var section = document.querySelector('section');

// write date
var jumbo = document.querySelector('div.jumbotron');
var myPara = document.createElement('p');
myPara.textContent = "Today's date: " + month + ' - ' + date + ' - ' + year;
jumbo.appendChild(myPara);

// store the URL of the JSON to retrieve in a variable
var requestURL = 'https://api.xmltime.com/holidays?accesskey=JzgY7GekBZ&expires=2018-08-15T05%3A27%3A17%2B00%3A00&signature=4CGVGo3zHJYLVw1gbCw2Vxhxv1Y%3D&version=2&out=js&prettyprint=1&country=ro&year=2018';

// create a request
var request = new XMLHttpRequest();

// open a new request 
request.open('GET', requestURL);

//setting the responseType to JSON, so that XHR knows that the server will be returning JSON
request.responseType = 'json';
request.send();

// waiting for the response to return from the server, then dealing with it
request.onload = function() {
    var holidays = request.response;
    showHolidays(holidays);
}

// displays the holidays to page
function showHolidays(jsonObj) {
    // array of all the holidays
    var hol = jsonObj['holidays'];
    var empty = true;

    // loop thru holidays and print each holiday along w/ its date
    // and then append it to myArticle, which will be appended to
    // <section>
    for (var i = 0; i < hol.length; i++) {
      if(hol[i].date.datetime.month == month && hol[i].date.datetime.day == date ) {

        // holidays will print in <section> in html file
        var myArticle = document.createElement('section');
        var myPara1 = document.createElement('h1');
        // print holiday at index i to webpage
        myPara1.textContent = hol[i].name;
        myArticle.appendChild(myPara1);
        section.appendChild(myArticle);
        empty = false;

      }
      
    }

    // if no holidays today
    if(empty === true) {
        document.getElementById("holiday").innerHTML ="No Romanian holidays today!";
    }
}
