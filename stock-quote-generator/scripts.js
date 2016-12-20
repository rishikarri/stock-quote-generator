
var newHTML = "";
$(document).ready(function(){


	// let's create functionality for the click button
	$("#stock-form").submit(function(){
		event.preventDefault();

		var ticker = $("#ticker-text").val(); 

		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'"+ticker+"'%22)%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json";
		console.log(ticker);
		console.log(url);

		//JSON takes xml and transforms it into a javascript object notation

		$.getJSON(url, function(dataJSGot){
			// console.log(dataJSGot);
			var stockInfo = dataJSGot.query.results.quote;
			console.log(stockInfo);
			console.log(stockInfo[0]);

			// build stock body logic 
			//if there is only one ticker entered
			if(stockInfo.length >= 2){
				console.log("multiple rows");
				console.log(stockInfo.length);

				for(var i = 0; i < stockInfo.length; i++){
					buildStockRow(stockInfo[i]);
					$("#stock-body").html(newHTML);
				}

			}else{
				
				// JSON returns an array if there are more than one. IF there is only one, it simply returns an object rather than an array with only one object in ir
				buildStockRow((stockInfo));
				$("#stock-body").html(newHTML);
			}
			


		});
		// 	// var stockInfo = dataJSGot.query.results.quote;
		// 	// console.log(stockInfo);
		// });

		// write html so that the stock body gets updated


	});
});

function buildStockRow(stock){
	console.log("hi");

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