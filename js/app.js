

const API = new API_v1('http://game.local');

const BuyItem = (item_id) => {

} 



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

let full_profile = false

$(document).ready(function() {
    $('.log__button').click(function() {
        API.getProfile($('#login_name').val()).then(profileInfo => {
            $('.profile__info h3').text(profileInfo.full_name)
            $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
            let levels = Math.floor(profileInfo.stat.exp/1000)
            $('.full__progress').text(profileInfo.stat.exp - levels * 1000+'/1000');
            $('.byt').find('.bar__inner').css('width', (profileInfo.stat.issue.domestic/1000)*100 + '%');
            $('.byt').find('.bar__inner .curval').text(profileInfo.stat.issue.domestic);
    
            $('.ofis').find('.bar__inner').css('width', (profileInfo.stat.issue.office/1000)*100 + '%');
            $('.ofis').find('.bar__inner .curval').text(profileInfo.stat.issue.office);
    
            $('.sud').find('.bar__inner').css('width', (profileInfo.stat.issue.law/1000)*100 + '%');
            $('.sud').find('.bar__inner .curval').text(profileInfo.stat.issue.law);
            $('.login__screen').hide();
        }).catch(e => {
            API.createProfile($("#login_name").val()).then(res => {
                API.getProfile($('#login_name').val()).then(profileInfo => {
                    $('.profile__info h3').text(profileInfo.full_name)
                    $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
                    let levels = Math.floor(profileInfo.stat.exp/1000)
                    $('.full__progress').text(profileInfo.stat.exp - levels * 1000+'/1000');
                    $('.byt').find('.bar__inner').css('width', (profileInfo.stat.issue.domestic/1000)*100 + '%');
                    $('.byt').find('.bar__inner .curval').text(profileInfo.stat.issue.domestic);
            
                    $('.ofis').find('.bar__inner').css('width', (profileInfo.stat.issue.office/1000)*100 + '%');
                    $('.ofis').find('.bar__inner .curval').text(profileInfo.stat.issue.office);
            
                    $('.sud').find('.bar__inner').css('width', (profileInfo.stat.issue.law/1000)*100 + '%');
                    $('.sud').find('.bar__inner .curval').text(profileInfo.stat.issue.law);
                    $('.login__screen').hide();
                })
            })
        })
    })


    $('.profile__exit').click(function(e){
        e.preventDefault()
        e.stopImmediatePropagation() 
        $('.login__screen').css('display', 'flex');
    })

    $('.nav__profile').click(function(){
        $('profile__full').show(300);
    })

    $('.profile__top').click(function(){
        if (!full_profile) {
            $('.profile__full-outer').css('opacity', '1');
            $('.profile__full-outer').css('height', '200px');
            full_profile = true
        } else {
            $('.profile__full-outer').css('opacity', '0');
            $('.profile__full-outer').css('height', '0'); 
            full_profile = false;   
        }
    })

    $('#rutina_opener').click(function(){
        $(this).addClass('active_link');
        $('main').css('background', 'unset');
        $('main').css('overflow-y', 'auto');
        $('#cases_opener').removeClass('active_link')
        $('.question__answers').html('');
        API.getTaskByID(4).then(task =>  {
            console.log(task)
            $('.question__header p').text(task.questions[0].text);
            const answers = task.questions[0].answers;
            for (const answer of answers) {
                $('.question__answers').append($(`<input type='checkbox' id='answ${answer.id}' style='display: none;'><label for='answ${answer.id}' class="answer" data-valid='${answer.valid}'>${answer.text}</label>`))
            }
            $('.question').delay(500).show(300)
        })
    })

    $('#cases_opener').click(function(){
        $('.question__answers').html('');
        $('.question').hide();
        $('main').css('background', 'url(./assets/images/Game.png) no-repeat');
        $('main').css('background-size', 'cover');

        $(this).addClass('active_link')
        $('#rutina_opener').removeClass('active_link')
    })
    $('.go_back, .go_back img').click(function(){
        $('.question__answers').html('');
        $('.question').hide();
    })
})




