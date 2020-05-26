$(document).ready(function() {

    // preparo le variabili per handlebars
    var template_html = $('#card-template').html();
    var template = Handlebars.compile(template_html);

    // intercetto i tasti del campo di testo
    $('#ricerca').keyup(function(event) {
        if(event.which == 13) {
            // l'utnete ha premuto INVIO
            ricerca();
        }
    });

    //clicco sul pulsante;
    $('#pulsante-ricerca').click(function (){
        ricerca();
    });

    // funzione per effettuare una ricerca a tmdb
    function ricerca (){
        //leggo cio che ha scritto l'utente nell' imput;
        var ricerca_utente = $('#ricerca').val().trim();

        if (ricerca_utente.length > 0) {
            reset_risultati();

            //faccio una chiamata ajax
            $.ajax({
                'url':'https://api.themoviedb.org/3/search/movie',
                'method' : 'GET',
                'data': {
                    'api_key' : '7a5c4ff6044370a409724f73ef7b1cab',
                    'query' : ricerca_utente,
                    'language' : 'it',
                },
                'success' : function (data) {
                    // inserisco il testo cercato dall'utente nel titolo della pagina
                    $('.nome_ricerca').text(ricerca_utente);
                    // visualizzo il titolo della pagina
                    $('.titolo-ricerca').addClass('visible');

                    var array_oggetti = data.results;

                    //leggo cosa ce in ogni singolo oggetto;
                    for (var i = 0; i < array_oggetti.length; i++) {
                        //leggo l'oggetto nella posizione ciclata al momento;
                        var oggetto = array_oggetti[i];

                        disegna_card(oggetto);
                    };
                },
                'error' : function () {
                    alert('si è verificato un errore!');
                }
            });
            //chiamata ajax per le serie tv;
            $.ajax({
                'url': 'https://api.themoviedb.org/3/search/tv',
                'method': 'GET',
                'data': {
                    'api_key': '7a5c4ff6044370a409724f73ef7b1cab',
                    'query': ricerca_utente,
                    'language': 'it'
                },
                'success': function(data) {
                    var array_serietv = data.results;

                    for (var i = 0; i < array_serietv.length; i++) {
                        var serie_corrente = array_serietv[i];

                        disegna_card_serietv(serie_corrente);
                    }
                },
                'error': function() {
                    alert('Si è verificato un errore')
                }
            });
        } else {
            alert('digita almeno 2 caratteri')
        };
    };

    // funzione per resettare la pagina e prepararla all'inserimento di nuovi risultati
    function reset_risultati() {
        // // resetto l'input testuale
        $('#ricerca').val('');
        // nascondo il titolo della pagina
        $('.titolo-ricerca').removeClass('visible');
        // svuoto il contenitore dei risultati
        $('#risultati_ricerca').empty();
    };

    // funzione per appendere una card ai risultati
    function disegna_card(oggetto) {
        // preparo i dati per il template
        var placeholder = {
            'titolo': oggetto.title,
            'titolo_originale': oggetto.original_title,
            'lingua': oggetto.original_language,
            'voto': stelle(oggetto.vote_average),
        };
        var html_card = template(placeholder);
        // appendo la card con i dati del risultato corrente
        $('#risultati_ricerca').append(html_card);
    };

    // funzione per appendere una card ai risultati
    function disegna_card_serietv(oggetto) {
        // preparo i dati per il template
        var placeholder = {
            'titolo': oggetto.name,
            'titolo_originale': oggetto.original_name,
            'lingua': oggetto.original_language,
            'voto': stelle(oggetto.vote_average),
        };
        var html_card = template(placeholder);
        // appendo la card con i dati del risultato corrente
        $('#risultati_ricerca').append(html_card);
    };

    //funzione per sostituire i voti con le stelle;
    function stelle(voti){
        //divido due e arrotondo il voto;
        var voto = Math.ceil(voti / 2);
        var stella = '';
        var stelle_vuote = '';
        //in base al numero stampo la quantita di stelle;
        for (var i = 0; i < voto; i++) {
            stella += '<i class="fas fa-star"></i>';
        }
        for (var i = 0; i < (5 - voto); i++) {
            stelle_vuote += "<i class='far fa-star'></i>";
        }
        return stella + stelle_vuote;
    };

    //funzione per inserire le bandiere
    function bandierine(lingua) {
        var array_lingue = ["en", "es", "fr", "it"];

        if (array_lingue.includes(lingua)) {
            var bandierina = '<img src="img/' + lingua + '-flag.png">';
        } else {
            var lingua_originale = lingua;
        }
        return bandierina
    }
});
