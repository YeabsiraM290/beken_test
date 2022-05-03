let main_con = document.getElementsByClassName('about-section')[0]
let social_icons = document.getElementById('social-platforms')

document.addEventListener("DOMContentLoaded", function(event) {
    render_data()
});

var host = window.location.origin

async function get_data() {

    let response = await fetch(host.concat('/api/about/1'));
    let data = await response.json();
    console.log(data)
    return data
}

function render_data() {
    let outPut = "";
    let icons = "";
    let error = ""
    let about_con = document.getElementsByClassName('contact-con')[0]
    get_data().then(function(data) {

            outPut += `     
                <h1 class="mb-2">About Us</h1>
                <p class="mt-5">${data.bio ? data.bio : '-'}</p>
            `
            icons += `
            <a class="btn btn-icon btn-call" href="tel:${data.phone_number}"><i class="fa fa-phone"></i><span>${data.phone_number}</span></a>
            <a class="btn btn-icon btn-telegram" target=”_blank” href="${data.telegram}"><i class="fa-brands fa-telegram"></i><span>${data.telegram}</span></a>
            <a class="btn btn-icon btn-facebook" target=”_blank” href="#"><i class="fa-brands fa-facebook"></i><span>Facebook</span></a>
            <a class="btn btn-icon btn-instagram" target=”_blank” href="${data.instagram}"><i class="fa-brands fa-instagram"></i><span>${data.instagram}</span></a>
            <a class="btn btn-icon btn-email" target=”_blank” href="${data.tiktok}"><i class="fa-regular fa-at"></i></i><span>${data.tiktok} </span></a> 
            <a class="btn btn-icon btn-youtube" target=”_blank” href="${data.youtube}"><i class="fa-brands fa-youtube"></i><span>${data.youtube}</span></a>
            <a class="btn btn-icon btn-tiktok" target=”_blank” href="${data.tiktok}"><i class="fa-brands fa-tiktok"></i><span>${data.tiktok} </span></a> 
            `

            main_con.innerHTML = outPut;
            social_icons.innerHTML = icons;
        })
        .catch(function(err) {
            error += `    
        <div class="col-md mb-3"> 
        <div class="error-con">
        <p class="text-center"><b>Problem connecting</b> <br> Check your internet connecting and try again</p>
      </div>
      </div>
  `
            about_con.innerHTML = error
        });
}