const form = document.querySelector('#searchForm')
const resultSection = document.querySelector('.resultSection')

form.addEventListener('submit', submit)

async function submit(e) {
    e.preventDefault()

    removeOldResults()
    makeSearch()

    form.elements.query.value = ''
}

const removeOldResults = () => {
    if (resultSection.hasChildNodes()) {
        const childs = document.querySelectorAll('.resultCard')
        for (let child of childs) {
            resultSection.removeChild(child)
        }
    }
}

const makeSearch = async () => {
    const searchTerm = form.elements.query.value
    const config = { params: { q: searchTerm } }
    const searchResult = await axios.get(`http://api.tvmaze.com/search/shows`, config)
    displayResults(searchResult.data)

}

const displayResults = searchResults => {
    for (let result of searchResults) {
        if (result.show.image) {
            const resultCard = document.createElement('div')
            const resultTitle = document.createElement('h2')
            const resultImage = document.createElement('IMG')
            const resultSummary = document.createElement('p')
            resultCard.setAttribute('class', 'resultCard')
            resultTitle.innerHTML = result.show.name
            resultImage.src = result.show.image.medium
            resultSummary.innerHTML = result.show.summary
            resultCard.appendChild(resultTitle)
            resultCard.appendChild(resultImage)
            resultCard.appendChild(resultSummary)
            resultSection.appendChild(resultCard)
        }
    }
}

