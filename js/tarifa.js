$(document).ready(function(){
  $("#opciones").click(function() {
    $("#menu-items").toggleClass("show");
    $("#elemento").toggleClass("open-menu");
  });

	$("#select").on("change", function(){
		$("#input-tarjeta").prop('disabled', true);
		$("#input-tarjeta").val("");
	});

	$("#btn-saldo").on("click", function boton(seleccion){
		alert("hola");
		var selectOption = $("#select").val();
		var inputTarjeta = $("#input-tarjeta").val();
		var tarifa = parseInt($("#tarifa-horario").val());
		var calc = "";

		if((inputTarjeta != "" || selectOption != null) && tarifa != null){
			if(inputTarjeta == ""){
				calc = $("#select").val();
			}else{
				calc = $("#input-tarjeta").val();
			}
	

		$.ajax({
			url : 'https://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
			type : 'GET',
			datatype : 'json',
			data : {'bip': calc}
		})
		.done(function(answer){
			console.log("successe");
			console.log(answer);
			saldo(answer);
		})
		.fail(function(){
			console.log("error");
			erroR();
		})

		}else{
			alert("Debe seleccionar una opción");
		}

		function saldo(tarj){
			var saldo = tarj.saldoTarjeta;
			var otroSaldo = saldo.split('$')[1];
			var elSaldo = otroSaldo - tarifa;

			$(".tarifa-final").empty();


			costo = ("<h3>COSTO PASAJE</h3><div class='costo'><p id='saldo-final'>"+tarifa+"</p></div>");
			saldoFinal = ("<h3>SALDO FINAL</h3><div class='costo'><p id='saldo-final'>"+saldoFinal+"</p></div>");

			$(".tarifa-final").append(costo);
			$(".tarifa-final").append(saldoFinal);	
		}

		function erroR(){
			$(".tarifa-final").empty();
			$(".tarifa-final").append("<h3>SALDO TOTAL</h3><div class='costo'><p id='saldo-final'>Número de tarjeta inválida</p></div>")	
		}

	});
  
});