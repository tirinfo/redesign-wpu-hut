/*
  nama : candra dwi cahyo
  umur : 17 tahun
  email : candradwicahyo18@gmail.com
*/

// library AOS (animate on scroll)
AOS.init({
  once: true,
  duration: 600
})

// sticky navbar event
const navContainer = document.querySelector('.nav-container');
window.addEventListener('scroll', function() {
  navContainer.classList.toggle('active', this.scrollY > 0);
});

// navbar hamburger button event
const navBoxList = navContainer.querySelector('.nav-box1');
const navToggle = navContainer.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  navBoxList.classList.toggle('active');
});

const pageTitle = document.querySelector('.page-title');
const navListItem = navContainer.querySelectorAll('ul li');
navListItem.forEach(li => {
  li.addEventListener('click', function(event) {
    event.preventDefault();
    navListItem.forEach(li => li.classList.remove('active'));
    this.classList.add('active');

    // change page title when click the navbar
    const value = this.textContent;
    
    pageTitle.textContent = value;

    // change the card according to the name of the Navbar list
    const cardCustom = document.querySelectorAll('.card-custom');
    cardCustom.forEach(card => {
      const result = (value.toLowerCase() == card.getAttribute('data-kategori') || value.toLowerCase() == 'all menu') ? card.style.display = 'block' : card.style.display = 'none';
    })
  });
});

// do Ajax
function getDataJSON(target) {
  const xhr = new XMLHttpRequest();
  const cardContainer = document.querySelector('.card-container');
  xhr.onreadystatechange = function(data) {
    if (this.readyState == 4 && this.status == 200) {
      let content = '';
      const results = JSON.parse(this.responseText).menu;

      results.forEach(result => {
        const {deskripsi, gambar, harga, kategori, nama} = result;
        content += createCard(nama, harga, deskripsi, kategori, gambar);
      });
      cardContainer.innerHTML = content;
    }
  }
  xhr.open('GET', target, true);
  xhr.send();
}

getDataJSON('assets/data/pizza.json');

function createCard(nama, harga, deskripsi, kategori, gambar) {
  return `
  <div class="col-md-4">
  <div class="card-custom" data-aos="fade-up" data-kategori="${kategori}">
  <div class="card-custom-header">
  <img src="assets/img/pizza/${gambar}" alt="" class="img-fluid" data-aos="zoom-in" data-aos-delay="100">
  <span class="card-custom-price">${harga}</span>
  </div>
  <div class="card-custom-body">
  <h4 class="text-poppins font-weight-bold m-0" data-aos="fade-up" data-aos-delay="150">${nama}</h4>
  <div class="d-flex flex-wrap">
  <p class="text-black-50 mb-1" data-aos="fade-up" data-aos-delay="200">${deskripsi}</p>
  </div>
  </div>
  </div>
  </div>
  `;
}

// searhing menu event
function searching() {
  const input = document.querySelector('.input-custom');
  input.addEventListener('keyup', function(e) {
    const value = this.value;
    
    // show all card 
    const cardCustom = document.querySelectorAll('.card-custom');
    cardCustom.forEach(card => {
      
      if (value.toLowerCase() == card.getAttribute('data-kategori')) {
        
        pageTitle.textContent = card.getAttribute('data-kategori');
        card.style.display = 'block';
        
      } else if (!value) {
        
        pageTitle.textContent = 'All Menu';
        card.style.display = 'block';
        
      } else {
        card.style.display = 'none';
      }
      
    });
  })
}

searching();
