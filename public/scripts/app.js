//Creating an event listener that will append whatever is written inside of the input box to a new li

$(document).ready(function() {
	console.log('sanity check')
//Adding an event listener to the form that will act when the user presses the enter key or the submit button

	    $('#todo').on('submit', function(event) {
	    event.preventDefault();

//Creating a variable called "addOn" that has a value of whatever is typed into the input box

    	var addOn = $('input[name=textBox]').val();

//Appending what is written in the input box to a new li element in the ul

    	$('ul').append('<li>' + addOn + '</li>');

//Clearing out the input box after the user has submit the text that was inside of it

    	$('input[name=textBox]').val('');
    });
});