function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function init() {
    var svg = document.querySelector('svg');
    var val = Array.apply(null, {
        length: 15
    }).map(Number.call, Number);
    shuffle(val);
    var i = 1;
    while (i < 16) {
        var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        g.setAttribute('val', val[i - 1] + 1);
        g.setAttribute('pos', i);
        var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.appendChild(document.createTextNode(val[i - 1] + 1));
        g.appendChild(rect);
        g.appendChild(text);
        svg.appendChild(g);
        i += 1;
    }
    var all = document.querySelectorAll('g');
    for (i in all) {
        if (!all[i].childNodes) continue;
        all[i].onclick = function() {
            move(this);
        }
    }
}

function move(r) {
    var pos = r.getAttribute("pos");
    //find hole
    var hole = 1;
    while (document.querySelector("g[pos='" + hole + "']")) hole += 1;
    var pi, pj, hi, hj;
    pi = (pos - 1) % 4 + 1;
    pj = Math.ceil(pos / 4);
    hi = (hole - 1) % 4 + 1;
    hj = Math.ceil(hole / 4);
    //same column
    if (pi == hi) {
        if (pj - hj == 1 || hj - pj == 1) r.setAttribute("pos", hole);
    }
    //same row
    else if (pj == hj) {
        if (pi - hi == 1 || hi - pi == 1) r.setAttribute("pos", hole);
    }
    if (check()) setTimeout(function() {
        alert('You win !!!');
        location.reload();
    }, 400);
}

function check() {
    var all = document.querySelectorAll('g');
    for (i in all) {
        if (!all[i].childNodes) continue;
        if (all[i].getAttribute('pos') != all[i].getAttribute('val')) return false;
    }
    return true;
}
