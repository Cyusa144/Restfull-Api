const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const wrapper = document.getElementsByClassName('wrapper')[0]
toggleButton.addEventListener('click', () => { navbarLinks.classList.toggle('active')
})
toggleButton.addEventListener('click', () => { wrapper.classList.toggle('active')
})
