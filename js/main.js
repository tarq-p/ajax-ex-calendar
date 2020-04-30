$(document).ready(function() {
    // ***************************
    moment.locale('it');
    // ***************************
    var year_ = 2018;
    var month_ = 0;
    // ***************************
    var base = moment({year: year_, month: month_});
    // ***************************
    request(base);
    // ***************************
    print(base);
    // ***************************
    $(document).on('click', '.prev, .next', function() {
        if ($(this).hasClass('prev')) {
            prevM(base);
        } else {
            nextM(base);
        }
    });
});
// ***************************
// *-------*function*--------*
// ***************************
function request(base) {
    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/holidays",
            method: "GET",
            data: {
                year : base.year(),
                month : base.month()
            },
            success: function (r) {
                if (r.success) {
                    console.log(r.response);
                    holidays(r.response);
                } else {
                    error();
                }
            },
            error: function () {
                error();
            }
        }
    );
}
// ***************************
function print(base) {
var builderDay = Handlebars.compile($('#day').html());
var builderMonth = Handlebars.compile($('#month').html());
var config_month = {
    'month' : base.format('MMMM')
    }
$('.month').append(builderMonth(config_month));
for (var i = 1; i <= base.daysInMonth(); i++) {
    var config_days = {
        'data': i,
        'day' : base.date(i).format('dddd D YYYY')
        }
    $('.days').append(builderDay(config_days));
    }
}
// ***************************
function holidays(resp) {
var builderHol = Handlebars.compile($('#holiday').html());
for (var i = 0; i < resp.length; i++) {
    if (moment(resp[i].date).isValid()) {
        for (var x = 0; x < $('.days li').length; x++) {
            if (moment(resp[i].date).date() == $('.days li').eq(x).attr('data')) {
                $('.days li').eq(x).addClass('holiday');
                $('.days li').eq(x).append(builderHol(resp[i]));
                }
            }
        }
    }
}
// ***************************
function prevM(base) {
    base = base.subtract(1, 'months');
    request(base);
    $('.month h1').remove();
    $('.days li').remove();
    print(base);
    if (base.month() == 0) {
        $('.prev').css({'display' : 'none'});
    } else {
        $('.next').css({'display' : 'block'});
    }
}
// ***************************
function nextM(base) {
    base = base.add(1, 'months');
    request(base);
    $('.month h1').remove();
    $('.days li').remove();
    print(base);
    if (base.month() == 11) {
        $('.next').css({'display' : 'none'});
    } else {
        $('.prev').css({'display' : 'block'});
    }
}
// ***************************
function error() {
    console.log('ERROR');
}
// ***************************
