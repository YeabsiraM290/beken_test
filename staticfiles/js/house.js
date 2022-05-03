let main_con = document.getElementsByClassName('items-con')[0]
let pagination_con = document.getElementsByClassName('pagination')[0]
let filter_btn = document.getElementById('filter_btn')
let date_filter = document.getElementById('date')
let price_filter = document.getElementById('price')

date_filter.addEventListener('change', filter)
price_filter.addEventListener('change', filter)
filter_btn.addEventListener('click', filter)


document.addEventListener("DOMContentLoaded", function(event) {
    render_data()
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var passed_values = getParameterByName('page');

if (passed_values) {
    var current_page = passed_values.split('=')[0];
} else {
    var current_page = 1;
}

var host = window.location.origin

var base_url = `${host}/api/house/?${getParameterByName('filters')?getParameterByName('filters'):''}`
var page_no = 1

function filter() {

    current_page = 1
    let bed_start = document.getElementById('bed_start').value
    let bed_end = document.getElementById('bed_end').value
    let price_min = document.getElementById('price_min').value
    let price_max = document.getElementById('price_max').value
    base_url = `${host}/api/house?`
    filters = `${price_min?"min_price=".concat(price_min).concat('&'):''}${price_max?"max_price=".concat(price_max).concat('&'):''}${bed_start?"min_room=".concat(bed_start).concat('&'):''}${bed_end?"max_room=".concat(bed_end).concat('&'):''}`

    base_url = base_url.concat(filters)
    render_data()

}

async function get_data() {
    console.log(base_url.concat('p='.concat(current_page)))
    let response = await fetch(base_url.concat('p='.concat(current_page)));
    let mixed_data = await response.json();
    page_no = response.headers.get('num_pages')
    return mixed_data
}

function render_data() {
    let outPut = "";
    let error = "";
    let pagination_no = '';
    get_data().then(function(data) {

        if (data.length > 0) {

            if (date_filter.value == 'old') {
                data = data.sort(function(a, b) {
                    console.log(b.id)
                    return a.id - b.id;
                });
            }

            if (price_filter.value == 'low') {
                data = data.sort(function(a, b) {
                    console.log(b.id)
                    return a.price - b.price;
                });
            }

            data.forEach(property => {
                outPut += `     
            <div class="col-md-4 mb-3">
            <div class="card-sl">
                <div class="card-image">
                    <img
                        src="${host}/media/${property.images[0]}" />
                </div>

                <div class="card-heading text-center">
                ${property.header ? property.header : '-'}
                </div>
                <div class="row text-center feature-list  mb-3">

                    <div class="col-md"><b>Bed room: </b> ${property.more ? property.more['bed_rooms'] : '-'}</div>
                    <div class="col-md"><b>Floor:</b> ${property.more ? property.more['floors'] : '-'}</div>

                </div>
                <div class="row text-center feature-list mb-3">
                    <div class="col-md"><b>Size: </b>${property.more ? property.more['size'] : '-'}</div>
                    <div class="col-md"><b>Price: </b>${property.price ? property.price : '-'}</div>

                </div>

                <div class="row text-center feature-list  mb-3">

                    <div class="col-md"><b>Location: </b>${property.more ? property.more['location'] : '-'}</div>
                   
                </div>


                <a href="detail?id=${property.id} cat=${property.catagory}" class="card-button"> More</a>
            </div>
        </div>
        `
            });
        } else {
            outPut += ` <div class="col-md mb-3"> 
        <div class="error-con">
        <p><b>No result found...</b></p>
      </div>
      </div>`
        }
        main_con.innerHTML = outPut;

        for (let i = 1; i <= page_no; i++) {

            if (i == current_page) {
                pagination_no += `<a class='active' href="#">${i}</a>`

            } else if (i == current_page + 1) {
                pagination_no += `<a  href="house?${filters}page=${current_page+1}">${i}</a>`

            } else if (i == current_page - 1) {
                pagination_no += `<a href="house?${filters}page=${current_page-1}">${i}</a>`

            } else {
                pagination_no += `<a  href="house?${filters}page=${i}">${i}</a>`
            }

        }

        pagination_con.innerHTML = pagination_no
    })

    .catch(function(err) {
        error += `    
        <div class="mb-3"> 
        <div class="error-con">
        <p class="text-center"><b>Problem connecting</b> <br> ${err} <br> Check your internet connecting and try again</p>
      </div>
      </div>
  `
        main_con.innerHTML = error
    });
}