var priceInput = document.getElementById('price');
var usesInput = document.getElementById('uses');
var costAmount = document.getElementById('costAmount');
var verdictBadge = document.getElementById('verdictBadge');
var frequencyButtons = document.querySelectorAll('.freqBtn');

function calcCost(){
    var price = parseFloat(priceInput.value) || 0;
    var uses = parseInt(usesInput.value) || 0;

    if(price > 0 && uses > 0){
        var costPerUse = price / uses;
        costAmount.textContent = '€' + costPerUse.toFixed(2);
        updateVerdict(costPerUse);
    }
}

function updateVerdict(cost){
    verdictBadge.className = 'verdictBadge';

    if(cost < 0.1){
        verdictBadge.classList.add('verdict-excellent');
        verdictBadge.textContent = 'Amazing Value!!!';
    }
    else if(cost < 1){
        verdictBadge.classList.add('verdict-great');
        verdictBadge.textContent = 'Great Value!';
    }
    else if(cost < 5){
        verdictBadge.classList.add('verdict-decent');
        verdictBadge.textContent = 'Decent Value';
    }
    else if(cost < 10){
        verdictBadge.classList.add('verdict-consider');
        verdictBadge.textContent = `Meh, maybe`;
    }
    else{
        verdictBadge.classList.add('verdict-expensive');
        verdictBadge.textContent = `I wouldn't buy it.`;
    }
}


frequencyButtons.forEach(function(button){
    button.addEventListener('click', function(){
        frequencyButtons.forEach(function(btn){
            btn.classList.remove('active');
        });
        this.classList.add('active');
        var freq = this.getAttribute('data-freq');
        if(freq === 'Daily'){
            usesInput.value = 365;
        } else if(freq === 'Weekly'){
            usesInput.value = 52;
        } else if(freq === 'Monthly'){
            usesInput.value = 12;
        } else if(freq === 'Custom'){
            usesInput.value = 1;
        }
        calcCost();
    });
});

priceInput.addEventListener('input', calcCost);
usesInput.addEventListener('input', calcCost);

calcCost();