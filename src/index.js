// Goal 1: Fetch all 20 dogs from db.json & display under id='table-body'
// Must be split up name, breed, & sex - place edit button under 'edit dog'
// Goal 2: Create a button on id='table-body' that makes a dog editable
// The button should have an event listener of 'click' that takes current dogs info and displays it on id='dog-form' under respective text input slots
// Goal 3: Make the table display the updated PATCH information using seperate GET request after the PATCH request

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded')
    fetchDogs()
    submitButton()
})

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(data => {
        // console.log(data)
        const dogData = data
        const registeredDogTable = document.getElementById('table-body')
        const editExisitingDogTable = document.getElementById('dog-form')
        
        dogData.forEach((dog) => {
            const dogNameContainer = document.createElement('td')
            const dogBreedContainer = document.createElement('td')
            const dogSexContainer = document.createElement('td')
            const editButtonContainer = document.createElement('td')

            const editButton = document.createElement('button')
            editButton.type = 'submit'
            editButton.value = 'Edit'
            editButton.textContent = 'Edit Dog'
            editButton.dataset.dog = JSON.stringify({id: dog.id, ...dog})

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

            editButton.addEventListener('click', (event) => {
                event.preventDefault()
                const dogInfo = JSON.parse(event.target.dataset.dog)
               
                const dogName = dogInfo.name
                const dogBreed = dogInfo.breed
                const dogSex = dogInfo.sex

                const dogNameInput = editExisitingDogTable.elements['name']
                const dogBreedInput = editExisitingDogTable.elements['breed']
                const dogSexInput = editExisitingDogTable.elements['sex']

                dogNameInput.value = dogName
                dogNameInput.textContent = dogName
                dogNameInput.id = dogInfo.id
                dogBreedInput.value = dogBreed
                dogBreedInput.textContent = dogBreed
                dogSexInput.value = dogSex
                dogSexInput.textContent = dogSex
            })
        })
    })    
}

function submitButton() {
    const editExisitingDogTable = document.getElementById('dog-form')
    const submitButton = editExisitingDogTable.querySelector("input[type='submit']")

    submitButton.addEventListener('click', (event) => {
        event.preventDefault()

    const dogNameInput = editExisitingDogTable.elements['name']
    const dogBreedInput = editExisitingDogTable.elements['breed']
    const dogSexInput = editExisitingDogTable.elements['sex']

    const name = dogNameInput.value
    const breed = dogBreedInput.value
    const sex = dogSexInput.value
    const dogId = dogNameInput.id

        const patchRequest = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                breed: `${breed}`,
                sex: `${sex}`
            })
        }
    
        fetch(`http://localhost:3000/dogs/${dogId}`, patchRequest)
        updatedTable()
    })

    function updatedTable() {
        fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            const dogData = data
            const registeredDogTable = document.getElementById('table-body')
            const editExisitingDogTable = document.getElementById('dog-form')
            const tableRows = document.querySelectorAll('tr')
            const rowsArray = Array.from(tableRows)

            rowsArray.forEach((row) => {
                row.remove()
            })
            
            dogData.forEach((dog) => {
                const dogNameContainer = document.createElement('td')
                const dogBreedContainer = document.createElement('td')
                const dogSexContainer = document.createElement('td')
                const editButtonContainer = document.createElement('td')
    
                const editButton = document.createElement('button')
                editButton.type = 'submit'
                editButton.value = 'Edit'
                editButton.textContent = 'Edit Dog'
                editButton.dataset.dog = JSON.stringify({id: dog.id, ...dog})
    
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
    
                editButton.addEventListener('click', (event) => {
                    event.preventDefault()
                    const dogInfo = JSON.parse(event.target.dataset.dog)
                   
                    const dogName = dogInfo.name
                    const dogBreed = dogInfo.breed
                    const dogSex = dogInfo.sex
    
                    const dogNameInput = editExisitingDogTable.elements['name']
                    const dogBreedInput = editExisitingDogTable.elements['breed']
                    const dogSexInput = editExisitingDogTable.elements['sex']
    
                    dogNameInput.value = dogName
                    dogNameInput.textContent = dogName
                    dogNameInput.id = dogInfo.id
                    dogBreedInput.value = dogBreed
                    dogBreedInput.textContent = dogBreed
                    dogSexInput.value = dogSex
                    dogSexInput.textContent = dogSex
                })
            })
        })            
    }
}
