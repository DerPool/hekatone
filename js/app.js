

const API = new API_v1('http://game.local');


API.getTasks().then(res => {
    console.log("Tasks")
    console.log(res);
});

API.getTaskByID(1).then(res => {
    console.log("Task by ID");
    console.log(res); 
})

API.getStore().then(res => {
    console.log("Store")
    console.log(res);
})



let shop_opened = false

document.getElementById('store_opener').addEventListener('click', function(e) {
    if (!shop_opened) {
        shop_opened = true
        $('.store__items').html('')
        $('#store').show(300);
        $('#store').find('.shop__items').append($('<div class="loader" style="width: 100%; display: flex; justify-content: center;"><img src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif"></div>'))
        API.getStore().then(storeData => {
            
            $('.loader').remove();
            for (const storeItem of storeData) {
                $('.shop__items').append($(`<div class='shop__item'><h3>${storeItem.title}</h3><p>${storeItem.description}</p><span class="price">${storeItem.cost}</span></div>`))
            }

        }).catch((e) => {
            console.log('failed to load shop')
        })
    } else {
        $('#store').hide(300)
        shop_opened = false;
        $('.shop__items').html('');
    }
})

$(document).ready(function() {
    API.getProfile().then(profileInfo => {
        console.log(profileInfo);
        $('.profile__info h3').text(profileInfo.full_name)
        $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
    })
})