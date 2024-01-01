function displayWorks (data){
    deleteGallery()
    for (let key in data){ // on itère dans notre objet JSON pour récupérer les données
        // On récupère notre élément du DOM
        const gallery = document.querySelector(".gallery") 
        // On créer les éléments manquants au DOM
        const figureElement = document.createElement("figure")
        figureElement.classList.add(`js-travaux-${data[key].id}`) // Ajout d'une class a figureElement
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

function deleteGallery(){
    document.querySelector(".gallery").innerHTML = ""
}

function fctFiltre(buttons,data){
    const btn = document.querySelectorAll(buttons)//recuperer TOUS les boutons du html et pas seulement le 1er element
    btn.forEach(element => { // Boucle forEach, permet d'exécuter une fonction donnée sur chaque élément du tableau.
        element.addEventListener("click",(e)=>{ //Ajout d'un ecouteur d'evenement pour chaque bouton du tableau
            let catId = Number(e.currentTarget.dataset.catId) // convertion de la valeur de l'attribut data-catId String en Number
            let btnId = e.currentTarget.id // ID du bouton qui est cliquer 
            for (let i = 0; i < btn.length ; i++){ // parcours mon tableau qui contient les boutons 
                if (btnId === btn[i].id){ // Si l'ID du bouton cliquer est egal a l'ID du bouton qu'on compare alors on change la couleur de fond et de texte
                    e.currentTarget.setAttribute(`style`,`background-color:#1D6154 ;color:white`)
                    
                }else{// Sinon on enleve l'attibut style , qui remet le bouton par defaut 
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
            displayWorks(worksFiltered)
        })
    });
}

async function getApiResponse (url){        
    try{
        fetch(url) // Requete GET par defauts
            .then( response => response.json() )
            .then((response) => {
                displayWorks(response) // Appelle la fonction displayWorks
                fctFiltre("button[id^='btn_']",response) // appelle de la fonction fctFiltre + selecteur css pour preciser un button 
            })
            .catch( (error) => console.log("Erreur : "+error))            
    }catch{
        alert(("Erreur : "+ response.error))
    }
}
getApiResponse("http://localhost:5678/api/works/") // Appelle la fonction getApiResponse avec l'URL de l'API pour recuperer les travaux dynamiquement