$(document).ready(function(){
  //Menú lateral
  $("#open-hide").click(function() {
    $("#menu").toggleClass("show");
    $("#content").toggleClass("open-menu");
  });

for(var i = 0; i < localStorage.length; i++){
    var kei = localStorage.key(i);
    var valuee = localStorage.getItem(kei);
    if(kei.startsWith("bip")){
      $("#elegir").append("<option value='" + valuee + "'>" + valuee + "</option>");
    }   
}


$("#elegir").on("change", function(){
	$("#input-ver").prop('disabled', true);
	$("#input-ver").val("");
});
$("#boton-ver").on("click", function(e){
	var tarjInput = $("#input-ver").val();
	var tarjSelect = $("#elegir").val();
	var valor = "";

	if(tarjInput != "" || tarjSelect != null){
		if(tarjInput == ""){
			valor = $("#elegir").val();
		}else{
			valor = $("#input-ver").val();
		}

		$.ajax({
			url : 'https://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
			type : 'GET',
			datatype : 'json',
			data : {'bip': valor}
		})
		.done(function(respuesta){
			console.log("successe");
			console.log(respuesta);
			verSaldo(respuesta);
		})
		.fail(function(){
			console.log("error");
			malSaldo();
		})

	}else{
		alert("Seleccione una tarjeta");
	}


	function verSaldo(bip){
		var saldo = bip.saldoTarjeta;

		$(".tu-saldo").empty();
		
		var texto = ("<h3>SALDO TOTAL</h3><div class='saldo'><p id='saldo-final'>"+ saldo+"</p></div>")

		$(".tu-saldo").append(texto);
		
	}
	function malSaldo(){
		$(".tu-saldo").empty();
		$(".tu-saldo").append("<h3>SALDO TOTAL</h3><div class='saldo'><p id='saldo-final'>Tarjeta No válida</p></div>")
	
	}

})
  


  


});