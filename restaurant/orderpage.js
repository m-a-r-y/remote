Parse.initialize("0ehE3x8PyWhvp9gboCISiMz7gL8IfonFChetw7Cz", "9XgdnH7iMTmeaxEabD8nM4vgS20LKkTtiB0X58QF");

$(document).ready(function(){

	var parseData = function() {
 
        var order = Parse.Object.extend("OrderForm");
        var query = new Parse.Query(order);
        query.find({
            success: function (results) {
                var orderP = '';
                results.forEach(function (r, i) {
                    //orderP = $("", { class: 'restaurant', "id": r.id, text: r.attributes.Name });
                    orderP = "<tr><td>"+r.attributes.menu_items+"</td><td class='name'>"+r.attributes.name+"</td><td class='email'>"+r.attributes.email_address+"</td><td>"+r.attributes.phone_number+"</td><td>"+r.attributes.notes+"</td></tr>"
                    $('tbody').append(orderP);

                    // console.log($(r.attributes.email_address));
                });

                var order = "desc";
			    $('#emailsort').on('click', function(){

			    	if(order == "desc") {
						$('tbody>tr').tsort('td',{order:"asc"});
						order = "acs";
			    	} else {
			    		$('tbody>tr').tsort('td',{order:"desc"});
			    		order = "desc";
			    	}
				});
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
    	});

    }
    parseData();


});	