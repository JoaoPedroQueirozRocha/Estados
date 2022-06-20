import { promises as fs } from "fs";

init();

async function init() {
    await getStatesWithMoreCities();
    await createFile();
}

async function createFile() {
    let states = JSON.parse(await fs.readFile(`./files/Estados.json`));
    let cities = JSON.parse(await fs.readFile(`./files/Cidades.json`));
    let capitals = JSON.parse(await fs.readFile(`./files/Capitais.json`));
    create(states, cities, capitals);
}

async function create(states, cities, capitals) {
    for (let state of states) {
        const stateCities = cities.filter((city) => city.Estado === state.ID);
        await fs.writeFile(
            `./states/${state.Sigla}.json`,
            JSON.stringify(stateCities)
        );
        await AgruparPorRegioes(state.Sigla, states, capitals, cities);
    }
    console.log(cities.length);
}

async function contagem(uf) {
    const data = await fs.readFile(`./states/${uf}.json`);
    const cities = JSON.parse(data);
    return Array.from(cities).length;
}

async function getStatesWithMoreCities() {
    const states = JSON.parse(await fs.readFile("./files/Estados.json"));
    const list = [];

    for (let state of states) {
        const count = await contagem(state.Sigla);
        list.push({ uf: state.Sigla, count });
    }

    list.sort((a, b) => {
        if (a.count < b.count) return 1;
        else if (a.count > b.count) return -1;
    });

    const resultado = [];

    list
        .slice(0, 5)
        .forEach((item) => resultado.push(item.uf + " - " + item.count));
    console.log(resultado);
}

async function AgruparPorRegioes(uf, states, capitals, cities) {
    try {
        for (let capital of capitals) {
            if (capital.Sigla === uf) {
                if (capital.Regiao == "Norte") {
                    for (let state of states) {
                        if (state.Sigla === uf) {
                            await fs.writeFile(
                                `./regioes/Norte/Estados/${uf}.json`,
                                JSON.stringify(state)
                            );
                            for (let cidade of cities) {
                                if (cidade.Estado === state.ID && capital.Regiao == "Norte") {
                                    await fs.writeFile(
                                        `./regioes/Norte/Cidades/${cidade.Nome}.json`,
                                        JSON.stringify(cidade)
                                    );
                                }
                            }
                        }
                    }
                } else if (capital.Regiao == "Nordeste") {
                    for (let state of states) {
                        if (state.Sigla == uf) {
                            await fs.writeFile(
                                `./regioes/Nordeste/Estados/${uf}.json`,
                                JSON.stringify(state)
                            );
                            for (let cidade of cities) {
                                if (cidade.Estado == state.ID) {
                                    await fs.writeFile(
                                        `./regioes/Nordeste/Cidades/${cidade.Nome}.json`,
                                        JSON.stringify(cidade)
                                    );
                                }
                            }
                        }
                    }
                } else if (capital.Regiao == "Sul") {
                    for (let state of states) {
                        if (state.Sigla == uf) {
                            await fs.writeFile(
                                `./regioes/Sul/Estados/${uf}.json`,
                                JSON.stringify(state)
                            );
                            for (let cidade of cities) {
                                if (cidade.Estado == state.ID) {
                                    await fs.writeFile(
                                        `./regioes/Sul/Cidades/${cidade.Nome}.json`,
                                        JSON.stringify(cidade)
                                    );
                                }
                            }
                        }
                    }
                } else if (capital.Regiao == "Centro-Oeste") {
                    for (let state of states) {
                        if (state.Sigla == uf) {
                            await fs.writeFile(
                                `./regioes/Centro-Oeste/Estados/${uf}.json`,
                                JSON.stringify(state)
                            );
                            for (let cidade of cities) {
                                if (cidade.Estado == state.ID) {
                                    await fs.writeFile(
                                        `./regioes/Centro-Oeste/Cidades/${cidade.Nome}.json`,
                                        JSON.stringify(cidade)
                                    );
                                }
                            }
                        }
                    }
                } else if (capital.Regiao == "Sudeste") {
                    for (let state of states) {
                        if (state.Sigla == uf) {
                            await fs.writeFile(
                                `./regioes/Sudeste/Estados/${uf}.json`,
                                JSON.stringify(state)
                            );
                            for (let cidade of cities) {
                                if (cidade.Estado == state.ID) {
                                    await fs.writeFile(
                                        `./regioes/Sudeste/Cidades/${cidade.Nome}.json`,
                                        JSON.stringify(cidade)
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}
