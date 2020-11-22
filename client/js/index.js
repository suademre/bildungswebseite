let form = document.getElementById('form');
let email = document.getElementById('email');
let vorname = document.getElementById('vname');
let nachname = document.getElementById('nname');
let weiblich = document.getElementById('weiblich');
let mannlich = document.getElementById('mannlich');
let photo = document.getElementById('photo');
let klasse = document.getElementById('klasse');
let unterricht = document.getElementById('unterricht'); 

form.addEventListener('submit', evt => {
    let formdata = new FormData(form);
    formdata.append('email', email.value);
    formdata.append('vname', vname.value);
    formdata.append('nname', nname.value);
    formdata.append('geschlecht', selectedGeschlecht());
    formdata.append('photo', photo.files[0]);
    formdata.append('klasse', klasse.value);
    formdata.append('unterricht', selectedUnterricht());


    //veriyi buraya yolluyoruz ve veriyi cagiracagimiz zaman burdaki tanimladigimiz yerden cagirioruz.
    //kaydi anmelden a yollamak icin yapiyoruz.
    let request = new Request('/anmelden/getanmelden', {
        method: "post",
        body: formdata // veriyi body ye yolluyoruz ve burasi verinin yollandigi yer

    }) //Klasslarin  ilk harfi buyuk olur.  

    fetch(request).then(
        response => {
            return response.json() // tek satir yazinca return etmene gerek yok ama daha fazlasi icin return etmen gerek
        }
    ).then(
        body => {
            console.log(body);
            if (body.success == true) {
                alert("Ihre Registrierung war erfolgreich abgeschlossen.");
                sehen.style.display = "inline-block";


            }
            email.value = "";
            vorname.value = "";
            nachname.value = "";
            weiblich.checked = false;
            mannlich.checked = false;
            photo.value = "";
            klasse.value = "";
            unterricht.selected = false;
        }
    )
});

//FUNKTION 
//Selection Unterricht
selectedGeschlecht = () => {
    if (weiblich.checked) {
        return "weiblich";
    } else if (mannlich.checked) {
        return "mannlich"
    } else {
        alert("Bitte waehlen Sie Ihre Geschlect");

    }
}


selectedUnterricht = () => {
    let unterrichtt = [];
    for (let i = 0; i < unterricht.length; i++) {
        console.log(i);
        if (unterricht[i].selected) {
            unterrichtt.push(unterricht[i].value)
        }
    }
    console.log(unterrichtt);
    return unterrichtt;
}