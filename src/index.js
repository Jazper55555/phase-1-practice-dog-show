// Goal 1: Fetch all 20 dogs from db.json & display under id='table-body'
// Must be split up name, breed, & sex - place edit button under 'edit dog'
// Goal 2: Create a button on id='table-body' that makes a dog editable
// The button should have an event listener of 'click' that takes current dogs info and displays it on id='dog-form' under respective text input slots

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    fetchDogs()
})

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        const dogData = data
        const registeredDogTable = document.getElementById('table-body')
        
        dogData.forEach((dog) => {
            const dogNameContainer = document.createElement('td')
            const dogBreedContainer = document.createElement('td')
            const dogSexContainer = document.createElement('td')
            const editButtonContainer = document.createElement('td')

            const editButton = document.createElement('button')
            editButton.type = 'submit'
            editButton.value = 'Edit'
            editButton.textContent = 'Edit Dog'

            const dogDataTable = document.createElement('tr')

            dogNameContainer.textContent = dog.name
            dogBreedContainer.textContent = dog.breed
            dogSexContainer.textContent = dog.sex

            dogDataTable.appendChild(dogNameContainer)
            dogDataTable.appendChild(dogBreedContainer)
            dogDataTable.appendChild(dogSexContainer)
            editButtonContainer.appendChild(editButton)
            dogDataTable.appendChild(editButtonContainer)

            registeredDogTable.appendChild(dogDataTable)
        })
    })    
}