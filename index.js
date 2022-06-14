import {promises  as fs} from "fs";

init()

async function init(){
    await getStatesWithMoreCities();
    await createFile();
    await pontosTuristicosPorCapital();
}
  



async function createFile(){
    let data = await fs.readFile(`./files/Estados.json`);
    let states = JSON.parse(data);
    
    data = await fs.readFile(`./files/Cidades.json`);
    let cities = JSON.parse(data);
    
    

    for(let state of states){
        const stateCities = cities.filter(city => city.Estado === state.ID);
        await fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(stateCities));
}
}

async function contagem(uf) {
    const data = await fs.readFile(`./states/${uf}.json`);
    const cities = JSON.parse(data);
    return Array.from(cities).length;
}

async function getStatesWithMoreCities() {
    const states = JSON.parse(await fs.readFile("./files/Estados.json"));
    const list = [];

    for (let state of states){
        const count = await contagem(state.Sigla);
        list.push({uf: state.Sigla, count});

    }

    list.sort((a, b)=> {
        if (a.count < b.count) return 1;
        else if(a.count > b.count) return -1;
        
    })

    const resultado = [];

        list.slice(0, 5).forEach(item => resultado.push(item.uf + " - " + item.count))
    console.log(resultado)
}


function pontosTuristicosPorCapital() {
    
}