Parse.initialize("0ehE3x8PyWhvp9gboCISiMz7gL8IfonFChetw7Cz", "9XgdnH7iMTmeaxEabD8nM4vgS20LKkTtiB0X58QF");

$(document).ready(function(){

 var parseData = function() {

  var restaurant = Parse.Object.extend("restaurant");
  var query = new Parse.Query(restaurant);
  query.find({
    success: function (results) {
      var context = { list: results };
      refreshList(context);
},
error: function (error) {
  alert("Error: " + error.code + " " + error.message);
}
});

var MenuItem = Parse.Object.extend("MenuItem");
var query = new Parse.Query(MenuItem);
query.find({
  success: function(results) {
     var context2 = { list2: results };
      refreshList2(context2);

    var sum = 0;
    $(".checked").on("click", function() {
     if($(this).is(':checked')){
       sum = sum + parseInt($(this).attr("data-price"));
     } else {
       sum = sum - parseInt($(this).attr("data-price"));
     }

     $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
     $("#total").text("Total amount due: $"+ sum + ".");

   });

    $(".item").hide();

$("#restListContainer").on("change", function(event) {
 $( "option:selected" ).each(function() {
  $(".item").hide().filter("[data-source=" + this.id + "]").show();
});
 $("option:selected").hide().filter("[data-source=" + this.id + "]").show();  
 $("li").each(function(){
  $(this).children('input')[0].checked = false;
});    

 sum = 0;
 $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
 $("#total").text("Total amount due: $"+ sum + ".");
});

},

error: function(error) {
  alert("Error: " + error.code + " " + error.message);
}
});
};
parseData();

var saveNewRestaurantItem = function(email, notes, phone_number, menu_item, successCb) {
 var submit = Parse.Object.extend("OrderForm");
 var menu = new submit();

 menu.set("email_address", email);
 menu.set("notes", notes);
 menu.set("phone_number", phone_number);
 menu.set("menu_items", menu_item);


 menu.save(null, {
   success: function(menu){
               //successCb();
               alert('Thank you, come again!');
             },
             error: function(menu, error) {
               console.log('Failed to create a new object, with error code: ' + error.message);
             }
           });
};

$('#submit').on('click', function(e){ 
  e.preventDefault();
  var userInput = $('.userInput');
  var phone = userInput.find("#phone").val();
  var email = userInput.find("#email").val();
  var comment = userInput.find("#comments").val();
  var item = [];
  $('#menuItems li').each(function(){
    if($(this).children('input')[0].checked) {
      item.push($(this).text());
    };
  });
  item = item.join(",");

// console.log(comment);
// alert("thank you, come again");
saveNewRestaurantItem(email, comment, phone, item);
})

$('button').click(function(){
  window.location.href='orderpage.html';
});

var source  = $("#resList").html();
var source2 = $("#itemList").html();
var template = Handlebars.compile(source);
var template2 = Handlebars.compile(source2);
var refreshList = function(data){
    var html    = template(data);
    $("#restListContainer").html(html);
};

var refreshList2 = function(data){
    var html    = template2(data);
    $("#menuItems").html(html);
};


});
