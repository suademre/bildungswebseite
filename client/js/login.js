let form = document.getElementById('form');
let email = document.getElementById('email');
let passworrd = document.getElementById('password');
//let check = document.getElementById('check');

form.addEventListener('submit', evt => {
    let formdata = new FormData(form);
    formdata.append('email', email.value);
    formdata.append('password', passworrd.value);


    let request = new Request('/login/getlogin', {
        method: "post",
        body: formdata // veriyi body ye yolluyoruz ve burasi verinin yollandigi yer

    }) //Klasslarin  ilk harfi buyuk olur.  

    fetch(request).then(
        response => {
            return response.json();
        }
    ).then(
        body => {
            console.log(body);
            if(body.success){
                window.location = `panel/panel/${body.id}`;
            }else {
                alert("Bitte geben Sie richtige Password");
                email.value = "";
                passworrd.value = "";
            }
        }
    )

});