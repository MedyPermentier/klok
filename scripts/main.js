// Digitale klok
var u,m,s; // Variabelen van de uren, minuten en seconden
var tlm = new TimelineMax(); // Creeeren van een TimelineMax (Tweenmax) variabele

function showKlok(){
    var tijd = new Date();
    u = tijd.getHours(); // Haal de actuele uren op, 0 - 23
    m = tijd.getMinutes(); // Haal de actuele minuten op, 0 - 59
    s = tijd.getSeconds(); // Haal de actuele seconden op, 0 - 59
    
    if(u == 24){ // Als het uur gelijk is aan cijfer 24
        u = 0; // Laat dan een 0 zien
    }
    
    if(u > 24){ // Als het uur groter is dan 24
        u = u - 24; // Doe dan het uur (groter dan 24) aftrekken van 24 (bijvoorbeeld 25-24=1, dus 1 uur)
    }
    
    u = (u < 10) ? "0" + u : u; // Als het uur kleiner is dan 10, plak er dan een 0 voor, bijvoorbeeld 05
    m = (m < 10) ? "0" + m : m; // Als het aantal minuten kleiner is dan 10, plak er dan een 0 voor
    s = (s < 10) ? "0" + s : s; // Als het aantal seconden kleiner is dan 10, plak er dan een 0 voor
    
    var showTijd = u + " " + m + " " + s; // Manier waarop de klok te zien in de browser.

    // Zet de klok in de browser op de plek met id 'klokDisplay'
    document.getElementById("klokDisplay").innerText = showTijd;
    document.getElementById("klokDisplay").textContent = showTijd;

    setTimeout(showKlok, 1000);
}



// Datum
var vandaag = new Date();

var dag = vandaag.getDate(); // Haal de actuele dag in de maand op
var maand = vandaag.getMonth() + 1; // Haal de actuele maand op. +1, omdat de maanden beginnen bij 1 en niet bij 0, zoals js doet
var jaar = vandaag.getFullYear(); // Haal het actuele jaar op

if (dag < 10) { // Als de dag onder de 10 is
  dag = '0' + dag // Plak dan een 0 ervoor, bijvoorbeeld de eerste dag van de maand --> 01
}
if (maand < 10) { // Als de maand onder de 10 is
  maand = '0' + maand // Plak dan een 0 ervoor, bijvoorbeeld de eerste maand van het jaar --> 01
}

var showDatum = document.getElementById("datum"); // Haal het id 'date' op

showDatum.innerHTML = dag + "." + maand + "." + jaar; // En plak hier de actuele datum op deze manier



// Animate per dagdeel
function dagdeel (){
    if (u > 19 || u < 6) { // Als het na 7 uur 'savonds en 6 uur 'sochtends is
      document.body.className = "nacht"; // Laat dan de achtergrond zien met de classname 'night'
      document.getElementById("img").src = "images/maan.png"; // Laat bij het id 'img' het maan plaatje zien

      // Tweenmax animatie
      tlm.from("#img", 5, {opacity: 0, delay: 1.5}, 0) // Het erin laten faden van het plaatje
         .from("#img", 10, {rotationY: 180, repeat: -1, ease:Power0.easeNone}, 0) // Draaien om as animatie --> heen
         .from("#img", 10, {rotationY: -180, repeat: -1, ease:Power0.easeNone}, 0); // Draaien om as animatie --> terug
    }

    else if (u > 5 && u < 9) { // Als het na 5 uur 'sochtends is en voor 9 uur 'sochtends
      document.body.className = "sunrise"; // Laat dan de achtergrond zien met de classname 'sunrise'
      document.getElementById("img").src = "images/sunset.png"; // Laat bij het id 'img' het sunset plaatje zien

      // Tweenmax animatie
      tlm.from("#img", 2, {opacity: 0, delay: 1.5}, 0) // Het erin laten faden van het plaatje
         .from("#img", 5, {repeat: -1, ease:Power2.easeNone, y:60}, 0); // Het plaatje van beneden naar boven laten bewegen
    }

    else if (u > 16 && u < 20) { // Als het na 4 uur 'smiddags en voor 8 uur 'savonds is
      document.body.className = "sunset"; // Laat dan de achtergrond zien met de classname 'sunset'
      document.getElementById("img").src = "images/sunset.png"; // Laat bij het id 'img' het sunset plaatje zien

      // TweenMax animatie
       tlm.from("#img", 2, {opacity: 0, delay: 1.5}, 0) // Het erin laten faden van het plaatje
          .from("#img", 5, {repeat: -1, ease:Power2.easeNone, y:-60}, 0); // Het plaatje van boven naar beneden laten bewegen
    }

    else { // In alle andere gevallen (overdag)
      document.body.className = "dag"; // Laat dan de achtergrond zien met de classname 'day'
      document.getElementById("img").src = "images/zon.png"; // Laat bij het id 'img' het zon plaatje zien

      // Tweenmax animatie
      tlm.from("#img", 2, {opacity: 0, delay: 1.5}, 0) // Het erin laten faden van het plaatje
         .from("#img", 70, {rotation: 360, repeat: -1, ease:Power0.easeNone}, 0); // De zon laten draaien
    }
};


// Voer deze functie's uit
showKlok();
dagdeel();


// TweenMax animaties
tlm.from(".klok", 2.5, {opacity:0, scale:0, ease:Power3.easeNone}, 0) // Erin laten faden van de klok
   .from("#datum", 2.5, {opacity:0, scale:0, ease:Power3.easeNone}, 0); // Erin laten faden van de datum tegelijkertijd met de klok

