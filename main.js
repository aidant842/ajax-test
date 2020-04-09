function getData(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           cb(JSON.parse(this.responseText));
        }
    };


    xhr.open("GET", url);

    xhr.send();
}

function getTableHeaders(obj){ //for any appropriate obj
    var tableHeaders = [];     // create an empty array

    Object.keys(obj).forEach(function(key){ //for every key
        tableHeaders.push(`<td>${key}</td>`); //create a <td> item that contains the key (a table cell)
    });

    return `<tr>${tableHeaders}</tr>`; //and then return all the <td> items as a <tr> (a table row)
}

function generatePaginationButtons(next, prev){
    if(next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
               <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev){
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if(!next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url){ //for a specific type of API data
    var tableRows = [];
    var el = document.getElementById("data"); //target the HTML element with id "data"
    //el.innerHTML = " "; //set it to empty

    getData(url, function(data){ //get the data for the API type (see the function getData)
        var pagination = "";
        if(data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous)
        }

        data = data.results;
        var tableHeaders = getTableHeaders(data[0]); // populate the above-created table headers with the data obtained from getData

        data.forEach(function(item){  
            var dataRow =[];

            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, ""); //insert the table headers - populated with data from getData - into the "data" DOM element as <table>
    });
}


/* function printDataToConsole(data){
    console.log(data);
}

getData(printDataToConsole); */


/* getData(function(data){
    console.log(data);
}); */






