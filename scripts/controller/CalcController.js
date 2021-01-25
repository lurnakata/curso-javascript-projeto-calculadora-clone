class CalcController {
  //metodo construtor é o que é chamado automaticamente quando a classe é instanciada
  constructor() {
    //_ significa Privado, precisa de metodos get e set para pegar e colocar informação
    this._operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
  }

  initialize() {
    this.setDisplayDateTime();
    setInterval(() => {
      //seta o intervalo, quero que set isso durante tanto tempo != do timeout que realiza a função 1x só
      this.setDisplayDateTime();
    }, 1000); //a cada 1s ele faz o que está na função acima
  }
  //para parar o setInterval usa a função clearInterval(interval)

  //metodo que adicionar os eventos
  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  clearAll() {
    this._operation = [];
  }

  clearEntry() {
    this._operation.pop();
  }

  setError() {
    this.displayCalc = "Error";
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this._operation[this._operation.length - 1] = value;
      } else {
        console.log(value);
      }
    } else {
      this.getLastOperation().toString() + value.toString();
      this._operation.push(value);
    }
    console.log(this._operation);
  }

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "soma":
        break;
      case "subtracao":
        break;
      case "divisao":
        break;
      case "multiplicacao":
        break;
      case "porcento":
        break;
      case "igual":
        break;
      case "ponto":
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;

      default:
        this.setError();
        break;
    }
  }

  initButtonsEvents() {
    //querySelectorAll pega todas as tags, não só a primeira ocorrência
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        //baseVal usa quanod é SVGA traz o nome da classe
        //replace vai tirar o btn e fica só o número
        let textBtn = console.log(btn.className.baseVal.replace("btn-", ""));

        this.execBtn(textBtn);
      });
      //muda o cursor pra maozinha quando tiver o mouse sobre
      this.addEventListenerAll(btn, "mouseover mouseup mousedown", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      //personalizando a data:
      day: "2-digit",
      month: "long", //long nome do mês inteiro, short abreviado
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  //metodo GET pega a informação que está salva
  get displayTime() {
    return this._timeEl.innerHTML;
  }
  //metodo SET seta a informação (salva)
  set displayTime(value) {
    return (this._timeEl.innerHTML = value);
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }
  set displayDate(value) {
    return (this._dateEl.innerHTML = value);
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }
  set currentDate(value) {
    this.currentDate = value;
  }
}
