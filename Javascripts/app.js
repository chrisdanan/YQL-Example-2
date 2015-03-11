/*
 *References:
 * https://developer.yahoo.com/yql/console/#h=select+*+from+local.search+where+query%3D%22sushi%22+and+location%3D%22san+francisco%2C+ca%22
 *http://learn.jquery.com/ajax/working-with-jsonp/
*/

var main = function(){
	//console.log("Hello Vane!");

	var foodName; //Holds the value of the input textbox.

	var getRestaurants = function(){
		foodName = $("#foodName").val();

		$.ajax({
			//URL for the API
			url: "http://query.yahooapis.com/v1/public/yql",

			//Name of the callback parameter, as specified by the YQL service.
			jsonp: "callback",

			//Expecting jsonp.
			dataType: "jsonp",

			//Send in the query and that we want the results in JSON.
			data:{
				q: "select * from local.search where query = '" + foodName + "' and location = 'fullerton, ca'",
				format: "json"
			},

			//Call this function when the query is successful.
			success: function(response){
				console.log(response);

				var yqlresults = response.query.results.Result;  //Get the exact portion of the JSON response that we want.
				console.log(yqlresults);

				var restaurants = [];  //Holds the list of restaurants that the query brings up.
				var addresses = [];  //Holds the addresses of the restaurants.

				//Push the results into the arrays.
				yqlresults.forEach(function(element){
					restaurants.push(element.BusinessUrl);
					addresses.push(element.Address);
				});

				//Append the header for the results.
				$("#foodResults").append($("<h2>Restaurants found in Fullerton</h2>"));
				
				/*
				restaurants.forEach(function(element){
					if(element !== null){
						$("#foodResults").append($("<p>").text(element));
					}
				});
				*/

				//Put the results on the html page.
				for(var i = 0; i < yqlresults.length; i++){
					if(restaurants[i] !== null && addresses[i] !== null){
						//Wrap results in a div for sytling purposes.
						$("#foodResults").append("<div class='restaurantResult'>");
						$("#foodResults .restaurantResult:nth-child(" + i + ")").append($("<p>").text(restaurants[i]));
						$("#foodResults .restaurantResult:nth-child(" + i + ")").append($("<p>").text(addresses[i]));
					}
				}
			}
		});
	}//End of getRestaurants function.

	//Click the submit button.
	$("#submitFoodName").on("click", function(event){
		$("#foodResults").empty();
		getRestaurants();
	});
};

$(document).ready(main);

//t   
//fflvd