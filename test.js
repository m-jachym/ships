let ships = [
    { locations: [0, 0, 0] },
    { locations: [0, 0, 0] },
    { locations: [0, 0, 0] }
  ];
  
let zatopiony = 0;
  function hitMiss(box) {
    let allLocs = box.reduce((a, c) => a.concat(c.locations), []);
    console.log(allLocs);
    $("td").on("click", function() {
      let y = +$(this).attr("id");
      
      if (allLocs.find(boxId => boxId == y)) {
        $(this).addClass("traf");
        document.querySelector("p").textContent = "trafiony";
        zatopiony++;
        if (zatopiony % 3 === 0) {
            document.querySelector("p").textContent = "zatopiony";
            
        }
        if (zatopiony % 9 === 0) {
            document.querySelector("p").textContent = "Zatopiłeś wszystkie okręty!";
        }
      } else {
        $(this).addClass("pudlo");
        document.querySelector("p").textContent = "pudło";
        
      }
    });
  }
////////////////////// Generowanie losowe statków
function generateShipLocations() {
    let locations;
    for (let i = 0; i < 3; i++) {
        do {
            locations = generateShip();
        } while (collision(locations));
        ships[i].locations = locations;
    }
};
function generateShip() {
    let direction = Math.floor(Math.random() * 2)
    let row, col;
    if (direction === 1) {
        row = Math.floor(Math.random() * 7);
        col = Math.floor(Math.random() * (7 - 3));
    } else {
        row = Math.floor(Math.random() * (7 - 3));
        col = Math.floor(Math.random() * 7);
    }

    let newShipLocations = [];
    for (let i = 0; i < 3; i++) {
        if (direction === 1) {
            newShipLocations.push(row + "" + (col + i));
        } else {
            newShipLocations.push((row + i) + "" + col);
        }
    }
    return newShipLocations;
};
function collision(locations) {
    for (let i = 0; i < 3; i++) {
        let ship = ships[i];
        for (let j = 0; j < locations.length; j++) {
            if (ship.locations.indexOf(locations[j]) >= 0) {
                return true;
            }
        }
    }
    return false;
};

window.onload = init;

function init() {
    generateShipLocations();
    hitMiss(ships);
}







