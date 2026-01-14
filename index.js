var priceInput = document.getElementById('price');
var usesInput = document.getElementById('uses');
var costAmount = document.getElementById('costAmount');
var verdictBadge = document.getElementById('verdictBadge');
var frequencyButtons = document.querySelectorAll('.freqBtn');
var currencyDropdown = document.getElementById('currencyDropdown');
var selectedCurrency = document.getElementById('selectedCurrency');
var currencyList = document.getElementById('currencyList');
var currencyItems = currencyList.querySelectorAll('.selectItem');
var currencySymbol = document.getElementById('currencySymbol');

currencyDropdown.querySelector('.selectSelected').addEventListener('click', function() {
    currencyList.classList.toggle('open');
});

window.addEventListener('click', function(e) {
    if (!currencyDropdown.contains(e.target)) {
        currencyList.classList.remove('open');
    }
});

currencyItems.forEach(function(item) {
    item.addEventListener('click', function() {
        currencyItems.forEach(function(i) { i.classList.remove('active'); });
        this.classList.add('active');
        selectedCurrency.textContent = this.textContent;
        currencySymbol.textContent = this.getAttribute('data-symbol');
        currencyList.classList.remove('open');
        calcCost();
    });
});

function calcCost(){
    var price = parseFloat(priceInput.value) || 0;
    var uses = parseInt(usesInput.value) || 0;
    var symbol = currencySymbol.textContent;

    if(price > 0 && uses > 0){
        var costPerUse = price / uses;
        costAmount.textContent = symbol + costPerUse.toFixed(2);
        updateVerdict(costPerUse);
    } else {
        costAmount.textContent = symbol + '0.00';
        updateVerdict(0);
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