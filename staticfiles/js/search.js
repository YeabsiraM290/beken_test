function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", function(event) {
    render_data()
});

let main_con = document.getElementsByClassName('items-con')[0]
let pagination_con = document.getElementsByClassName('pagination')[0]

var search_key = getParameterByName('search');

var passed_values = getParameterByName('page');

if (passed_values) {
    var current_page = passed_values.split('=')[0];
} else {
    var current_page = 1;
}

var host = window.location.origin

let base_url = host.concat("/api/property/?search=")
let request_url = base_url.concat(search_key).concat('&p=').concat(current_page)
var page_no = 1

async function get_data() {

    let response = await fetch(request_url);
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
                data.forEach(property => {
                    outPut += `     
                <div class="col-sm-4 mb-3">
                <div class="item-card">
                  <img class="item-card-img"
                    src="${host}/media/${property.images[0]}"
                    alt="Snow" style="width:100%;">
                  <div class="bottom-left-header">${property.header}</div>
                  <div class="bottom-left-price">${property.price} birr</div>
                  <button class="bottom-left-more"><a href="detail?id=${property.id} cat=${property.catagory}">View detail</a></button>
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
                    pagination_no += `<a  href="search?search=${search_key}&page=${current_page+1}">${i}</a>`

                } else if (i == current_page - 1) {
                    pagination_no += `<a href="search?search=${search_key}&page=${current_page-1}">${i}</a>`

                } else {
                    pagination_no += `<a  href="search?search=${search_key}&page=${i}">${i}</a>`
                }

            }

            pagination_con.innerHTML = pagination_no
        })
        .catch(function(err) {
            error += `    
      <div class="col-md mb-3"> 
      <div class="error-con">
      <p><b>Problem connecting</b> <br> ${err}<br>Check your internet connecting and try again</p>
    </div>
    </div>
`
            main_con.innerHTML = error
        });

}