const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

const pokeList = document.querySelector('#pokemon');
const pokeInfo = document.querySelector('#pokedex');



function getAllPokemon(){
    for(let i = 1; i < 300; i++)
    {
        let img = document.createElement('img');
        img.setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`);
        pokeList.append(img);
    }
    
}

getAllPokemon();

const pokeImgs = document.querySelectorAll('img');

for(let i = 0; i< pokeImgs.length; i++){
    let p = i+1;
    pokeImgs[i].addEventListener('click', ()=>{
        axios.get(`${pokeUrl}${p}`).then(res => {
            const {name, height, weight, abilities,stats} = res.data;
            let abilitiesArr=[];
            for(let ability of abilities)
            {
                abilitiesArr.push(' ' +ability.ability.name );
            }

            let statsArr=[];
            for(let stat of stats)
            {
                statsArr.push(stat.base_stat);
            }
            const htmlPoke = ` 
            <img src="${res.data.sprites.front_default}" width = "200" height= "200"/>
            <h1>Name: ${name}</h1> 
            <h4>Height: ${height}</h4>
            <h4>Weight: ${weight}</h4>
            <h4>Abilities:</h4>
            <h4> ${abilitiesArr}</h4>
            <h4>Stats:</h4>
            <h4>hp:${statsArr[0]}</h4>
            <h4>attack: ${statsArr[1]}</h4>
            <h4>defense: ${statsArr[2]}</h4>
            <h4>special-attack: ${statsArr[3]}</h4>
            <h4>special-defense: ${statsArr[4]}</h4>
            <h4>speed: ${statsArr[5]}</h4>
            ` ;
            pokeInfo.innerHTML = htmlPoke;

            console.log(res.data);
            console.log(abilitiesArr)
        });
    });
}
