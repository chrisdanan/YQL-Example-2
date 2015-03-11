/*
 *References:
 * https://developer.yahoo.com/yql/console/#h=select+*+from+local.search+where+query%3D%22sushi%22+and+location%3D%22san+francisco%2C+ca%22
 *http://learn.jquery.com/ajax/working-with-jsonp/
*/

var main = function(){
	//console.log("Hello Vane!");

	var storeName; //Holds the value of the input textbox.

	var getStores = function(){
		storeName = $("#storeName").val();

		$.ajax({
			//URL for the API
			url: "http://query.yahooapis.com/v1/public/yql",

			//Name of the callback parameter, as specified by the YQL service.
			jsonp: "callback",

			//Expecting jsonp.
			dataType: "jsonp",

			//Send in the query and that we want the results in JSON.
			data:{
				q: "select * from local.search where query = '" + storeName + "' and location = 'fullerton, ca'",
				format: "json"
			},

			//Call this function when the query is successful.
			success: function(response){
				console.log(response);

				var yqlresults = response.query.results.Result;  //Get the exact portion of the JSON response that we want.
				console.log(yqlresults);

				var stores = [];  //Holds the list of stores that the query brings up.
				var addresses = [];  //Holds the addresses of the stores.

				//Push the results into the arrays.
				yqlresults.forEach(function(element){
					stores.push(element.BusinessUrl);
					addresses.push(element.Address);
				});

				//Append the header for the results.
				$("#storeResults").append($("<h2>stores found in Fullerton</h2>"));
				
				/*
				stores.forEach(function(element){
					if(element !== null){
						$("#storeResults").append($("<p>").text(element));
					}
				});
				*/

				//Put the results on the html page.
				for(var i = 0; i < yqlresults.length; i++){
					if(stores[i] !== null && addresses[i] !== null){
						//Wrap results in a div for sytling purposes.
						$("#storeResults").append("<div class='storeResult'>");
						$("#storeResults .storeResult:nth-child(" + i + ")").append($("<p>").text(stores[i]));
						$("#storeResults .storeResult:nth-child(" + i + ")").append($("<p>").text(addresses[i]));
					}
				}
			}
		});
	}//End of getStores function.

	//Click the submit button.
	$("#submitStoreName").on("click", function(event){
		$("#storeResults").empty();
		getStores();
	});
};

$(document).ready(main);

//t   
//fflvd