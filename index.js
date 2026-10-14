// Получение элементов на странцие
const container = document.querySelector('.container')
const posts = document.querySelector('.posts')
const pagination = document.querySelector('.pagination')


// Массив со всеми постами 
let allPosts = []

// Переменная текущей страницы
let currentPage = 1
// Количество постов на странице 
let rows = 10


// Функция для получения постов 
function getFetch() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(responce => responce.json())
        .then(result => {
            allPosts = result
            return allPosts
        })
}

getFetch()
    .then(() => {
        showPostsOnPage(currentPage)
        showPaginationOnPage()
    })




// Функция для показа постов на странице 
function showPostsOnPage(currentPage) {
    posts.innerHTML = ''

    const start = (currentPage - 1) * rows
    const end = start + rows

    const paginatedData = allPosts.slice(start, end)

    paginatedData.forEach(elem => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.textContent = elem.title
        posts.appendChild(postEl)
    })
}



// Функция для показа страниц
function showPaginationOnPage() {

    // Количество всех страниц 
    const countPage = Math.ceil(allPosts.length / rows) // 10
    

    const paginationUl = document.createElement('ul')
    paginationUl.classList.add('pagination-ul')

    for (let i = 0; i < countPage; i++) {
        let paginationLi = document.createElement('li')
        paginationLi.classList.add('pagination-li')
        paginationLi.textContent = i + 1
        paginationLi.dataset.number = i + 1
        paginationUl.appendChild(paginationLi)


        // Добавление подсветки текущей страницы
        if (currentPage === i + 1) {
            paginationLi.classList.add('active')
        }
    }


    pagination.appendChild(paginationUl)
}


// Обработчик события на страницы 
container.addEventListener('click', function(e) {
    const li = e.target.closest('.pagination-li')
    const liData = Number(e.target.dataset.number)

    if (!li) return 


    // Убираем подсветку, добавляем новую
    const allLi = container.querySelectorAll('.pagination-li')
    allLi.forEach(elem => elem.classList.remove('active'))

    li.classList.add('active')



    li.classList.add('active')
    currentPage = liData
    showPostsOnPage(liData)
})