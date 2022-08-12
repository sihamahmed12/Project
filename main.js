const journalsContainer = document.querySelector('#journal-container')
const form = document.querySelector('form')

const baseURL = 'http://localhost:4004/api/journal'

const journalsCallback = ({ data: journals }) => displayJournals(journals)
const errCallback = err => console.log(err.response.data)

const getAllJournals = () => axios.get(baseURL).then(journalsCallback).catch(errCallback)
const createJournal = body => axios.post(baseURL, body).then(journalsCallback).catch(errCallback)
const deleteJournal = id => axios.delete(`${baseURL}/${id}`).then(journalsCallback).catch(errCallback)
const updateJournal = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(journalsCallback).catch(errCallback)

function submitHandler(event) {
    event.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createJournal(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createJournalCard(journal) {
    const journalCard = document.createElement('div')
    journalCard.classList.add('journal-card')

    journalCard.innerHTML = `<img alt='Journal cover' src=${journal.imageURL} class="Journal-cover"/>
    <p class="journal-title">${journal.title}</p>
    <div class="btns-container">
        <button onclick="updateJournal(${journal.id}, 'x')">Dislike</button>
        <p class="journal-rating">${journal.rating} /5</p>
        <button onclick="updateJournal(${journal.id}, 'plus')">Like</button>
    </div>
    <button onclick="deleteJournal(${journal.id})">delete</button>
    `


    journalsContainer.appendChild(journalCard)
}

function displayJournals(arr) {
    journalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createJournalCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllJournals()