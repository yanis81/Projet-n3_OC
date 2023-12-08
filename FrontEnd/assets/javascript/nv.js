function  photosFonction() {
    for (let i = 0; i < works.length; i++) {
        
        const figure = document.createElement("figure");
        figure.classList.add("B${works.id}");
        document.getElementById("gallery-modal").appendChild(figure);

        const img = document.createElement("img");
        img.src = works?.imageUrl;
        figure.appendChild(img);

        const p = document.createElement("p");
        p.classList.add(works.id, "js-delete-work");
        figure.appendChild(p);

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can"); 
        p.appendChild(icon);
    }
}
//--------------------------------------------------------------------- original
function photos(works) {
    const photo_modal = `
            <figure id ="B${works.id}">
        
                <div id="repertoire_modal" class="photo_model_efface">
                    <img src="${works?.imageUrl} "crossOrigin="anonymous">
                    <p class="${works.id} js-delete-work">
                        <i class="fa-solid fa-trash-can"></i>
                    </p>
                </div>
                    
            </figure>`

    document.getElementById("gallery-modal").insertAdjacentHTML("beforeend", photo_modal)
}
//-----------------------------------------------------------celle qui avait a avant le cour 
function photos(works) {
    const photo_modal = `
            <figure id ="B${works.id}">
        
                <div id="repertoire_modal" class="photo_model_efface">
                    <img src="${works?.imageUrl} "crossOrigin="anonymous">
                </div>
                    
            </figure>`

    const p = `
    <p class=" js-delete-work">
        <i class="fa-solid fa-trash-can"></i>
    </p>`

    document.getElementById("gallery-modal").insertAdjacentHTML("beforeend", photo_modal)
    document.getElementById("repertoire_modal").insertAdjacentHTML("beforeend", p)
    p = works.id

}
//---------------------------------------
 /**AfficheModal()
         * affiche la totalité des travaux dans la page Modal
         * fonction de type asynchrone
         */
 async function afficheModal() {
    fetch("http://localhost:5678/api/works").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                document.getElementById("gallery-modal").innerHTML = ""// Efface le HTML à l'intérieur de la modal
                // Boucle à travers toutes les photos dans le tableau de données pour les afficher dans la modal admin
                for (let i = 0; i <= data.length - 1; i++) {
                   // photos(data[i]);
                    const photo_modal = `
                    <figure id ="B${data.id}">
                
                        <div id="repertoire_modal" class="photo_model_efface">
                            <img src="${data?.imageUrl} "crossOrigin="anonymous">
                        </div>
                            
                    </figure>`

                    const p = `
                    <p class=" js-delete-work">
                        <i class="fa-solid fa-trash-can"></i>
                    </p>`

                    document.getElementById("gallery-modal").insertAdjacentHTML("beforeend", photo_modal)
                    document.getElementById("repertoire_modal").insertAdjacentHTML("beforeend", p)
                    p.classList.add(data[i].id)
                }
                deleteWork()//Appelle a la fonction deleteWork()
            })
        }
    })
}

afficheModal() //Appelle a la fonction afficheModal()
