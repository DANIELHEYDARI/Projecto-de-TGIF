let url = ""

let total_datos = [];

if (window.location.href.includes("senate")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json"


} else {
  url = "https://api.propublica.org/congress/v1/113/house/members.json"
}



console.log(url)

fetch(url, {

    method: "GET",
    headers: {
      "X-API-Key": "MSMa6KuiKHnC1hwRcCNo4gZtUCU2lGnuHGHZ3QDL"
    }
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {

    total_datos = data.results[0].members;


    document.getElementById("house-data").innerHTML = tabla_Congress(total_datos);


    document.getElementById("stats").innerHTML = showRepeated_total_stats();

    total_stats_func();

    showRepeated_total_stats();

    document.getElementById("circulado").style.display = "none";

  })


function tabla_Congress(data) {
  let table = "";

  for (let i = 0; i < data.length; i++) {
    let name = data[i].first_name;
    let party = data[i].party;
    let state = data[i].state;
    let seniority = data[i].seniority;
    let votesWithParty = data[i].votes_with_party_pct;
    table = table + "<tr><td>" + name + "</td><td>" + party + "</td><td>" + state + "</td><td>" + seniority + "</td><td>" + votesWithParty + "</td></tr>";
  }
  return table;
}
////////////////////////////////////////////////////////////////////////////////////

function filter_by_Party() {

  let total = {
    republican: [],
    democrat: [],
    independet: []
  }

  total.republican = total_datos.filter(miembro => miembro.party == "R");

  total.democrat = total_datos.filter(miembro => miembro.party == "D");

  total.independet = total_datos.filter(miembro => miembro.party == "I");


  let filterR = document.getElementById("filterR");
  let filterD = document.getElementById("filterD");
  let filterE = document.getElementById("filterE");

  let arrayFinal = [];

  if (filterR.checked) {
    arrayFinal = arrayFinal.concat(total.republican);
  }
  if (filterD.checked) {
    arrayFinal = arrayFinal.concat(total.democrat);
  }
  if (filterE.checked) {
    arrayFinal = arrayFinal.concat(total.independet);
  }
  if (filterR.checked !== true && filterD.checked !== true && filterE.checked !== true) {
    arrayFinal = arrayFinal.concat(total_datos);
  }


  let filterValue = document.getElementById("stats").value;



  if (filterValue == "todo") {
    document.getElementById("house-data").innerHTML = tabla_Congress(arrayFinal);

  } else {


    let total_statsfilter_end = arrayFinal.filter(item => item.state == filterValue);
    document.getElementById("house-data").innerHTML = tabla_Congress(total_statsfilter_end);
  }


}
///////////////////////////////////////////////////////


//TODO: EL NOMBRE PARECE QUE MUESTRAS ESTADISTICAS, PONER EN GENERAL NOMBRES COHERENTES Y EN INGLES!
function total_stats_func() {

  let total_stats = [];

  for (let i = 0; i < total_datos.length; i++) {
    let state = total_datos[i].state;

    if (!total_stats.includes(state)) {
      total_stats.push(state) // push para meter en elemento como array
    }

  }
  total_stats.sort();
  return total_stats;
}

function showRepeated_total_stats() {

  let stats = total_stats_func();


  let result = "<option value='todo'>--All states--</option>";

  for (let i = 0; i < stats.length; i++) {
    result += "<option value='" + stats[i] + "'>" + stats[i] + "</option>";

  }
  //TODO: CIERRA LOS STATEMENTS QUE NO TIENEN PUNTO Y COMA 
  return result;
}