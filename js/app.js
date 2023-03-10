let URL_CHARACTER = 'https://rickandmortyapi.com/api/character';

let lastItem = document.querySelector('#final-result');
console.log(lastItem);
const main = document.querySelector('main');
async function getCharacter(){
    try{
        const data = await fetch(URL_CHARACTER).then((response)=>response.json()).then((data)=>data);
        data.results.forEach((item)=>{
            //console.log(item);
            const {name:nombre, image:imagen, status, species:especie, location:{name}}=item;
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <div class="card-image">
                    <img class="image" src="${imagen}" alt="card-image"/>
                </div>
                <div class="card-body">
                    <div class="flex-card">
                        <h3>${nombre}</h3>
                        <p class=${(status==='Alive'?("active"):("inactive"))}>${status} - ${especie}</p>
                    </div>
                    <div  class="flex-card">
                        <p class="info-text">Última ubicación detectada</p>
                        <p>${name}</p>
                    </div>
                    <div class="flex-card">
                        <p class="info-text">Información detallada</p>
                        <a class="link" href="#">Ver más</a>
                    </div>
                </div>
            `;
            main.appendChild(div);
        });
        URL_CHARACTER = (data.info.next);
    }catch(e){
        console.log(e);
    }
};

getCharacter();


const scroll =([entry], observer)=>{
    console.log(URL_CHARACTER);
    //getCharacter();
    if(URL_CHARACTER!==null){
        getCharacter();
    }
};


const observer = new IntersectionObserver(scroll,{
    root:null,
    rootMargin:'0px 0px',
    threshold:1
});

observer.observe(lastItem);