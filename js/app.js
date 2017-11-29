



var calculadora = {
  // initialization function //
  init: function(){
    var self = this;
    self.num_1 = 0;
    self.num_2 = 0;
    self.numbersOnScreen = [0];
    self.sign = true;
    var lasTeclas = document.getElementsByClassName("tecla");
    for (var i = 0; i < lasTeclas.length; i++) {
      var tecla = lasTeclas[i]
      tecla.onmousedown = self.mouseDown()
      tecla.onmouseup  = self.mouseUp
    }
  },
  displayObject: document.getElementById('display'),
  checkSign: function(array){
    // revisa signo
    var self = this;
    for(var i = 0; i < array.length; i++){
      if( array[i] == '-' ){
        self.sign = false
        // console.log('si es negativo', self.numbersOnScreen);
        return;
      }
    }
  },
  checkInputs: function (digit){
    var self = this
    var number = parseInt(digit)
    var display = self.displayObject

    // check inputs conditions
    if( self.numbersOnScreen.length == 1 && self.numbersOnScreen[0] === 0 ){
      if ( number === 0 ){
        return;
      }
      self.numbersOnScreen[0] = number
      display.innerHTML = self.numbersOnScreen.join('')
      return;
    }
    if( self.numbersOnScreen.length < 8 ){
      self.numbersOnScreen.push(number)
      display.innerHTML = self.numbersOnScreen.join('')
    }
  },
  on_c: function(){
    var self = this
    self.numbersOnScreen = [0]
    self.displayObject.innerHTML = self.numbersOnScreen.join('')
    self.resultAccumulator = 0;
    self.sign = true
  },
  punto: function(){
    var self = this
    var display = self.displayObject
    for (var i = 0; i < self.numbersOnScreen.length; i++) {
      if( self.numbersOnScreen[i] == '.' ){
        return;
      }
    }
    self.numbersOnScreen.push('.')
    display.innerHTML = self.numbersOnScreen.join('')
  },
  sign_func: function(){
    var self = this
    var display = self.displayObject
    if ( self.numbersOnScreen.length == 1 && self.numbersOnScreen[0] === 0 ){
      return;
    }
    if ( this.sign == true ){
      self.numbersOnScreen.unshift('-')
      display.innerHTML = self.numbersOnScreen.join('')
      self.numbersOnScreen = display.innerHTML.split('')
      self.resultAccumulator = Number(display.innerHTML)
      this.sign = false
    }else{
      self.numbersOnScreen.shift()
      display.innerHTML = self.numbersOnScreen.join('')
      self.numbersOnScreen = display.innerHTML.split('')
      self.resultAccumulator = Number(display.innerHTML)
      this.sign = true
    }
  },
  sumar: function(num1 , num2){
    var n1  = parseFloat(num1)
    var n2 = parseFloat(num2)
    return n1 + n2;
  },
  restar: function(num1 , num2){
    var n1 = parseFloat(num1)
    var n2 = parseFloat(num2)
    return n1 - n2;
  },
  multiplicar: function(num1 , num2){
    var n1 = parseFloat(num1)
    var n2 = parseFloat(num2)
    return n1 * n2;
  },
  dividir: function(num1 , num2){
    var n1 = parseFloat(num1)
    var n2 = parseFloat(num2)
    if( n2 === 0){
      return console.error("No se divide por 0");
    }
    return n1 / n2
  },
  currentOperation:function(num1 , num2){
    return;
  },
  resultAccumulator : 0,
  mouseDown: function(){
  var self = this
  var display = self.displayObject

  return function (event){
    var elem = event.target
    var id = event.target.id
    elem.style = "transform: scale(0.9); -webkit-transform: scale(0.9)"

    // check inputs switch
    if(isNaN(id)){
      switch (id) {
        case "on":
          self.on_c()
          break;
        case "sign":
          self.sign_func()
          break;
        case "dividido":
          self.currentOperation = self.dividir
          if( self.resultAccumulator != 0 ){
            self.num_1 = self.resultAccumulator
          }else{
            self.num_1 = self.numbersOnScreen.join('')
          }
          self.numbersOnScreen = [0]
          self.sign = true
          break;
        case "por":
          self.currentOperation = self.multiplicar
          if( self.resultAccumulator != 0 ){
            self.num_1 = self.resultAccumulator
          }else{
            self.num_1 = self.numbersOnScreen.join('')
          }
          self.numbersOnScreen = [0]
          self.sign = true
          break;
        case "menos":
          self.currentOperation = self.restar
          if( self.resultAccumulator != 0 ){
            self.num_1 = self.resultAccumulator
          }else{
            self.num_1 = self.numbersOnScreen.join('')
          }
          self.numbersOnScreen = [0]
          self.sign = true
          break;
        case "mas":
          self.currentOperation = self.sumar
          if( self.resultAccumulator != 0 ){
             self.num_1 = self.resultAccumulator
          }else{
            self.num_1 = self.numbersOnScreen.join('')
            self.resultAccumulator = self.num_1
          }
          self.numbersOnScreen = [0]
          self.sign = true
          break;
        case "igual":
          self.num_2 = self.numbersOnScreen.join('')
          var resultado = self.currentOperation(self.num_1 , self.num_2)
          var toArray = resultado.toString().split('')
          self.resultAccumulator = resultado
          if( toArray.length > 7 ){
            for(var i = toArray.length; i > 7; i--){
              toArray.pop()
            }
          }
          display.innerHTML = toArray.join('')
          self.numbersOnScreen = toArray
          self.checkSign(toArray)
          break;
        case "punto":
          self.punto()
          break;
        default:
            break;
        }
    }else{
      self.checkInputs(id)
      }
    }
  },
  mouseUp: function (event){
    var elem = event.target
    elem.style = "transform: scale(1); -webkit-transform: scale(1)"
    },
  }

calculadora.init()
