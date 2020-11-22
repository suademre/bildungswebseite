let form = document.getElementById('form');
let email = document.getElementById('email');
let vorname = document.getElementById('vname');
let nachname = document.getElementById('nname');
let weiblich = document.getElementById('weiblich');
let mannlich = document.getElementById('mannlich');
let photo = document.getElementById('photo');
let klasse = document.getElementById('klasse');
let unterricht = document.getElementById('unterricht');

form.addEventListener('submit',evt =>{
    let formdata = new FormData(form);
    formdata.append('email',email.value);
    formdata.append('vname',vname.value);
    formdata.append('nname',nname.value);
    formdata.append('geschlecht',SelectedGeschlecht());
    formdata.append('photo',photo.files[0]);
    formdata.append('klasse',klasse.value);
    formdata.append('unterricht',selectedUnterricht());
    

    //veriyi buraya yolluyoruz ve veriyi cagiracagimiz zaman burdaki tanimladigimiz yerden cagirioruz.
    let request = new Request('/anmelden/getanmelden',{
        method:"post",
        body: formdata // veriyi body ye yolluyoruz ve burasi verinin yollandigi yer

    })   //Klasslarin  ilk harfi buyuk olur.  

    fetch(request).then(
        response => {
            response
        }
    ).then(
        body =>{
            console.log(body);
        }
    )
});

//FUNKTION 
//Selection Unterricht
selectedUnterricht = ()=>{
    let unterrichtt = [];
    for(let i = 0; i<unterricht.length;i++){
        if(unterricht[i].selected){
            unterrichtt.push(unterricht[i].value)
            
        }
    }
    return unterrichtt;
} 

//Selection Geschlecht
SelectedGeschlecht = ()=>{
    if(weiblich.checked){
        return "weiblich";
    }else if(mannlich.checked){
        return "mannlich";
    }
}