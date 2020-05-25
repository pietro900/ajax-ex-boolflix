$(document).ready(function() {
    //clicco sul pulsante;
    $('#pulsante-ricerca').click(function (){
        //leggo cio che ha scritto l'utente nell' imput;
        var ricerca_utente = $('#ricerca').val();
        console.log(ricerca_utente);
    });

    //faccio una chiamata ajax
    $.ajax({
        'url':'https://api.themoviedb.org/3/search/movie',
        'method' : 'GET',
        'data': {
            'api-key' : '7a5c4ff6044370a409724f73ef7b1cab',
            //'1c7b2e694ddcf16ad887d9d9f6cacab8',
            'query' : ricerca_utente,
            //'batman',
        },
        'success' : function (data) {
            var array_oggetti = data.response;
            console.log(array_oggetti);

            //leggo cosa ce in ogni singolo oggetto;
            for (var i = 0; i < array_oggetti.length; i++) {
                //leggo l'oggetto nella posizione ciclata al momento;
                var oggetto = array_oggetti[i];
                console.log(oggetto);

                var titolo = oggetto.title;
                var titolo_originale = oggetto.original_title;
                var lingua = oggetto.original_language;
                var voto = oggetto.vote_average;
            };
        },
        'error' : function () {
            alert('si è verificato un errore!');
        }
    });

});
