

const API = new API_v1('https://artebedev.ru/');

const BuyItem = (item_id) => {

} 

let data = {}

let shop_opened = false

document.getElementById('store_opener').addEventListener('click', function(e) {

    if (!shop_opened) {
        $('.question, .question__tooltip, .store').hide();
        shop_opened = true;
        $('.man').hide();
        $('#store').show(300);
        $('main').css('background', 'url(./assets/images/shop.png) no-repeat');
        $('main').css('background-size', 'cover');
        $('main').css('overflow-y','hidden');
        $('.mask').hide();
        $('#rutina_opener, #cases_opener').removeClass('active_link');
        $(this).addClass('active_link'); 
        $('.items').html('');
      $('#store').find('.items').append($('<div class="loader" style="width: 100%; display: flex; justify-content: center;"><img src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif"></div>'))
        API.getStore().then(storeData => {
            
            $('.loader').remove();
            for (const storeItem of storeData) {
                $('.shop__items .items').append($(` <div class="item"><div></div><h3>${storeItem.title}</h3><p>${storeItem.cost}</p></div>`));
            }     

        }).catch((e) => {
            console.log('failed to load shop')
        })
    
    }
     else {
        $('.question, .question__tooltip, .store').hide();
        $('#store').hide(300)
        shop_opened = false;
        $('.items').html('');
    }
})


let full_profile = false
$(document).ready(function(){
    $('.log__button').click(function() {
        setTimeout(() => {
            let date = new Date
            let hrs = date.getHours()
            let mins = date.getMinutes()
            $('.flash_date').text(`${hrs}:${mins}`);
            $('.flash_question').css('bottom', '0%')
        }, 3000)
        API.getProfile($('#login_name').val()).then(profileInfo => {
            $('.profile__info h3').text(profileInfo.full_name)
            $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
            let levels = Math.floor(profileInfo.stat.exp/1000)
            data.level = levels;
            if (levels > 1) {
                $('main').css('background', 'url(./assets/images/cabinet_lux.png) no-repeat');
                $('main').css('background-size', 'cover');
                $('.rank').text('Middle')
            }
            $('.full__progress').text(profileInfo.stat.exp - levels * 1000+'/1000');
            $('.byt').find('.bar__inner').css('width', (profileInfo.stat.issue.domestic/1000)*100 + '%');
            $('.byt').find('.bar__inner .curval').text(profileInfo.stat.issue.domestic);
    
            $('.ofis').find('.bar__inner').css('width', (profileInfo.stat.issue.office/1000)*100 + '%');
            $('.ofis').find('.bar__inner .curval').text(profileInfo.stat.issue.office);
    
            $('.sud').find('.bar__inner').css('width', (profileInfo.stat.issue.law/1000)*100 + '%');
            $('.sud').find('.bar__inner .curval').text(profileInfo.stat.issue.law);
            $('.progress_bar_actions').css('display', 'flex');
            $('.energy_b .curval').text(profileInfo.energy ? profileInfo.energy : 10);
            $('.respect_b .curval').text(profileInfo.respect ? profileInfo.respect : 5);
            console.log(profileInfo);
            data.userid = profileInfo.id;
            console.log(data)
            $('.login__screen').hide();
        }).catch(e => {
            API.createProfile($("#login_name").val()).then(res => {
                API.getProfile($('#login_name').val()).then(profileInfo2 => {
                    $('.profile__info h3').text(profileInfo2.full_name)
                    $('.level').text(Math.floor(profileInfo2.stat.exp/1000) + ' уровень');
                    let levels = Math.floor(profileInfo2.stat.exp/1000)
                    data.level = levels;
                    if (levels > 1) {
                        $('main').css('background', 'url(./assets/images/cabinet_lux.png) no-repeat');
                        $('main').css('background-size', 'cover');
                        $('.rank').text('Middle')
                    }
                    $('.full__progress').text(profileInfo2.stat.exp - levels * 1000+'/1000');
                    $('.byt').find('.bar__inner').css('width', (profileInfo2.stat.issue.domestic/1000)*100 + '%');
                    $('.byt').find('.bar__inner .curval').text(profileInfo2.stat.issue.domestic);
            
                    $('.ofis').find('.bar__inner').css('width', (profileInfo2.stat.issue.office/1000)*100 + '%');
                    $('.ofis').find('.bar__inner .curval').text(profileInfo2.stat.issue.office);
            
                    $('.sud').find('.bar__inner').css('width', (profileInfo2.stat.issue.law/1000)*100 + '%');
                    $('.sud').find('.bar__inner .curval').text(profileInfo2.stat.issue.law);
                    $('.progress_bar_actions').css('display', 'flex')
                    $('.energy_b .curval').text(profileInfo2.energy ? profileInfo2.energy : 10);
                    $('.respect_b .curval').text(profileInfo2.respect ? profileInfo2.respect : 5);
                    data.userid = profileInfo2.id;
                    $('.login__screen').hide();
                })
            })
        })
    })

    $('.btns').click(function(){
        $('.flash_question').css('bottom', '-500%');
    })

    $('.profile__exit').click(function(e){
        e.preventDefault()
        e.stopImmediatePropagation() 
        $('.login__screen').css('display', 'flex');
        $('.progress_bar_actions').hide();
    })

    $('.nav__profile').click(function(){
        $('profile__full').show(300);
    })

    $('#rutina_opener').click(function(){
        $('.man').hide();
        console.log(+$('.level').text().split(' ')[0] > 1)
        if (+$('.level').text().split(' ')[0] > 1) {
            $('main').css('background', 'url(./assets/images/cabinet_lux.png) no-repeat');
        } else {
            $('main').css('background', 'url(./assets/images/cabinet.png) no-repeat');
        }
        $('main').css('background-size', 'cover');
        $('main').css('overflow-y','hidden');
        $('.mask').show()
        $('.question, .question__tooltip, #store').hide();
        $(this).addClass('active_link');
        $('#cases_opener, #store_opener').removeClass('active_link')

    })

    $('.profile__top').click(function(){
        if (!full_profile) {
            $('.profile__full-outer').css('opacity', '1');
            $('.profile__full-outer').css('height', '200px').css('pointer-events','all');
            full_profile = true
        } else {
            $('.profile__full-outer').css('opacity', '0');
            $('.profile__full-outer').css('height', '0').css('pointer-events','none'); 
            full_profile = false;   
        }
    })

    $('.mask svg').click(function(){
        $('.question, .question__tooltip, #store').hide();
        //$(this).addClass('active_link');
        // $('main').css('background', 'unset');
        $('main').css('overflow-y', 'auto');
        $('#cases_opener, #store_opener').removeClass('active_link')
        $('.question__answers').html('');
        data.taskid = 4;
        API.getTaskByID(4).then(task =>  {
            console.log(task)
            $('.question .question__header p').text(task.questions[0].text);
            data.questionid = task.questions[0].id;
            const answers = task.questions[0].answers;
            for (const answer of answers) {
                $('.question__answers').append($(`<div><input type='checkbox' data-answer=${answer.id} data-valid='${answer.valid}' id='answ${answer.id}' style='display: none;'><label for='answ${answer.id}' class="answer" >${answer.text}</label></div>`))
            }
            $('.question').delay(500).show(300)
        })
    })

    $('#cases_opener').click(function(){
        $('.man').show();
        $('.question, .question__tooltip, .store').hide();
        $('.question__answers').html('');
        $('.question').hide();
        $('.mask').hide();
        $('main').css('background', 'url(./assets/images/Game.png) no-repeat');
        $('main').css('background-size', 'cover');
        $('main').css('overflow-y','auto');
        $(this).addClass('active_link')
        $('#rutina_opener, #store_opener').removeClass('active_link')
        data.taskid = 5;
        API.getTaskByID(5).then(task => {
            console.log(task);
            $('.question .question__header p').text(task.questions[0].text);
            data.questionid = task.questions[0].id;
            const answers = task.questions[0].answers;
            for (const answer of answers) {
                $('.question__answers').append($(`<div><input type='radio' name='one' data-answer=${answer.id} data-valid='${answer.valid}' id='answ${answer.id}' style='display: none;'><label for='answ${answer.id}' class="answer" >${answer.text}</label></div>`))
            }
            $('.question').delay(500).show(300);
        })
    })
    $('.go_back, .go_back img').click(function(){
        $('.question__answers').html('');
        $('.question').hide();
        $('.question_tooltip').hide();
    })

    $('.send__button').click(function(){
        let answers_here = []
        let rutina = false;
        $('input[type="checkbox"]:checked').each(function(ind, el) {
            rutina = true;
            answers_here.push($(el).data('answer'))
            let answ_id = $(el).data('answer');
            let answ_valid = $(el).data('valid');
            if(!answ_valid){
                $(el).parent().find('label').css('background', '#f1e5e1');
            } else {
                $(el).parent().find('label').css('background', '#e7f1e1');
            }

        })

            let cases = false;
            let second = false;
        $('input[type="radio"]:checked').each(function(ind, el) {
            cases = true;
            if($(el).data('name') === 'six') {
                second = true;
            }
            answers_here.push($(el).data('answer'))
            let answ_id = $(el).data('answer');
            let answ_valid = $(el).data('valid');
            if(!answ_valid){
                $(el).parent().find('label').css('background', '#f1e5e1');
            } else {
                $(el).parent().find('label').css('background', '#e7f1e1');
            }

        })

        let cnt = 3;

        if(!(answers_here.includes(1)) && (cases == true) && (!second)) {
            $('.tooltip').text('Составляющей частью преступления является объект. При убийстве и умышленном причинении тяжкого телесного повреждения объектом преступления является жизнь и здоровье человека. Так как отец Татьяны Николаевны уже был мертв, в действиях соседа по купе состав преступления отсутствует.')
            $('input[type="radio"][data-answer="1"]').parent().find('label').css('background', '#f1e5e1');
            $('.question').css('transform','translateX(20px)').css('transition','.5s');
            $('.question__tooltip').show();    
            cnt--;
            }
        if(!(answers_here.includes(2)) && (cases) && (second)) {
            $('.tooltip').html('93 х 805,80 = 74939,40 – стоимость 93 шт. iPad-4 <br>74939,40 – 64063,05 = 10876,35 – экономия.')
                $('input[type="checkbox"][data-answer="2"]').parent().find('label').css('background', '#f1e5e1');
                 $('.question').css('transform','translateX(20px)').css('transition','.5s');
                $('.question__tooltip').show(); 
                cnt--;    
            }
        if(!(answers_here.includes(2)) && (!cases)) {
            $('input[type="checkbox"][data-answer="2"]').parent().find('label').css('background', '#f1e5e1');
             $('.question').css('transform','translateX(20px)').css('transition','.5s');
            $('.question__tooltip').show(); 
            cnt--;    
        }
        if(!(answers_here.includes(5))) {
            $('input[type="checkbox"][data-answer="5"]').parent().find('label').css('background', '#f1e5e1');
             $('.question').css('transform','translateX(20px)').css('transition','.5s');
            $('.question__tooltip').show();     
            cnt--;
        }
        if(!(answers_here.includes(6))) {
            $('input[type="checkbox"][data-answer="6"]').parent().find('label').css('background', '#f1e5e1');
             $('.question').css('transform','translateX(20px)').css('transition','.5s');
            $('.question__tooltip').show();     
            cnt--
        }
        
        API.sendAnswer(data.userid, data.questionid, data.taskid, answers_here);
        if (rutina) {
        $('.true_answers_count').text(cnt + " из 3")
        }
        else {
            $('.true_answers_count').text(cnt + " из 1")
        }
        if (answers_here.includes(2) && answers_here.includes(5) && answers_here.includes(6) && (rutina == true)) {
            $('.question__answers').html('');
            $('.question, .question__tooltip').hide();
            API.getProfile($('#login_name').val()).then(profileInfo => {
                $('.profile__info h3').text(profileInfo.full_name)
                $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
                let levels = Math.floor(profileInfo.stat.exp/1000)
                if(levels > 1) {
                    $('.rank').text('Middle')
                }
                data.level = levels;
                $('.full__progress').text(profileInfo.stat.exp - levels * 1000+'/1000');
                $('.byt').find('.bar__inner').css('width', (profileInfo.stat.issue.domestic/1000)*100 + '%');
                $('.byt').find('.bar__inner .curval').text(profileInfo.stat.issue.domestic);
        
                $('.ofis').find('.bar__inner').css('width', (profileInfo.stat.issue.office/1000)*100 + '%');
                $('.ofis').find('.bar__inner .curval').text(profileInfo.stat.issue.office);
        
                $('.sud').find('.bar__inner').css('width', (profileInfo.stat.issue.law/1000)*100 + '%');
                $('.sud').find('.bar__inner .curval').text(profileInfo.stat.issue.law);

                $('.energy_b .curval').text(profileInfo.energy ? profileInfo.energy : 10);
                $('.respect_b .curval').text(profileInfo.respect ? profileInfo.respect : 5);
                data.userid = profileInfo.id;
            })
         
        }
        if ((answers_here.includes(2)) && (second)) {
            $('.question__answers').html('');
            $('.question, .question__tooltip').hide();
            API.getProfile($('#login_name').val()).then(profileInfo => {
                $('.profile__info h3').text(profileInfo.full_name)
                $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
                let levels = Math.floor(profileInfo.stat.exp/1000)
                if (levels > 1) {
                    $('.rank').text('Middle')
                }
                data.level = levels;
                $('.full__progress').text(profileInfo.stat.exp - levels * 1000+'/1000');
                $('.byt').find('.bar__inner').css('width', (profileInfo.stat.issue.domestic/1000)*100 + '%');
                $('.byt').find('.bar__inner .curval').text(profileInfo.stat.issue.domestic);
        
                $('.ofis').find('.bar__inner').css('width', (profileInfo.stat.issue.office/1000)*100 + '%');
                $('.ofis').find('.bar__inner .curval').text(profileInfo.stat.issue.office);
        
                $('.sud').find('.bar__inner').css('width', (profileInfo.stat.issue.law/1000)*100 + '%');
                $('.sud').find('.bar__inner .curval').text(profileInfo.stat.issue.law);
                data.userid = profileInfo.id;
                $('.energy_b .curval').text(profileInfo.energy ? profileInfo.energy : 10);
                $('.respect_b .curval').text(profileInfo.respect ? profileInfo.respect : 5);
 })
        }
        if ((answers_here.includes(1) && (cases == true) && (!second))) {
            $('.question__answers').html('');
            $('.question, .question__tooltip').hide();
            API.getProfile($('#login_name').val()).then(profileInfo => {
                $('.profile__info h3').text(profileInfo.full_name)
                $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
                let levels = Math.floor(profileInfo.stat.exp/1000)
                if( levels > 1 ) {
                    $('.rank').text('Middle')
                }
                data.level = levels;
                $('.full__progress').text(profileInfo.stat.exp - levels * 1000+'/1000');
                $('.byt').find('.bar__inner').css('width', (profileInfo.stat.issue.domestic/1000)*100 + '%');
                $('.byt').find('.bar__inner .curval').text(profileInfo.stat.issue.domestic);
        
                $('.ofis').find('.bar__inner').css('width', (profileInfo.stat.issue.office/1000)*100 + '%');
                $('.ofis').find('.bar__inner .curval').text(profileInfo.stat.issue.office);
        
                $('.sud').find('.bar__inner').css('width', (profileInfo.stat.issue.law/1000)*100 + '%');
                $('.sud').find('.bar__inner .curval').text(profileInfo.stat.issue.law);
                $('.energy_b .curval').text(profileInfo.energy ? profileInfo.energy : 10);
                $('.respect_b .curval').text(profileInfo.respect ? profileInfo.respect : 5);
                data.userid = profileInfo.id;
                $('.login__screen').hide();
                API.getTaskByID(6).then(task =>  {
                    console.log(task)
                    $('.question .question__header p').text(task.questions[0].text);
                    data.questionid = task.questions[0].id;
                    const answers = task.questions[0].answers;
                    for (const answer of answers) {
                        $('.question__answers').append($(`<div><input type='radio' data-answer=${answer.id} data-name="six" name="six_task" data-valid='${answer.valid}' id='answ${answer.id}' style='display: none;'><label for='answ${answer.id}' class="answer" >${answer.text}</label></div>`))
                    }
                    $('.question').delay(500).show(300)
                })
                 answers_here = []


             cases = false;
        $('input[type="radio"]:checked').each(function(ind, el) {
            cases = true;
            answers_here.push($(el).data('answer'))
            let answ_id = $(el).data('answer');
            let answ_valid = $(el).data('valid');
            if(!answ_valid){
                $(el).parent().find('label').css('background', '#f1e5e1');
            } else {
                $(el).parent().find('label').css('background', '#e7f1e1');
            }

        })

         cnt = 1;

        if(!(answers_here.includes(2)) && (cases == true)) {
            $('input[type="radio"][data-answer="2"]').parent().find('label').css('background', '#f1e5e1');
            $('.question').css('transform','translateX(20px)').css('transition','.5s');
            $('.question__tooltip').show();    
            cnt--
            }

       
        API.sendAnswer(data.userid, data.questionid, data.taskid, answers_here);
        $('.true_answers_count').text(cnt + " из 1")

 
        if ((answers_here.includes(2) && (cases == true))) {
            $('.question__answers').html('');
            $('.question, .question__tooltip').hide();

            API.getProfile($('#login_name').val()).then(profileInfo => {
                $('.profile__info h3').text(profileInfo.full_name)
                $('.level').text(Math.floor(profileInfo.stat.exp/1000) + ' уровень');
                let levels = Math.floor(profileInfo.stat.exp/1000)
                if( levels > 1) {
                    $('.rank').text('Middle')

                }
                data.level = levels;
                $('.full__progress').text(profileInfo.stat.exp - levels * 1000+'/1000');
                $('.byt').find('.bar__inner').css('width', (profileInfo.stat.issue.domestic/1000)*100 + '%');
                $('.byt').find('.bar__inner .curval').text(profileInfo.stat.issue.domestic);
        
                $('.ofis').find('.bar__inner').css('width', (profileInfo.stat.issue.office/1000)*100 + '%');
                $('.ofis').find('.bar__inner .curval').text(profileInfo.stat.issue.office);
        
                $('.sud').find('.bar__inner').css('width', (profileInfo.stat.issue.law/1000)*100 + '%');
                $('.sud').find('.bar__inner .curval').text(profileInfo.stat.issue.law);
                $('.energy_b .curval').text(profileInfo.energy ? profileInfo.energy : 10);
                $('.respect_b .curval').text(profileInfo.respect ? profileInfo.respect : 5);
                data.userid = profileInfo.id;
                $('.login__screen').hide();




            })
        }


            })
        }
        /*$('.question__answers').html('');
        $('.question').hide();*/
    })
})




