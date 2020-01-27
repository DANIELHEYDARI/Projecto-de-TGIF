
let url = ""   

let tota = [];

if (window.location.href.includes("House") ) {

    url = "https://api.propublica.org/congress/v1/113/house/members.json"
} else {

    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
}



console.log(url)

fetch(url, {
        headers: {
            "X-API-Key": "MSMa6KuiKHnC1hwRcCNo4gZtUCU2lGnuHGHZ3QDL"
        }
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

        total = data.results[0].members;


       
        document.getElementById("Attendance_LeastEngaged").innerHTML = tabla_Congress_LeastEngaged ();


        document.getElementById("Attendance_MostEngaged").innerHTML = tabla_Congress_MostEngaged();

        tabalaHouse_glance();



        document.getElementById("circulado").style.display = "none";

    })




function tabla_Congress_LeastEngaged () {


    let table = "";
    total.sort(function (a, b) {
        return a.total_votes - b.total_votes
    }); //para ordenar del array con el objeto definido
    // console.log(totalHouse);

    for (let i = 0; i < (total.length) * 0.1; i++) {
        let firstName = total[i].first_name;
        let middelName = total[i].middle_name
        let lastName = total[i].last_name;

        // let of_Missed_Votes = totalHouse[i].total_votes;

        let missed_votes_pct = total[i].votes_with_party_pct;

        if (middelName == null) {
            middelName = "";
        };

        let of_Missed_Votess = ((total[i].total_votes * total[i].votes_with_party_pct) / 100).toFixed(0);

        table += "<tr><td><a href=" + "linkedin.com/in/daniel-heydari-91961bab" + ">" + firstName + " " + middelName + " " + lastName + "</a></td><td>" + of_Missed_Votess + "</td><td>" + missed_votes_pct + "</td><td>" + "</td></tr>";

    }

    //console.log(tableHouse.length);

    return table;

}
/////////////////////////////////////////////////////////////////


function tabla_Congress_MostEngaged() {


    let table = "";
    total.sort(function (a, b) {
        return b.total_votes - a.total_votes
    }); //para ordenar del array con el objeto definido
    // console.log(totalHouse);


    for (let i = 0; i < (total.length) * 0.1; i++) {
        let firstName = total[i].first_name;
        let middelName = total[i].middle_name
        let lastName = total[i].last_name;

        //let of_Missed_Votes = totalHouse[i].total_votes;

        let missed_votes_pct = total[i].votes_with_party_pct;

        if (middelName == null) {
            middelName = "";
        };

        let of_Missed_Votess = ((total[i].total_votes * total[i].votes_with_party_pct) / 100).toFixed(0);
        table += "<tr><td><a href=" + "linkedin.com/in/daniel-heydari-91961bab" + ">" + firstName + " " + middelName + " " + lastName + "</a></td><td>" + of_Missed_Votess + "</td><td>" + missed_votes_pct + "</td><td>" + "</td></tr>";

    }

    return table;

}
//////////////////////////////



function tabalaHouse_glance(){

    let todosElementos = at_a_glance();
        
    document.getElementById("n_of_Reps_Democrats").innerText = todosElementos.n_of_Reps_Democrats;
    document.getElementById("n_of_Reps_Republicans").innerText = todosElementos.n_of_Reps_Republicans;
    document.getElementById("n_of_Reps_Independets").innerText = todosElementos.n_of_Reps_Independets;
    document.getElementById("total").innerText = innerText = todosElementos.n_of_Reps_Independets + todosElementos.n_of_Reps_Republicans + todosElementos.n_of_Reps_Democrats;


    let pct_Democrats1 = (todosElementos.pct_Democrats / todosElementos.n_of_Reps_Democrats).toFixed(2); //tofixed(2 parametr despoes de0)
    let pct_Republicans2 = (todosElementos.pct_Republicans /todosElementos.n_of_Reps_Republicans).toFixed(2);
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



function at_a_glance() {

    let total_glance = {
        n_of_Reps_Democrats: 0,
        n_of_Reps_Republicans: 0,
        n_of_Reps_Independets: 0,

        pct_Democrats: 0,
        pct_Republicans: 0,
        pct_Independets: 0

    }

    for (let i = 0; i < total.length; i++) {
        let party_r_d = total[i].party
        let votes_pct = total[i].votes_with_party_pct

        if (party_r_d == "R") {
            total_glance.n_of_Reps_Republicans += 1; //
            total_glance.pct_Republicans += votes_pct; //
        } else if (party_r_d == "D") {
            total_glance.n_of_Reps_Democrats += 1; //
            total_glance.pct_Democrats += votes_pct; //
        } else if (party_r_d == "I") {
            total_glance.n_of_Reps_Independets += 1; //
            total_glance.pct_Independets += votes_pct; //
        }

    }

    return total_glance;
}