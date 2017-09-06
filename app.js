$("document").ready(function(){
  //limpia el input en caso tal se haya utilizado
  $(".input").val("")

  let value
  let randomValue
  let cows
  let bulls

  //genera el número aleatorio
  function randomNumber(){
    randomValue = [];
    for (i = 0; i < 4; i++){
     	randomValue[i] = Math.floor(Math.random()*(9 + 1))
      //evita que se repita un número
      for(ii = 0; ii < i; ii++){
  		  if(randomValue[i] == randomValue[ii]) {i -= 1; break}
    	}
    }
    return randomValue.join("")
  }

  //función para que value sea un array de números
  function changeToArrayInteger(item){
    return item.toString().split("").map(function(t){
      return parseInt(t)
    })
  }

  function hasBullsorCows(value, randomValue, bullCow){
    valueNew = changeToArrayInteger(value)
    result = 0
    for(i=0; i< randomValue.length; i++){
      if (bullCow === "bull" && valueNew[i] === randomValue[i]) {
        result += 1
      }
      if(bullCow === "cow" && valueNew.includes(randomValue[i])) {
        result +=1
      }
    }
    return result
  }

  //se genera número aleatorio
  randomNumber()
  console.log(randomValue.join(""))

  //genera la acción cuando se oprime enter
  $(".input").keypress(function(e){
    $(".input").removeClass("has-error")
    $(".errors").html("");
    if (e.which == 13) {
      e.preventDefault()
      if(e.target.value === "") {
        $(".input").addClass("has-error")
        $(".errors").append('Escribe un número de cuatro dígitos no repetidos');
        return false;
      }
      if($(".input").val().indexOf(' ') >= 0){
        $(".input").addClass("has-error")
        $(".errors").append('No puede contener espacios');
        return false;
      }
      if($(".input").val().length < 4){
        $(".input").addClass("has-error")
        $(".errors").append('El número debe tener 4 dígitos');
        return false;
      }
      if($(".input").val().length > 4){
        $(".input").addClass("has-error")
        $(".errors").append('El número solo debe tener 4 dígitos');
        return false;
      }
      else{
      //captura el valor del número ingresado
      value = $(".input").val()

      //ejecuta las funciones
      let oldBull = hasBullsorCows(value, randomValue, "bull")
      let oldCow = hasBullsorCows(value, randomValue, "cow")
      //Handlebar
      let source   = $("#body-result").html();
      const template = Handlebars.compile(source);
      let context = {number: value, valorBulls: oldBull, valorCows: oldCow};
      const html    = template(context);

      $("tbody").append(html);

      //test
      console.log(oldBull)
      console.log(oldCow)
      console.log(value)
      console.log(randomValue.join(""))
      //condicional para cuando gana
      if(oldBull === 4 && oldCow === 4) {
        $(".modal").modal("show");
      }
      //limpia el input
      $(".input").val("")
    }
  }

  });
});