"use strict";

function getData(oFormElement) {

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        
        var stockNames = ['Apple', 'Microsoft', 'Intel', 'Cisco', 'Adobe', 'Salesforce', 'Nvidia', 'Accenture', 'IBM', 'Oracle', 'Texas Instruments', 'Qualcomm', 'Automatic Data Processing', 'Intuit', 'Micron', 'Advanced Micro Devices', 'Auto Desk', 'HP', 'Amazon', 'Google'];

        var stockTickers = ['AAPL', 'MSFT', 'INTC', 'CSCO', 'ADBE', 'CRM', 'NVDA', 'ACN', 'IBM', 'ORCL', 'TXN', 'QCOM', 'ADP', 'INTU', 'MU', 'AMD', 'ADSK', 'HPQ', 'AMZN', 'GOOG'];

        var result = JSON.parse(xhr.responseText);
        var body = JSON.parse(result['body']);
        var predictions = body['predictions'];
        
        var resultElement = document.getElementById('stockAccordian');

        for (var stock = 0; stock < stockTickers.length; stock++) {
        
            var meanList = predictions[stock]['mean'];
            
            var prediction = formatPrediction(stockNames[stock], stockTickers[stock], meanList);
            
            resultElement.append(prediction);
                
        }
    
    }
    xhr.open(oFormElement.method, oFormElement.action, true);

    xhr.send();

    return false;
}

function formatPrediction(name, ticker, meanList) {

    var card = document.createElement('div');
    card.classList.add('card');

    var cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.id = ticker + 'heading';
    card.appendChild(cardHeader);

    var stockTitle = document.createElement('h2');
    stockTitle.classList.add('text-center');
    cardHeader.appendChild(stockTitle);

    var stockButton = document.createElement('button');
    stockButton.classList.add('btn', 'btn-link');
    stockButton.setAttribute('type', 'button');
    stockButton.setAttribute('data-toggle', 'collapse');
    stockButton.setAttribute('data-target', '#' + ticker + 'collapse');
    stockButton.innerHTML = name + '(' + ticker + ')';
    stockTitle.append(stockButton);


    var collapse = document.createElement('div');
    collapse.classList.add('collapse');
    collapse.id = ticker + 'collapse';
    collapse.setAttribute('data-parent', '#stockAccordian');
    card.appendChild(collapse);

    var row = document.createElement('div');
    row.classList.add('card-body', 'row', 'justify-content-center');
    collapse.appendChild(row);

    var tableContainer = document.createElement('table');
    tableContainer.classList.add('table-responsive', 'col-6');
    row.appendChild(tableContainer);

    var table = document.createElement('table')
    table.classList.add('table');
    tableContainer.appendChild(table);

    var thead = document.createElement('thead');
    table.appendChild(thead);

    var theadtr = document.createElement('tr')
    thead.appendChild(theadtr)

    var thDay = document.createElement('th');
    thDay.setAttribute('scope', 'col');
    thDay.innerHTML = 'Days';
    theadtr.appendChild(thDay);

    var thPrice = document.createElement('th');
    thPrice.setAttribute('scope', 'col');
    thPrice.innerHTML = 'Predicted Price';
    theadtr.appendChild(thPrice);

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (var day = 0; day < meanList.length; day++) {

        var tbodytr = document.createElement('tr');

        var tdDay = document.createElement('td');
        tdDay.innerHTML = day + 1;
        tbody.appendChild(tdDay);

        var tdPrice = document.createElement('td');
        tdPrice.innerHTML = meanList[day];
        tbody.appendChild(tdPrice);

        tbody.appendChild(tbodytr);
    }

    return card;

}