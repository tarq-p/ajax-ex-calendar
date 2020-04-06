$(document).ready(function () {

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('2018-01-01');

    var limiteIniziale = moment('2018-01-01');
    var limiteFinale = moment('2018-12-31');

    stampaGiorniMese(dataIniziale);
    stampaFestivi(dataIniziale);

    $('.mese-succ').click(function () {
        $('.mese-prec').prop('disabled', false);
        dataIniziale.add(1, 'month');
        stampaGiorniMese(dataIniziale);
        stampaFestivi(dataIniziale);
    });

    $('.mese-prec').click(function () {
         if(dataIniziale.isSameOrBefore(limiteIniziale)){
              alert('Hai provato ad hackerarmi! :( ');
         } else {
             dataIniziale.subtract(1, 'month');
             stampaGiorniMese(dataIniziale);
             stampaFestivi(dataIniziale);
             if(dataIniziale.isSameOrBefore(limiteIniziale)) {
                $('.mese-prec').prop('disabled', true);
           }
         }




    });

    function stampaFestivi(variabileMeseCorrente) {
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: variabileMeseCorrente.year(),
                month: variabileMeseCorrente.month()
            },
            success: function (data) {
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    $('#calendar li[data-day="' + dataFestivo + '"]').addClass('festivo').append(' - ' + nomeFestivo);
                }
            }
        });
    }

    function stampaGiorniMese(meseDaStampare) {
        $('#calendar').empty();
        var standardDay = meseDaStampare.clone();
        var giorniMese = meseDaStampare.daysInMonth();
        var nomeMese = meseDaStampare.format('MMMM');
        $('#nome-mese').text(nomeMese);
        for (var i = 1; i <= giorniMese; i++) {
            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
                dataDay: standardDay.format('YYYY-MM-DD')
            }
            var templateFinale = templateGiorno(giornoDaInserire);
            $('#calendar').append(templateFinale);
            standardDay.add(1, 'day');
        }
    }

});
