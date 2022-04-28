
const selectStates = document.querySelector("#states");
const selectCities = document.querySelector("#cities");
function populatedStateSelect(){
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(res => res.json()).then(states => {
        states.map(state => {
            const option = document.createElement('option');
            option.setAttribute('value', state.sigla);
            option.textContent = state.sigla;

            selectStates.appendChild(option)
        })
    })
}


function populateCitySelect(){
    selectStates.addEventListener('change', () =>{
        let nodesSelectCities = selectCities.childNodes;
        [...nodesSelectCities].map(node => node.remove());
        let state = selectStates.options[selectStates.selectedIndex].value;
        
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`).then(res => res.json()).then(cities => {
            selectCities.removeAttribute('disabled');
            cities.map(city => {
                const option = document.createElement('option');
                option.setAttribute('value', city.nome);
                option.textContent = city.nome;
                selectCities.appendChild(option);
            })
        })
    })
}
