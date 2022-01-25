<template>
  <div id="app">
    {{end}}
    <h3> Chico Rei</h3>
    <div class = "divider">
      <div class = "order">
        <h3> Finalização do pedido</h3>
        <div>
          <h1>Informações de contato</h1>
          <div class = "information">
            <p class = "margin">
            <label>E-mail</label>
            </p>
            <input class = "one" placeholder="exemplo@chicorei.br" v-model="email">
            <p class = "margin">
            <label>Telefone</label>
            </p>
            <input class = "one" placeholder="somente números" v-model="phone">
          </div>
        </div>
        <div> 
          <h1>Informações de entrega</h1>
          <div class = "information">
            <div class = "twoColuns">
              <div class = "one">
                <p class = "margin">
                <label>CEP</label>
                </p>
                <input class = "cep" v-model="CEP" placeholder="00000000">
              </div>
              <div>
                <br>
                <button @click="api(CEP)"><img class = "imgGlass" src = "https://e7.pngegg.com/pngimages/906/420/png-clipart-computer-icons-web-search-engine-google-search-loupe-violet-technic.png"></button>
                {{load}}
              </div>
            </div>
            <p class = "margin">
            <label>Rua</label>
            </p>
            <input class = "one" v-model="Street" :disabled="getReadOnly(Street)">
            <div class = "twoColuns">
                <div>
                  <p class = "margin">
                  <label>Número</label>
                  </p>
                  <input v-mode="HouseNumber">
                </div>
                <div>
                  <p class = "margin">
                    <label>Bairro</label>
                    </p>
                    <input v-model="Neighborhood" :disabled="getReadOnly(Neighborhood)">
              </div>
            </div>
            <div class = "twoColuns">
              <div>
                <p class = "margin">
                <label>Cidade</label>
                </p>
                <input v-model="City" :disabled="getReadOnly(City)">
              </div>
              <div>
                <p class = "margin">
                  <label>Estado</label>
                  </p>
                  <input v-model="State" :disabled="getReadOnly(State)">
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1>Informações de pagamento</h1>
          <div class = "information">
            <p class = "margin">
            <label>Número do cartão</label>
            </p>
            <input class = "one" v-model="cardNumber">
            <p class = "margin">
            <label>Titular do cartão</label>
            </p>
            <input class = "one" v-model="cardName">
            <div class = "twoColuns">
              <div>
                <p class = "margin">
                <label>Data de vencimento</label>
                </p>
                <input type = "date" v-model="cardDate">
              </div>
              <div>
                <p class = "margin">
                  <label>CVC</label>
                  </p>
                  <input v-model="cardCvc">
              </div>
            </div>
          </div>
        </div>
        <div class = "endButton">
          <button @click="CheckOut()" class = "endOrder">Finalizar pedido</button>
        </div>
      </div>
      <div class = "finallyOrder">
        <h3 class = "yourOrder">Sua sacola</h3>
          <div class = "Product">
            <div class = "Data"> 
              <img class = "imgProduct" src = "https://chicorei.imgix.net/18314/6ff7a7f1-2061-11eb-bf2d-fd280a5a0139.jpg?auto=compress,format&q=65&w=425&h=600&fit=crop&crop=top">
            </div>
            <div class = "Data">
              <div>
                  <h3 class = "productTitle">Camiseta Mapa Brasilidade</h3>
                  <h3 class = "price">R$19,90</h3>
              </div>
            <div class = "quantityOrder">
                <div class = "quatity">
                  <button class = "operation" @click="less()">-</button>
                  <input class = "quant" nome = "quantidade" v-model="valueP">
                  <button class = "operation" @click="plus()">+</button>
                </div>
            </div>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>  
  export default{
    data(){
      return {
        valueP: 0,
        City: "",
        State: "",
        Neighborhood: "",
        Street: "",
        CEP: "",
        HouseNumber: "",
        read: false,
        email: "",
        phone: "",
        cardNumber: "",
        cardName: "",
        cardDate: "",
        cardCvc: "",
        end: "",
        load: ""
      }
    },
    methods : {
      api(cep) {
        this.load = " ... "
        var cepPromise = require("cep-promise")
        cepPromise(cep).then(result => {
          this.City = result.city
          this.State = result.state
          this.Neighborhood = result.neighborhood
          this.Street = result.street
        })
        this.load = ""
      },
      getReadOnly(variable){
        if(variable === this.Street){
          if(this.Street !== "") return true
          else return false
        }else if(variable === this.State){
          if(this.State !== "") return true
          else return false
        }else if(variable === this.Neighborhood){
          if(this.Neighborhood !== "") return true
          else return false
        }else if(variable === this.City){
          if(this.City !== "") return true
          else return false
        }else return false;
      },
      plus(){
        this.valueP++
      },
      less(){
        if(this.valueP > 0) this.valueP--
      },
      CheckOut(){
        let errors = []
        let finalOrder = {}
        finalOrder.pedido = 'Camiseta Mapa Brasilidade'
        finalOrder.price = 'R$19,90'
        finalOrder.totalPrice = 'R$' + this.valueP * 19.90
        if(this.email){
          let field = this.email
          let user = field.substring(0, field.indexOf("@"));
          let domain = field.substring(field.indexOf("@")+ 1, field.length);

          if ((user.length >=1) && (domain.length >=3) &&
              (user.search("@")==-1) && (domain.search("@")==-1) &&
              (user.search(" ")==-1) && (domain.search(" ")==-1) && (domain.search(".")!=-1) &&
              (domain.indexOf(".") >=1) && (domain.lastIndexOf(".") < domain.length - 1)) {
          finalOrder.email = this.email;
          }
          else{
            errors.push("E-mail invalido");
          }
        }
        else  errors.push("E-mail obrigatório")
        if(this.phone){
            let regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
            if(regex.test(this.phone)){
              finalOrder.phone = this.phone;
            }else errors.push("Telefone invalido");
        }
        else  errors.push("Telefone obrigatório")
        if(this.cardName){
          let confer = !!this.cardName.match(/[A-Z][a-z]* [A-Z][a-z]*/);
          if(confer){
            finalOrder.cardName = this.cardName;
          }
          else{
            errors.push("Titular do cartão inválido");
          }
        }
        else  errors.push("Titular do cartão obrigatório")
        if(this.cardNumber){
          let num = this.cardNumber;
          if(num.length !== 16 || num[0]==0){
            errors.push("Número de cartão inválido");
          } else {
            var arr = Array();
            for(let i=0;i<num.length;i++){
              if(i%2==0){
                let dig = num[i] * 2;
                let dig1;
                let dig2;
                  
                if(dig > 9){
                  dig1 = dig.toString().substr(0,1);
                  dig2 = dig.toString().substr(1,1);
                  arr[i] = parseInt(dig1)+parseInt(dig2);
                } else {
                  arr[i] = parseInt(dig);
                }
              } else {
                arr[i] =parseInt(num[i]);
              } 
            }
            if(parseInt(num[0]) === 0){
              errors.push("Número de cartão inválido");
            }else finalOrder.cardName = this.cardNumber;
          }
        }
        else  errors.push("Número do cartão obrigatório")
        if(this.cardCvc){
          if(this.cardCvc.length !== 3) errors.push("CVC do cartão inválido");
          else finalOrder.cardCvc = this.cardCvc;
        }
        else  errors.push("CVC obrigatório")
        if(this.cardDate){
          let today = new Date(); 
          let date = new Date(this.cardDate); 
          if (today.getTime() > date.getTime()) 
            errors.push("Cartão com data vencida");
          else 
            finalOrder.cardCvc = this.cardDate;
        }
        else  errors.push("Data de vencimento obrigatório")
        if(!this.City) errors.push("Cidade obrigatório")
        if(!this.State) errors.push("Estado obrigatório")
        if(!this.Neighborhood) errors.push("Bairro obrigatório")
        if(!this.Street) errors.push("Rua obrigatório")
        if(!this.CEP) errors.push("CEP obrigatório")
        if(errors.length > 0)
          this.end = errors
        else{
          this.end = 'Sucesso na compra'
          console.log(finalOrder);
        }  
      }
    }
  }
</script>

<style>
  .operation {
    background: gray;
  }
  .quant {
    margin: 5%;
    width: 30%;
  }
  .divider{
    display: flex
  }
  h3 {
    font-family: calibri;
    text-align : center;
    font-size: 20px;
    color:black;  
  }
  .yourOrder{
    text-align : left;
    font-size: 22px;
    margin: 3%
  }
  h1 {
    font-family: calibri;
    text-align : left;
    font-size:15px;
    color:gray;
    margin: 1% 1% 1% 30%
  }
  .order{
    display: table-column;
    font-family: calibri;
    width: 70%;
    font-size: 18px;
    color:gray;
    background: white;
  }
  .information{
    margin: 1% 1% 1% 30%;
  }
  .margin{
    margin-block-end: 1px;
    font-family: calibri;
    font-size: 12px;
  }
  .twoColuns{
    font-family: calibri;
    display: flex;
  }
  .finallyOrder{
    display: table-column;
    width: 40%;
    background: lightgrey;
    margin: 0% 15% 25% 20%;
  }
  .Data {
      text-align: end;
  }
  .productTitle {
      font-size: 14px;
      text-align: left;
      margin: 0%;
  }
  .imgProduct {
      display: block;
      margin-left: 0px;
      margin-right: 0px;
      width: 80%
  }
  .price {
      margin: 0%;
      text-align: end;
      margin-top: 30%;
      color: dimgrey;
  }
  .Product {
      display: flex;
      width: 260px;
      margin: 0%;
      text-align: right;
      background-color: lightgrey;
      padding: 5%;
      flex-direction: row;
      color: grey31;
      font-family: calibri;
  }
  .quatity{
    display: inline-block
  }
  .imgGlass{
    display: block;
    margin: 2px;
    width: 18px;
  }
  .one {
    width: 90%;
  }
  .cep {
    width: 90%;
  }
  .endButton {
    margin: 0% 0% 0% 80%;
  }
  .endOrder {
    background: black;
    font-family: calibri;
    padding: 2%;
    color: white;
  }
</style>