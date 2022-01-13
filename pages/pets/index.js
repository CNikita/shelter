let pets = [];
const popupBlackout = document.querySelector('.popup-blackout');
const showMoreButtons = document.querySelectorAll('.show-more-btn');
const modalButton = document.querySelector('.modal-btn');
const burgerMenu = document.querySelector('.burger-menu');
const menuFromBurger = document.querySelector('.menu-from-burger');
const blackout = document.querySelector('.blackout');
const sliderArrows = document.querySelector('.slider-button');
const sliderArrows2 = document.querySelector('.slider-button2');
const sliderArrowsReverted = document.querySelector('.slider-button_reverted');
const sliderArrowsReverted2 = document.querySelector('.slider-button_reverted2');
const paginationBtnCenter = document.querySelector('.pagination__btn_center');
const petItems = document.querySelectorAll('.card');

const request = new XMLHttpRequest();
request.open('GET', '../../assets/pets.json');
request.onload = () => {
    pets = JSON.parse(request.response);
}
request.send();

function getRandom() {
    let fullPetsList = []
    let uniqueIndexes = [];
    fullPetsList.push(pets)
    for (let i = 0; i < 15; i++) {
        while (uniqueIndexes.length < 8) {
            let randomNumber = Math.floor(Math.random() * 8)
            if (!uniqueIndexes.includes(pets[randomNumber])) {
                uniqueIndexes.push(pets[randomNumber])
            } 
        }   
        fullPetsList.push(uniqueIndexes)
        uniqueIndexes = []
    };
    return fullPetsList
}

function showModal(item) {
    let name = item.path[1].children[1].textContent.trim();
    document.querySelector('body').style.overflow = 'hidden'
    popupBlackout.style.display = 'block'
    for (let pet of pets) {
        if (pet["name"] === name) {
            document.querySelector('.modal-pet-image').src = pet["img"]
            document.querySelector('.name').textContent = pet["name"]
            document.querySelector('.breed').textContent = `${pet["type"]} -  ${pet["breed"]}`
            document.querySelector('.description').textContent = pet["description"]
            document.querySelector('.age').textContent = pet["age"]
            document.querySelector('.inoculations').textContent = pet["inoculations"]
            document.querySelector('.diseases').textContent = pet["diseases"]
            document.querySelector('.parasites').textContent = pet["parasites"]
        }
    }
}

function closeModal() {
    popupBlackout.style.display = 'none'
    document.querySelector('body').style.overflow = 'visible'
    document.querySelectorAll('.pet-slider').forEach(item => item.classList.remove('clicked'))
}

showMoreButtons.forEach(button => button.addEventListener('click', showModal))
popupBlackout.addEventListener('click', closeModal)
modalButton.addEventListener('click', closeModal)

function toggleMenu() {
    burgerMenu.classList.toggle('rotatedBurger')
    if (burgerMenu.classList.contains('rotatedBurger')) {
        document.querySelector('body').style.overflow = 'hidden'
        menuFromBurger.style.right = '0'
        blackout.style.display = 'block';
        blackout.style.opacity = '1';
        blackout.addEventListener('click', toggleMenu)
    } else {
        document.querySelector('body').style.overflow = 'visible'
        menuFromBurger.style.right = '-320px'
        blackout.style.display = 'none'
        blackout.style.opacity = '0';
        blackout.removeEventListener('click', toggleMenu);
    }
}

burgerMenu.addEventListener('click', toggleMenu)


sliderArrows.addEventListener('click', pagination);
sliderArrows2.addEventListener('click', pagination);
sliderArrowsReverted.addEventListener('click', pagination);
sliderArrowsReverted2.addEventListener('click', pagination);

const clientWidth = document.documentElement.clientWidth

function createSliderPack(page) {
    if (clientWidth >= 1280) {
        generatePets(8, page)

    }
    if (clientWidth < 1280) {
        generatePets(6, page)

    }
    if (clientWidth < 768) {
        generatePets(3, page)

    }
}
let array = []
function generatePets(count, page) {
    if (array.length == 0) {
        array = getRandom()
    }
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < 3; j ++) {
            petItems[i].children[j].classList.add('animation-op0');
        }
        setTimeout(() => {
            petItems[i].children[0].children[0].src = `${array[page-1][i]["img"]}`;
            petItems[i].children[0].children[0].alt = `pets-${array[page-1][i]['name']}`
            petItems[i].children[1].textContent = `${array[page-1][i]['name']}`;
            for (let j = 0; j < 3; j ++) {
                petItems[i].children[j].classList.add('animation-op1');
            }
        }, 1500);
        setTimeout(() => {
            for (let j = 0; j < 3; j ++) {
                petItems[i].children[j].classList.remove('animation-op1');
                petItems[i].children[j].classList.remove('animation-op0');
            }
        }, 3000)
        // petItems[i].children[0].children[0].src = `${array[page-1][i]["img"]}`;
        // petItems[i].children[0].children[0].alt = `pets-${array[page-1][i]['name']}`
        // petItems[i].children[1].textContent = `${array[page-1][i]['name']}`;
    }
}
let maxPage = 16;
let page = 1;

function pagination(event) {
    page = Number(paginationBtnCenter.children[0].textContent.trim());
    if (clientWidth >= 1280) {
        maxPage = 6;
    }
    if (clientWidth < 1280) {
        maxPage = 8;
    }
    if (clientWidth < 768) {
        maxPage = 16;
    }
    switch (event.target.classList[1]) {
        case 'slider-button_reverted':
            page = page + 1;
            break;
        case 'slider-button_reverted2':
            page = maxPage;
            break;
        case 'slider-button':
            page = page - 1;
            break;
        default:
            page = 1
            break;
    }
    if (page == 1) {
        sliderArrows.classList.remove('pink-btn');
        sliderArrows.classList.add('grey-btn');
        sliderArrows2.classList.remove('pink-btn');
        sliderArrows2.classList.add('grey-btn');
        sliderArrowsReverted.classList.add('pink-btn');
        sliderArrowsReverted2.classList.add('pink-btn');
        sliderArrowsReverted.classList.remove('grey-btn');
        sliderArrowsReverted2.classList.remove('grey-btn');
        sliderArrows.disabled = true;
        sliderArrows2.disabled = true;
        sliderArrowsReverted.disabled = false;
        sliderArrowsReverted2.disabled = false;
    } else if (page == maxPage) {
        sliderArrowsReverted.classList.remove('pink-btn');
        sliderArrowsReverted.classList.add('grey-btn');
        sliderArrowsReverted2.classList.remove('pink-btn');
        sliderArrowsReverted2.classList.add('grey-btn');
        sliderArrows.classList.add('pink-btn');
        sliderArrows2.classList.add('pink-btn');
        sliderArrows.classList.remove('grey-btn');
        sliderArrows2.classList.remove('grey-btn');
        sliderArrowsReverted.disabled = true;
        sliderArrowsReverted2.disabled = true;
        sliderArrows.disabled = false;
        sliderArrows2.disabled = false;
    } else {
        let arr = [sliderArrows, sliderArrows2, sliderArrowsReverted, sliderArrowsReverted2];
        arr.forEach(element => {
            element.classList.remove('grey-btn')
            element.classList.add('pink-btn')
            element.disabled = false;
        })
    }
    paginationBtnCenter.children[0].textContent = page;
    createSliderPack(page);
}