
function shake() {
    var simple = document.querySelector('.simple');
    simple.className = "simple apply-shake";
}

function addListener() {
    var simple = document.querySelector('.simple');
    simple.addEventListener('animationend', function() {
        simple.className = "alt";
    });
}
addListener();
shake()