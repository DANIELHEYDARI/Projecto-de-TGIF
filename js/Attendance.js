let url = ""
if (window.location.href.includes("House") ) {

    url = "https://api.propublica.org/congress/v1/113/house/members.json"
} else {

    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
}

let total_datos = [];

fetch(url, {
        headers: {
            "X-API-Key": "MSMa6KuiKHnC1hwRcCNo4gZtUCU2lGnuHGHZ3QDL"
        }
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

        total_datos = data.results[0].members;



        document
            .getElementById("Attendance_LeastEngaged")
            .innerHTML = tabla_Congress_LeastEngaged();

        document
            .getElementById("Attendance_MostEngaged")
            .innerHTML = tabla_Congress_MostEngaged();
        
            
            tabalHouse_glance();

        document.getElementById("circulado").style.display = "none";

    })


////////////////////////////////////////////////////////////////////////////////


function tabla_Congress_LeastEngaged() {
    let table_c_m = "";
    let totalHouseSmallToBig = total_datos;
    // totalHouseSmallToBig = sort array from small to big
    totalHouseSmallToBig.sort((a, b) => {
        return b.missed_votes - a.missed_votes
    });
    table_c_m = returnHtmlTableSection(totalHouseSmallToBig);
    return table_c_m
}


function tabla_Congress_MostEngaged() {
    let table_c_m = "";
    let totalHouseBigToSmall = total_datos;
    // totalHouseSmallToBig = sort array from big to small
    totalHouseBigToSmall.sort((a, b) => {
        return a.missed_votes - b.missed_votes
    });
    //TODO: CAMBIAR ESTO, UN RETURN NO PUEDE RETORNAR UNA LLAMADA A UNA FUNCION
    table_c_m=returnHtmlTableSection(totalHouseBigToSmall);
    return table_c_m;
}

/////////////////////////////////////////////////////////////////

/* Utilities */

function returnHtmlTableSection(data) {
    let tableHouse = "";
    for (let i = 0; i < (data.length) * 0.1; i++) {
        let firstName = data[i].first_name;
        let middelName = data[i].middle_name
        let lastName = data[i].last_name;

        let of_Missed_Votes = data[i].missed_votes;

        let missed_votes_pct = data[i].missed_votes_pct;

        if (middelName == null) {
            middelName = "";
        }
        tableHouse += "<tr><td><a href=" + "linkedin.com/in/daniel-heydari-91961bab" + ">" + firstName + " " + middelName + " " + lastName + "</a></td><td>" + of_Missed_Votes + "</td><td>" + missed_votes_pct + "</td><td>" + "</td></tr>";
    }
    return tableHouse;
}

/* End of Utilities */

//////////////////////////////

function tabalHouse_glance(){


    let todosElementos = at_a_glance();
   
    //TODO: METER ESTO EN UNA FUNCION
    document.getElementById("n_of_Reps_Democrats").innerText = todosElementos.n_of_Reps_Democrats;
    document.getElementById("n_of_Reps_Republicans").innerText = todosElementos.n_of_Reps_Republicans;
    document.getElementById("n_of_Reps_Independets").innerText = todosElementos.n_of_Reps_Independets;
    document.getElementById("total").innerText = innerText = todosElementos.n_of_Reps_Independets + todosElementos.n_of_Reps_Republicans + todosElementos.n_of_Reps_Democrats;


    let pct_Democrats1 = (todosElementos.pct_Democrats / todosElementos.n_of_Reps_Democrats).toFixed(2); //tofixed(2 parametr despoes de0)
    let pct_Republicans2 = (todosElementos.pct_Republicans / todosElementos.n_of_Reps_Republicans).toFixed(2);
    let pct_Independets3 = (todosElementos.pct_Independets / todosElementos.n_of_Reps_Independets).toFixed(2);
    if (pct_Independets3 == "NaN") {
        pct_Independets3 = 0
    };
    let pct_total = parseFloat(pct_Republicans2 + pct_Democrats1 + pct_Independets3).toFixed(2) + "%";

    //let pct_total=Math.round(   *100)/100+"%";
    
    document.getElementById("pct_Democrats").innerText = pct_Democrats1;
    document.getElementById("pct_Republicans").innerText = pct_Republicans2;
    document.getElementById("pct_Independets").innerText = pct_Independets3;
    document.getElementById("pct_total").innerText = pct_total;
}

///////////////////////////////
function at_a_glance() {
    let total = {
        n_of_Reps_Democrats: 0,
        n_of_Reps_Republicans: 0,
        n_of_Reps_Independets: 0,

        pct_Democrats: 0,
        pct_Republicans: 0,
        pct_Independets: 0
    }

    for (let i = 0; i < total_datos.length; i++) {
        let party_r_d = total_datos[i].party
        let votes_pct = total_datos[i].votes_with_party_pct

        if (party_r_d == "R") {
            total.n_of_Reps_Republicans += 1; //
            total.pct_Republicans += votes_pct; //
        } else if (party_r_d == "D") {
            total.n_of_Reps_Democrats += 1; //
            total.pct_Democrats += votes_pct; //
        } else if (party_r_d == "I") {
            total.n_of_Reps_Independets += 1; //
            total.pct_Independets += votes_pct; //
        }
    }
   
    return total;
}