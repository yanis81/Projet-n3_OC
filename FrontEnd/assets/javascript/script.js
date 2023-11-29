
// document.addEventListener("DOMContentLoaded", () => { //// effectue la meme tache que defer dans l'html
    // console.log("DOM fully loaded and parsed")
    
    /**DisplayWorks()
     *  Permet d'integrer les travaux dynamiquement dans gallery
     * @param {object} data [Prototype] : reponse Json par l'API
     */
    function displayWorks (data){
    //console.log(data)
        deleteGallery()
        for (let key in data){ // on itère dans notre objet JSON pour récupérer les données
            // On récupère notre élément du DOM
            const gallery = document.querySelector(".gallery") 
            // On créer les éléments manquants au DOM
            const figureElement = document.createElement("figure")
            const imageElement = document.createElement("img")
            const figcaptionElement = document.createElement("figcaption")
            // On nourris les éléments précédements créer               
            imageElement.src = data[key].imageUrl              
            figcaptionElement.innerHTML = data[key].title
            // On utilise le siblings pour ajouter les éléments fraichement créés au DOM
            gallery.appendChild(figureElement)
            figureElement.appendChild(imageElement)
            figureElement.appendChild(figcaptionElement)
        }
    }

    /**DeleteGallery()
      * Permet d'effacer la gallery de travaux
      */
    function deleteGallery(){
        document.querySelector(".gallery").innerHTML = ""
    }

    /**FctFiltre()
     * permet de filtrer les travaux et de changer la couleur des boutons au click
     * @param {CSSselector} buttons aaray contenant ....
     * @param {Object} data objet contenant la reponse de l'API
     */
    function fctFiltre(buttons,data){
        const btn = document.querySelectorAll(buttons)//recuperer TOUS les boutons du html et pas seulement le 1er element
       //console.log(btn)
        btn.forEach(element => { // Boucle forEach, permet d'exécuter une fonction donnée sur chaque élément du tableau.
            element.addEventListener("click",(e)=>{ //Ajout d'un ecouteur d'evenement pour chaque bouton du tableau
                let catId = Number(e.currentTarget.dataset.catId) // convertion de la valeur de l'attribut data-catId String en Number
                let btnId = e.currentTarget.id // ID du bouton qui est cliquer 
                for (let i = 0; i < btn.length ; i++){ // parcours mon tableau qui contient les boutons 
                    console.log(catId)
                    if (btnId === btn[i].id){ // Si l'ID du bouton cliquer est egal a l'ID du bouton qu'on compare alors on change la couleur de fond et de texte
                       // console.log("if")
                        e.currentTarget.setAttribute(`style`,`background-color:#1D6154 ;color:white`)
                        
                    }else{// Sinon on enleve l'attibut style , qui remet le bouton par defaut 
                        // console.log("else")
                        btn[i].removeAttribute("style")
                    }
                }
                if(catId === 0){ 
                    displayWorks(data)
                    return false
                }
                const worksFiltered = data.filter((data)=>{
                    return data.categoryId === catId
                })
                 //console.log(worksFiltered);
                displayWorks(worksFiltered)
            })
        });
    }

    /**ColorNav()
     * permet de changer le style des elements de navigation au click
     */
    function colorNav() {
        const nav = document.querySelectorAll("li") // Recuperer tous les elements li du HTMl et les rentrent dans un tableau JS.
        //console.log(nav )
        nav.forEach(element =>{ // Boucle forEach, permet d'exécuter une fonction donnée sur chaque élément du tableau.
            element.addEventListener('click',(e)=>{ //Ajout d'un ecouteur d'evenement pour chaque elements du tableau.
                navInnerText = e.currentTarget.innerText // Recuperer l'InnerText de l'elements qui est cliquer.
                // console.log(navInnerText)
                for(let i = 0 ; i < nav.length ; i++){ //Parcours mon tableau qui contient les elements.
                    if ( navInnerText === nav[i].innerText){ //Si l'InnerText de l'element cliquer et le meme que l'InnerText de l'element du tableau alors on change le style.
                        // console.log("if")
                        //console.log(nav[i].innerText)
                        e.currentTarget.setAttribute(`style`,`font-weight: bold;`)
                    }else{ //Sinon on restore le style par defaut.
                        //console.log("else")
                        nav[i].removeAttribute(`style`)  
                    }
                }       
            })
        })
    }
    colorNav()

   /**GetApiResponse()
    * fonction asynchrone,appelle a l'API puis recupere la reponse et affiche les resultats
    * @param {url} url [string] de la requete GET
    */
    async function getApiResponse (url){        
        try{
            fetch(url)
                .then( response => response.json() )
                .then((response) => {
                    // console.log(response)
                    displayWorks(response)
                    fctFiltre("button[id^='btn_']",response) //selecteur css pour preciser un button 
                })
                .catch( (error) => console.log("Erreur : "+error))            
        }catch{
            console.log("Erreur : "+response.error)
        }
    }
    getApiResponse("http://localhost:5678/api/works/")

    /**Deconnect()
     * permet la deconnection de l'utilisateur au click
     */
    function deconnect() {
        const login = document.querySelector(".login_logout")
        //console.log(login)
        if (localStorage.getItem("token")) { //Si le token est enregistrer dans le LocaleStorage alors 
            login.textContent = "Logout" // change le texte Login par Logout si le token est enregistrer dans LocaleStorage 
            console.log("Vous etes connecter !")
            // Ajout un ecouteur d'evenement au click sur Login
            login.addEventListener("click",(e)=>{
                e.preventDefault()  // Empêche l'envoi par défaut du formulaire par le navigateur, l'envoi est géré par notre code JavaScript
                localStorage.removeItem("token") // efface le token dans le LocaleStorage
                window.location.href = "assets/logIn.html" // redigire vers la page logIn.html
            })
        }
    }
    deconnect()

/* Je peux fusionner les deux function (deconnect et aspectConnect) j'attend de voir car les deux function on 
    les memes condition de locale Storage */

    /**AspectConnect()
     * Permet de mettre en place la page html en mode edition 
     */
    function aspectConnect() {
        const blackBar = document.getElementById("blackBar")
        //console.log(blackBar)
        const btnFiltres = document.getElementById("btn")
        //console.log(btnFiltres)
        const modifier = document.getElementById("modifier")
        //console.log(modifier)
        if (localStorage.getItem("token")) {
            blackBar.setAttribute(`style`,`display: flex;`)
            btnFiltres.setAttribute(`style`,`display: none`)
            modifier.setAttribute(`style`,`display: flex;`)
        }
    }
    aspectConnect()

    //-------------------------------------MODAL-----------------------------------------//
    let modal = null 

    /**OpenModal()
     * Permet d'ouvrir la page Modal en cliquant sur modifier
     * @param {*} e 
     */
    const openModal = function (e) {
        e.preventDefault()
        const target = document.querySelector(e.target.getAttribute("href")) 
        target.style.display = null
        target.removeAttribute("aria-hidden")
        target.setAttribute("aria_modal","true") 
        modal = target 
        modal.addEventListener("click", closeModal)
        modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
        modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    }

    /**CloseModal()
     * Permet de quitter la page Modal et d'effacer sont code proprement 
     * @param {*} e 
     * @returns 
     */
    const closeModal = function (e) {
        if (modal === null) return
        e.preventDefault()
        modal.style.display = "none"
        modal.setAttribute("aria-hidden", "true")
        modal.removeAttribute("aria-modale")
        modal.removeEventListener("click", closeModal)
        modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
        modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
        modal = null 
    }

    document.querySelectorAll(".js-modal").forEach(a =>{
        a.addEventListener("click", openModal)
    })

    /**StopPropagation()
     * Permet de cliquer dans la page Modal sans nous sortir de la page Modal (Stop la propagation de l'eventement)
     * @param {*} e 
     */
    const stopPropagation = function (e) {
        e.stopPropagation()
    }

    /**
     * Ouvre la page Modal avec la touche "Enter" du clavier
     */
   /* window.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            openModal(e);
        }
    })*/

    /**
     * Quitte la page Modal en appuyant sur la touche "Echap" du clavier
     */
    window.addEventListener("keydown",function(e){
        //console.log(e.key);
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeModal(e)
        }
    })

    /**Photos()
     * récupere les differents travaux de l'API (URL et ID) seulement 
     * @param {*} works reponse Json par l'API 
     */
    function photos(works) {
        const photo_modal = `
            <figure id ="B${works.id}">
        
                <div id="repertoire_modal" class="photo_model_efface">
                    <img src="${works?.imageUrl} "crossOrigin="anonymous">
                    <i id ="${works.id}" class="fa-regular fa-trash-can "></i>
                </div>
                       
            </figure>
                `;
    
        document
        .getElementById("gallery-modal")
        .insertAdjacentHTML("beforeend", photo_modal);
    }

    /**AfficheModal()
     * affiche la totalité des travaux dans la page Modal
     * fonction de type asynchone
     */
    async function afficheModal() {
    fetch("http://localhost:5678/api/works").then((res) => {
        if (res.ok) {
        res.json().then((data) => {
            document.getElementById("gallery-modal").innerHTML = ""// Efface le HTML à l'intérieur de la modal
            // Boucle à travers toutes les photos dans le tableau de données pour les afficher dans la modal
            for (let i = 0; i <= data.length - 1; i++) {
            photos(data[i]);
            }
        });
        }
    });
    }
    afficheModal()
// })