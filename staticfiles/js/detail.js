function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var passed_values = getParameterByName('id');
var id = passed_values.split(' ')[0];
var category = passed_values.split('=')[1].toLocaleLowerCase();

document.addEventListener("DOMContentLoaded", function(event) {
    render_data()
    render_contact_data()
});

var host = window.location.origin

let url = host.concat("/api/").concat(category, '/', id, '/')
console.log(id)

async function get_data() {
    let response = await fetch(url);
    let data = await response.json();
    return data
}

async function get_contact_data() {

    let response = await fetch(host.concat('/api/about/1'));
    let data = await response.json();
    // console.log(response)
    return data
}

var slideCounter = 0;
let main_con = document.getElementsByClassName('carosul-con')[0];
var carousel_indicators = document.querySelector('.carousel-indicators');
var carousel_inner = document.querySelector('.carousel-inner');
var more_info = document.querySelector('.moreinfo');
let social_icons = document.getElementById('social-platforms');

function render_contact_data() {

    let icons = ""
    get_contact_data().then(function(data) {


        icons += `
            <a class="btn btn-icon btn-call" href="tel:${data.phone_number}"><i class="fa fa-phone"></i><span>${data.phone_number}</span></a>
            <a class="btn btn-icon btn-telegram" target=”_blank” href="${data.telegram}"><i class="fa-brands fa-telegram"></i><span>${data.telegram}</span></a>
            <a class="btn btn-icon btn-facebook" target=”_blank” href="#"><i class="fa-brands fa-facebook"></i><span>Facebook</span></a>
            <a class="btn btn-icon btn-instagram" target=”_blank” href="${data.instagram}"><i class="fa-brands fa-instagram"></i><span>${data.instagram}</span></a>
            <a class="btn btn-icon btn-email" target=”_blank” href="${data.tiktok}"><i class="fa-regular fa-at"></i></i><span>${data.tiktok} </span></a> 
            <a class="btn btn-icon btn-youtube" target=”_blank” href="${data.youtube}"><i class="fa-brands fa-youtube"></i><span>${data.youtube}</span></a>
            <a class="btn btn-icon btn-tiktok" target=”_blank” href="${data.tiktok}"><i class="fa-brands fa-tiktok"></i><span>${data.tiktok} </span></a> 
            `
        social_icons.innerHTML = icons;
    })

}

function render_data() {

    get_data().then(function(data) {

            let outputimg = '';
            let slides = '';
            let url = '';
            let outPut = '';

            data['images'].forEach(function(img) {

                url = host.concat('/media/').concat(img);
                console.log(url)

                slides += `   <button type="button" data-bs-target="#indicators" data-bs-slide-to="${slideCounter}" class="active"
            aria-current="true" aria-label="Slide 1"></button>`


                if (slideCounter == 0) {

                    outputimg += `<div class="carousel-item active">
                <img class="myImg"
                    src="${url}"
                    alt="Trolltunga, Norway">
            </div>`
                } else {

                    outputimg += `<div class="carousel-item">
                <img class="myImg"
                    src="${url}"
                    alt="Trolltunga, Norway">
            </div>`
                }

                slideCounter += 1;

            });

            carousel_indicators.innerHTML = slides;
            carousel_inner.innerHTML = outputimg;

            if (category == 'car') {

                outPut = `
    <p class="mt-3 detail-title"> ${data.header} <br> <small>${data.price} </small> birr</p>
    <div class="row features">
        <div class="col-md"><b>Brand: </b><br> ${data.more['brand']}</div>
        <div class="col-md"><b>Model: </b><br>${data.more['car_model']}</div>
        <div class="col-md"><b>Year: </b><br>${data.more['year']}</div>
        <div class="col-md"><b>Condition:</b><br> ${data.more['condition']}</div>
        <div class="col-md"><b>Transmission: </b><br>${data.more['transmission']}</div>
    </div>

    <div class="col detail-disc mt-1">${data.discription}</div>

`
            } else {


                outPut = `
    <p class="mt-3 detail-title"> ${data.header} <br> <small>${data.price} </small> birr</p>
    <div class="row features">
        <div class="col-md"><b>Bed room: </b><br> ${data.more ? data.more['bed_rooms'] : '-'}</div>
        <div class="col-md"><b>Floor: </b><br>${data.more ? data.more['floors'] : '-'}</div>
        <div class="col-md"><b>Size: </b><br>${data.more ? data.more['size'] : '-'}</div>
        <div class="col-md"><b>Location:</b> <br>${data.more ? data.more['location'] : '-'}</div>
     
    </div>

    <div class="col detail-disc">${data.discription}</div>

`
            }

            more_info.innerHTML = outPut
            zoom()

        })
        .catch(function(err) {
            let error = '';
            error += `    
        <div class="col-md mb-3"> 
        <div class="error-con">
        <p><b>Problem connecting</b> <br> Check your internet connecting and try again</p>
      </div>
      </div>
  `
            main_con.innerHTML = error
        });

}

//for delaying
function zoom() {

    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("img01");
    var imgs = document.querySelectorAll('.myImg');


    imgs.forEach(element => {
        element.addEventListener('click', zoom);

    });

    function zoom(e) {
        console.log('cliked')
        modal.style.display = "block";
        modalImg.src = e.target.src;
        modalImg.alt = e.target.alt;

    }

    modal.onclick = function() {
        img01.className += " out";
        setTimeout(function() {
            modal.style.display = "none";
            img01.className = "modal-content";
        }, 400);

    }

}