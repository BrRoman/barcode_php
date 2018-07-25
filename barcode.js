$(document).ready(function(){
    $('#input').val('');

    $('#input').keyup(function(e){
        var barcode = e.target.value.split('');
        for(var i = 0; i < barcode.length; i++){
            barcode[i] = parseInt(barcode[i]);
        }

        if(barcode.length > 13){
            $('#output').text('Trop de caractères…');
            $('#output').css({'display': 'flex', 'color': 'red'});
        }

        else if(barcode.length == 13){
            var sum = 0;
            for(var i = 0; i < 12; i++){
                sum += barcode[i] * ((i % 2 == 0) ? 1 : 3);
            }
            if(10 - (sum % 10) == barcode[12] || ((sum % 10) == 0 && barcode[12] == 0)){
                $('#output').text('Veuillez patienter…');
                $('#output').css({'display': 'flex'});
                barcode = barcode.join('');
                $.ajax({
                    url: 'generate/generate.php',
                    type: 'POST',
                    data: 'barcode=' + barcode,
                    dataType: 'text',
                }).done(function(backup){
                    $('#output').html('<img src="generate/' + barcode + '.png" width="400px" title="Clic droit pour enregistrer l\'image"></img>');
                    console.log(backup);
                });
            }
            else{
                $('#output').text('Code faux…');
                $('#output').css({'display': 'flex', 'color': 'red'});
            }
        }

        else{
             $('#output').css({'display': 'none'});
        }
    });
});


