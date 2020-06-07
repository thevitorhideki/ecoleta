function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states => {
    for( const state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities(e){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  const ufValue = e.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` 
  const indexOfSelectedState = e.target.selectedIndex

  stateInput.value = e.target.options[indexOfSelectedState].text

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
  .then(res => res.json())
  .then(cities => {

    for( const city of cities){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled = false
  })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

//itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

for(let item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}

function handleSelectedItem(e){
  const itemLi = e.target
  const itemId = itemLi.dataset.id
  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId // True or False
    return itemFound
  })

  itemLi.classList.toggle("selected")

  if(alreadySelected >= 0){
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  }else{
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}