
// document.addEventListener("DOMContentLoaded", () => { //// effectue la meme tache que defer dans l'html
    // console.log("DOM fully loaded and parsed")
    
    /**DisplayWorks()
     *  Permet d'integrer les travaux dynamiquement dans gallery
     * @param {object} data [Prototype] : reponse Json par l'API
     */
    function displayWorks (data){
    //   console.log(data)
        deleteGallery()
        for (let key in data){ // on **itère** dans notre objet JSON pour récupérer les données
            // On récupère notre élément du **DOM**
            const gallery = document.querySelector(".gallery") 
            // On créer les éléments manquants au DOM
            const figureElement = document.createElement("figure")
            const imageElement = document.createElement("img")
            const figcaptionElement = document.createElement("figcaption")
            // On nourris les éléments précédements créer               
            imageElement.src = data[key].imageUrl              
            figcaptionElement.innerHTML = data[key].title
            // On utilise le **siblings** pour ajouter les éléments fraichement créés au DOM
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

    /**ColorNav
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
// })