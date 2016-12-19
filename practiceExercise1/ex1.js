// 1. Give them a save button 
// 2. give them a retrieve button
// 3. make a function to save stocks


//wait for the DOM 
var newHTML;

$(document).ready(function(){

	$("#arrow1").click(function(){
		$("#page1, #page2").animate(
		{
			"right":"100vw"
		},100)
	});

	$("#arrow2").click(function(){
		$("#page1, #page2").animate({
			"right":"0vw"
		},100)
	});	

	

	// See if the user has any stored stocks, if so then load them!

	var userStocksSaved = localStorage.getItem("userStocks");

	userStocksSaved = userStocksSaved.split(',');//split into an array

	// for (let i = 0; i < userStocksSaved.length; i++){
	// 	var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+userStocksSaved[i]+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
	// 	.getJSON(url ,function(dataJSGotIfAny){
	// 		var stockInfo = dataJSGotIfAny.query.results.quote;
	// 	});

	// 	var htmlToPlot = buildStockRow(userStocksSaved[i]);
	// 	$("#stock-body").append(htmlToPlot);
	// }

	$(".yahoo-form").submit(function(){
		//grab the ticker
		//Stop the form from submitting (default action will submit the form as fast as it can)
		event.preventDefault(); //prevents the form from submitting real real quick
		// get whatever the user entered for symbol and store 9it	
		var ticker = $("#ticker").val(); 
		localStorage.setItem("userStocks", ticker);//local storage is going to have a local variable that will be set to whatever the user has entered in the localStorage tag

		// set item takes two parameters, what the new variable should be called and what it should be set to
		

		//get stock symbol 
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+ticker+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		$.getJSON(url, function(dataJSGotIfAny){
			var stockInfo = dataJSGotIfAny.query.results.quote;

			if (dataJSGotIfAny.query.count == 1){
				$("#stock-body").html(buildStockRow(stockInfo));
			}else{
				for (let i = 0; i < stockInfo.length; i++){
					var htmlToPlot = buildStockRow(stockInfo[i]);
					$("#stock-body").html(htmlToPlot);		
				// console.log("hello");
				
				}	
			}
			
			
			// console.log(stockInfo);
			
				//for each object wtihin stockInfo, let's pass each individual object to our buildStockRow function
				
				// console.log(stockInfo[i]);
				// var htmlReplacement += buildStockRow(stockInfo[i]);
			
		});
	});
});

		// $("#stock-body").html(htmlReplacement);

		// if(stockInfo.Change.indexOf('+') > -1){
		// 	// there is a plus somewhere in this string if >-1
		// 	var classChange = "success";

		// }else{
		// 	var classChange = "danger";
		// }
		// var newHTML;	
		// 	newHTML += "<tr>";
		// 		newHTML += "<td>" + stockInfo.Symbol + "</td>"
		// 		newHTML += "<td>" + stockInfo.Name + "</td>"
		// 		newHTML += "<td>" + stockInfo.Bid + "</td>"
		// 		newHTML += "<td>" + stockInfo.Ask + "</td>"
		// 		newHTML += "<td class='"+classChange+"''>" + stockInfo.Change + "</td>"

		// 	newHTML += "</tr>";			

			
		// 	$("#stock-body").html(newHTML);			

			// newHTML2 += "<tr>";
			// 	newHTML += "<td>" + stockInfo.MarketCapitalization + "</td>"
			// 	newHTML += "<td>" + stockInfo.PERatio + "</td>"
			// 	newHTML += "<td>" + stockInfo.EarningsShare + "</td>"
			// 	newHTML += "<td>" + stockInfo.DividendYield + "</td>"
			// 	newHTML += "<td>" + stockInfo.AverageDailyVolume + "</td>"

			// newHTML += "</tr>";
			// console.log(dataJSGotIfAny);	
			// console.log(dataJSGotIfAny.query.results.quote);
			//javascript will run what it can right now. By the time it can go and get the data it could easily log to the console so it does it 
		//this method is built in jquery and it ttells javascript that I am ready to make an AJAX request - please go out and get some information for me 
		//parameters - param1 - where to go(URL), param2 = (what2do)
		






function buildStockRow(stock){
	console.log("hi");
	
	if(stock.Change.indexOf('+') > -1){
			// there is a plus somewhere in this string if >-1
			var classChange = "success";

		}else{
			var classChange = "danger";
		}	


	newHTML += "<tr>";
		newHTML += "<td>" + stock.Symbol.toUpperCase() + "</td>"
		newHTML += "<td>" + stock.Name + "</td>"
		newHTML += "<td>" + stock.Bid + "</td>"
		newHTML += "<td>" + stock.Ask + "</td>"
		newHTML += "<td class='"+classChange+"''>" + stock.Change + "</td>"
	newHTML += "</tr>";
	console.log("hi");
	return newHTML;

	

}

function getJSON(symbol){

}