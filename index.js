const popupBlackout = document.querySelector('.popup-blackout');
const showMoreButtons = document.querySelectorAll('.show-more-btn');
const modalButton = document.querySelector('.modal-btn');
const burgerMenu = document.querySelector('.burger-menu');
const menuFromBurger = document.querySelector('.menu-from-burger');
const blackout = document.querySelector('.blackout');
const sliderArrows = document.querySelector('.slider-button');
const sliderArrowsReverted = document.querySelector('.slider-button_reverted');
const petItems = document.querySelectorAll('.pets__cards-item')

let pets = [];
const request = new XMLHttpRequest();
request.open('GET', './assets/pets.json');
request.onload = () => {
    pets = JSON.parse(request.response);
}
request.send();

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


sliderArrows.addEventListener('click', createSliderPack);
sliderArrowsReverted.addEventListener('click', createSliderPack);

let lastIndexPack = new Set([0, 1, 2])

function getRandom(max, count) {
    let uniqueIndexes = new Set();
    while (uniqueIndexes.size < count) {
        let randomNumber = Math.floor(Math.random() * max)
        if (lastIndexPack.has(randomNumber)) {
            continue;
        }
        uniqueIndexes.add(randomNumber)
    }
    lastIndexPack = uniqueIndexes
    return uniqueIndexes
}

function createSliderPack() {
    const clientWidth = document.documentElement.clientWidth
    if (clientWidth >= 1280) {
        const array = [...getRandom(pets.length, 3)]
        generatePets(3, array)

    }
    if (clientWidth < 1280) {
        const array = [...getRandom(pets.length, 2)]
        generatePets(2, array)

    }
    if (clientWidth < 768) {
        const array = [...getRandom(pets.length, 1)]
        generatePets(1, array)

    }
}

function generatePets(count, array) {
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < 3; j ++) {
            petItems[i].children[j].classList.add('animation-op0');
        }
        setTimeout(() => {
            petItems[i].children[0].src = `${pets[array[i]]["img"]}`;
            petItems[i].children[0].alt = `${pets[array[i]]["name"]}`;
            petItems[i].children[1].textContent = `${pets[array[i]]['name']}`;
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
    }
}