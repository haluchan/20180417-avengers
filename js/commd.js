$(document).ready(function () {

    $('.logo').on('click touchstart', function () {
        $('.page1').fadeOut(10);
        $('.page2').fadeIn();
        gs('進入預告頁');

    });


//FB
    let shareFB = function() {
        let myUrl = 'http://www.facebook.com/share.php?u=' + encodeURIComponent('https://www.youtube.com/watch?v=JlGkuFI-lj0');
        gs('臉書分享');
        window.open(myUrl, 'window', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
    };
    $('.shareBtn').on('click touchstart', shareFB);


    $('.lotteryBtn').on('click touchstart', function () {
        $('.page2').fadeOut(10);
        $('.page3').fadeIn();
        gs('進入抽獎頁');

    });



//送出表單
    $('.f-btn').on('click touchstart', function () {

        let name = $('input[name="name"]').val();
        let phone = $('input[name="phone"]').val();
        let mail = $('input[name="mail"]').val();

        checkdata(name, phone, mail);

        console.log('click');
    });


    function checkdata(name, phone, mail) {


        let mailfrom = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phonefrom =/09[0-9]{8}/;

        if ( name === "") {
            erroredMsg("請輸入名字");
            return false;
        } else if (!phonefrom.test(phone)) {
            erroredMsg("手機格式有誤");
            return false;
        } else if(!mailfrom.test(mail)) {
            erroredMsg("E-mail格式有誤");
            return false;
        }else if($('#privacy-c')[0].checked !== true){
            erroredMsg("請勾選同意送出個人資料");
            return false;
        }else{
            sentData(name, phone, mail);
            return true;
        }


    }

    function sentData(fname, fphone, fmail) {

        $.ajax({
            method: "POST",
            url: "https://form.ad2iction.com/api/form.json",
            data: {
                source:'avengers3', //後台表單名稱
                name: fname,
                phone: fphone,
                mail: fmail
            },
            success:function (r) {
                if (r.message == 'ok') {
                    gs('抽獎資料送出成功');
                    erroredMsg('成功送出，感謝您參加【復仇者聯盟3：無限之戰】活動');
                    setTimeout(function () {
                        $('.page3').fadeOut(10);
                        $('.page2').fadeIn();
                        $('.page2 .lotteryBtn').hide();
                        nowVideo.playVideo();
                    }, 1400);
                } else {
                    erroredMsg(r.message);
                }
            },
            error: function () {
                gs('抽獎資料送出失敗');
            }
        });


    }

    function erroredMsg (msg) {
        let $pop, timmer;

        $pop = $('#popup');
        $pop.addClass('show').find('.content').text(msg);
        timmer = setTimeout(function () {
            $pop.removeClass('show');
        }, 1200);
    }

    function print(msg) {
        $('#print').text(msg);
    }
});