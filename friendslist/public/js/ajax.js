var friends = $("#friends");
var nameIn = $("#name");
var ageIn = $("#age");

//Mustache functionality
var friendTemplate=  "" + 
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" + 
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<button id='{{id}}' class='remove'>X</button>" +
	"</li>";
//Takes data from DOM and fills it into the string
//Add the friend to the DOM
function addFriend(friend){
	friends.append(Mustache.render(friendTemplate, friend))
};

$(document).ready(function(){
	//Populates page with friends already in API
	$.ajax({
		type: "GET",
		url: "http://rest.learncode.academy/api/learncode/friends",
		success: function(friends){
			//$.each is really a built in jquery iterator
			$.each(friends,function(i, friend){
				addFriend(friend);
			})
		},
		error: function(){
			alert("Error loading friends");
		},
	});
	//add a friend (Miguel)
	$("#add-friend").on("click", function(){
		var friend = {
			name: nameIn.val(),
			age: ageIn.val(),

		}
		//Post new friend to the api
		$.ajax({
			type: "POST",
			url: "http://rest.learncode.academy/api/learncode/friends",
			data: friend,
			success: function(newFriend){
			//$.each is really a built in jquery iterator
				addFriend(newFriend)
		},
			error: function(){
				alert("Error adding friends");
		}
	});

	});
	//Deleting a friend functionality
	//Going to use delegate
	friends.delegate(".remove", "click", function(){
		var $li= $(this).closest('li');

		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/learncode/friends/' +$(this).attr('id'),
			success: function(){
				$li.fadeOut(300,function(){
					$(this).remove();
				});
			}

		});
		
	})


})