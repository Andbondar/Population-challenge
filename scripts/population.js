/**
 * Created by Andrew on 20.08.2014.
 * Mike
 */
$(document).ready(function() {

    $('.tooltip').tooltipster({ //http://iamceege.github.io/tooltipster/
        theme: 'tooltipster-light',
        position: 'bottom-right',
        maxWidth: 120
    });

    setInterval(unemployedGenerator, 10000);
    setInterval(foodProduction, 10000);

    var population = {
        unemployed: 2,
        farmers: 0,
        scientists: 0,
        government: 0,
        total: 0
    };

    var resources = {
        money: 20,
        food: 30,
        reputation: 0,
        score: 0
    };

    var research = {
        farmLevel: 0,
        farmExperience: 0,
        scienceLevel: 0,
        scienceExperience: 0
    };

    updateCount();

    function updateCount() {
        $('#unemployed_count').text(population.unemployed);
        $('#farmers').text(population.farmers);
        $('#scientists').text(population.scientists);
        $('#government').text(population.government);
        population.total = population.farmers + population.scientists + population.government + population.unemployed;
        $('#population_count').text(population.total);
        $('#money').text(resources.money);
        $('#food').text(resources.food);
        $('#reputation').text(resources.reputation);
        $('#farm_level').text(research.farmLevel);
        $('#farm_experience').text(research.farmExperience);
        $('#science_level').text(research.scienceLevel);
        $('#science_experience').text(research.scienceExperience);
        $('#score').text(resources.score);
    }

    function sendMessage(text) {
        $('#messages').text(text).show().delay(3000).fadeOut('slow');
    }

    function unemployedGenerator() {
        population.unemployed += 1;
        updateCount();
    }

    $("#farm_button").click(function() {
        if (population.unemployed >= 1) {
            if (resources.food >= 5) {
                population.unemployed -= 1;
                population.farmers += 1;
                resources.food -= 5;
                updateCount();
            } else {
                sendMessage(errorMessages.notEnoughFood);
            }
        } else {
            sendMessage(errorMessages.notEnoughUnemployed);
        }
    });

    $('#science_button').click(function() {
        if (population.unemployed >= 1) {
            if (resources.food >= 10) {
                if (resources.money >= 10) {
                    population.unemployed -= 1;
                    population.scientists += 1;
                    resources.food -= 10;
                    resources.money -= 10;
                    updateCount();
                } else {
                    sendMessage(errorMessages.notEnoughMoney);
                }
            } else {
                sendMessage(errorMessages.notEnoughFood);
            }
        } else {
            sendMessage(errorMessages.notEnoughUnemployed);
        }
    });

    function foodProduction() {
        resources.food = resources.food + population.farmers * 3 - population.total;
        foodConsumption();
    }

    function foodConsumption() {
        //TODO formula for consuming food
        if (resources.food < 0) {
            population.unemployed = parseInt(Math.floor(population.unemployed * 0.5)); //50% of unemployed died
            population.scientists = parseInt(Math.floor(population.scientists * 0.8)); //20% of scientists died
            resources.food = 0;
            updateCount();
            sendMessage(eventMessages.famine);
            return;
        } else if (population.total > resources.food) {
            sendMessage(warningMessages.famineDanger);
        }
        updateCount();
    }

});