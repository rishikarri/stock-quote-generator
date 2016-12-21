
var newHTML = "";
var stockObjectsArray = [];

$(document).ready(function(){


	// let's create functionality for the click button
	$("#stock-form").submit(function(){
		event.preventDefault();

		var ticker = $("#ticker-text").val(); 

		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'"+ticker+"'%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
		//JSON takes xml and transforms it into a javascript object notation

		$.getJSON(url, function(dataJSGot){
			// console.log(dataJSGot);
			var stockInfo = dataJSGot.query.results.quote;

			//push symbols to array

			// build stock body logic 
			//if there is only one ticker entered
			if(stockInfo.length >= 2){
				console.log("multiple rows");
				console.log(stockInfo.length);

				for(var i = 0; i < stockInfo.length; i++){
					buildStockRow(stockInfo[i]);
					$("#stock-body").html(newHTML);
					//if there are multiple objects, you get an array, push each one to the array using the for looop
					stockObjectsArray.push(stockInfo[i]);
				}

			}else{
				
				// JSON returns an array if there are more than one. IF there is only one, it simply returns an object rather than an array with only one object in ir
				buildStockRow((stockInfo));
				$("#stock-body").html(newHTML);
				// if there i sonly one just push it to the stockObjectsArray
				stockObjectsArray.push(stockInfo)
			}
			


		});
		// 	// var stockInfo = dataJSGot.query.results.quote;
		// 	// console.log(stockInfo);
		// });

		// write html so that the stock body gets updated


	});
});

function buildStockRow(stock){

	// If the market is actually open and there is a daily change
	if(Math.abs(0 - stock.Change) > 0){
		if(stock.Change.indexOf('+') > -1){
			// there is a plus somewhere in this string if >-1
			var classChange = "success";

		}else{
			var classChange = "failure";
		}		
	}	

	newHTML += "<tr>";
		newHTML += "<td>" + stock.Symbol.toUpperCase() + "</td>"
		newHTML += "<td>" + stock.Name + "</td>"
		newHTML += "<td>" + stock.Bid + "</td>"
		newHTML += "<td>" + stock.Ask + "</td>"
		newHTML += "<td class='"+classChange+"''>" + stock.Change + "</td>"
	newHTML += "</tr>";
	

}

function saveStocks(){
	var tickerArray = [];

	for (let i = 0; i < stockObjectsArray.length; i++)
	{
		tickerArray.push(stockObjectsArray[i].symbol);
	}

			
	
	localStorage.setItem("session1", tickerArray);
	
}


function retrieveStocks(){
	// grab stocks in string form and conver to array
	var tickerStringRetrieved = localStorage.getItem("session1");
	var tickerArrayRetrieved = tickerStringRetrieved.split(',');
	// console.log(tickerArrayRetrieved);	

	// generate a stock object for every object we are retrieving
	for(let i = 0; i < tickerArrayRetrieved.length; i++){

		generateStockObject(tickerArrayRetrieved[i])
	}
	
}




function clearStockObjectsArray(){
	stockObjectsArray = []; 
}

function generateStockObject(ticker){
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+ticker+"%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
	//if this works this should generate a url that I can click on and access the query for the specific stock this function received 
	// console.log(url);
	console.log(url);
	
	$.getJSON(url, function(stockData){
		var stockInformation = stockData.query.results.quote; 	
		console.log(stockInformation);
		buildStockRow(stockInformation);
		$("#stock-body").html(newHTML);
		
	})
	//START HERE - build url into a fucntion that returns a stockObject which you can then use to send to build stock row
	// $.getJSON(url, function(dataJSGot){
	

}

