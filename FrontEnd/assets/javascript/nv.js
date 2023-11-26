const error = document.getElementById("error")
const form = document.getElementById("login-form")

form.addEventListener("submit", function (e) { 
    e.preventDefault()  

    const information = new FormData(form)
    const pay = new URLSearchParams(information)

    try {
        const API = fetch("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {
                "accept": "application/json",
            },
            body: pay
        })

        if (API.status === 401) {
            console.log("pas connectyer 1");
            error.innerText = "le Mot de passe est incorrect !" 
            error.setAttribute(`style`,`font-weight: bold; color: red; align-items: center; font-size:17px;`) 
        } else if(API.status === 404){
            console.log("pas connectyer 2");
            error.innerText = "L'identifiant est inconnu !" 
            error.setAttribute(`style`,`font-weight: bold; color: red; align-items: center; font-size:17px;`) 
        } else if(API.ok){
            localStorage.setItem("token", data.token)
            console.log("Vous etes connecter !")
            //window.location.href = "index.html"
        }
        
    } catch (error) {
        console.error("Erreur lors de la requete d'authentification")
    }
})

