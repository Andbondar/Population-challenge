/**
 * Created by Andrew on 20.08.2014.
 */
$(document).ready(function(){
    setInterval(unemployedGenerator,10000);
    setInterval(visualization, 10000);

    var population = {
        unemployed:parseInt($("#unemployed_count").html(),10),
        farmers:0,
        scientists:0,
        government:0
    };
    var resources = {
        money:parseInt($("#money").text(),10),
        food:parseInt($('#food').text(),10),
        reputation:parseInt($('#reputation').text(),10)
    };

    function visualization(){
        $('#unemployed_count').text(population.unemployed);
        $('#farmers').text(population.farmers);
        $('#food').text(resources.food);
        $('#money').text(resources.money);
    }

    function sendMessage(text){
        var message = $('p').filter('.message');
        message.remove();//all messages are cleared if something was displayed before
        $('body').append('<p class="message">'+text.toString(10)+'</p>');
        message.delay(2000).fadeOut('slow');
    }

    var increment=1;
    function unemployedGenerator(){
       population.unemployed+=increment;
    }

    $("#farm_button").click(function() { //if unemployed citizen and 5 food are available - convert unemployed to farmer
        var foodCount = resources.food;
        if (population.unemployed>=1){
            if (foodCount>=5){
                population.unemployed-=1;//decrease unemployed count by 1
                population.farmers+=1;//increase farmers count by 1
                resources.food-=5;//decrease food count by 5
            }
            else{
                sendMessage('Not enough food. Train more farmers.');
            }
        }
        else{
            sendMessage('There are currently no unemployed citizens for work on farm.');
        }
    });


});