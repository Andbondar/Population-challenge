/**
 * Created by Andrew on 20.08.2014.
 */
$(document).ready(function() {
    setInterval(unemployedGenerator, 10000);
    setInterval(updateCount, 100);

    var population = {
        unemployed: 2,
        farmers: 0,
        scientists: 0,
        government: 0
    };

    var resources = {
        money: 20,
        food: 30,
        reputation: 0
    };

    function updateCount() {
        $('#unemployed_count').text(population.unemployed);
        $('#farmers').text(population.farmers);
        $('#scientists').text(population.scientists);
        $('#government').text(population.government);
        $('#money').text(resources.money);
        $('#food').text(resources.food);
        $('#reputation').text(resources.reputation);
    }

    function sendMessage(text) {
        var message = $('p').filter('.message');
        message.remove();//all messages are cleared if something was displayed before
        $('body').append('<p class="message">'+text.toString(10)+'</p>');
        message.delay(2000).fadeOut('slow');
    }

    function unemployedGenerator() {
       population.unemployed += 1;
    }

    $("#farm_button").click(function() { //if unemployed citizen and 5 food are available - convert unemployed to farmer
        if (population.unemployed >= 1) {
            if (resources.food >= 5){
                population.unemployed -= 1;//decrease unemployed count by 1
                population.farmers += 1;//increase farmers count by 1
                resources.food -= 5;//decrease food count by 5
            } else{
                sendMessage('Not enough food. Train more farmers.');
            }
        } else{
            sendMessage('There are currently no unemployed citizens for work on farm.');
        }
    });

});