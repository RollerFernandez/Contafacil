<template>
  <div id="app">
    <h4 class="bg-primary text-white text-center p-3">
       Depositos Ahorro Hogar
    </h4>

    <section class="h-100 gradient-form">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-12">
            <div class="card rounded-3 text-black">
              <div class="row g-0">
                <div class="col-lg-5">
                  <div class="card-body  mx-md-5">

                    <div class="text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style="width: 185px;" alt="logo">
                      <h4 class="mt-1 mb-5 pb-1">Reporte Mensual Depositos</h4>
                    </div>

                      <div class="form-outline input-group-md mb-2">
                        <label class="form-label" >Familia</label>
                        <select class="form-control" v-model="model.cbFamily" >
                            <option value="">Seleccione Familia</option>
                            <option v-for="f in families" v-bind:key="f.id" v-bind:value="f.id">{{f.name}}</option>
                        </select>                    
                      </div>

                      <div class="form-outline input-group-md mb-2">
                        <label class="form-label" >Métrica</label>
                        <select class="form-control"  v-model="model.cbMetrica" >
                            <option value="">Seleccione Metrica</option>
                            <option v-for="m in metricas" v-bind:key="m.id" v-bind:value="{id:m.id,text:m.type}">{{m.type}}</option>
                        </select> 
                      </div>

                      <div class="form-outline input-group-md mb-2">
                        <label class="form-label" >Año</label>
                        <input type="text"  v-model="model.txtYear" class="form-control" />
                      </div>

                      <div class="text-center pt-1">
                        <button class="btn btn-primary btn-block fa-lg gradient-custom-2" @click="consulta" type="button">Buscar</button>
                      </div>
                  </div>
               
                </div>
                <div class="col-lg-5 mt-5"  v-if="resumen.length">
                  <div class="card-body  mx-md-5" >
                    <div >
                        <h4 class="mb-4 text-center">Resumen de depositos</h4>
                    
                      <table class="table" >
                          <thead class="thead-dark">
                            <tr>
                              <th scope="col">Mes</th>
                              <th scope="col">{{type}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="r in resumen" v-bind:key="r.mes" v-bind:value="r.mes">
                              <td>{{r.mes}}</td>
                              <td><span class="badge badge-primary badge-pill">{{r.min!=null ? r.min  :r.max!=null ? r.max: r.avg!=null ? r.avg:r.total!=null ? r.total:'0' }}</span></td>
                            </tr>
                          </tbody>
                      </table>
                    </div>
                      
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="card-body">
                    <h4 class="mb-4 text-center">Cuadro Depositos</h4>
                      <div>
                        <apexchart  type="bar" :options="options" :series.sync="series"></apexchart>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      model:{
        cbFamily:'',
        cbMetrica:'',
        txtYear:''
      },
      type:'',
      families: [],
      resumen:  [],
      metricas:[
        {id:'min',type:'Min'},
        {id:'max',type:'Max'},
        {id:'avg',type:'Promedio'},
        {id:'total',type:'Total'},
      ],
      options: {
        chart: {
          id: 'resumen-chart'
        },
        xaxis: {
          categories:["Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octibre","Noviembre","Diciembre"]
        }
      },
      series: [
        {
        name: 'Depositos',
        data: []
       }
      ]
    }
  },
  methods: {

  consulta:  async function () {


        var mensajeValidation = this.validations(this.model);

        if (mensajeValidation.length>0) {

          const listMessages = mensajeValidation.map((men) =>{
            return "<li style='color:red;'><i style='padding-right:15px;' class='glyphicon glyphicon-plus' aria-hidden='true'></i>"+men+"</li>"
          });

          const messages_errs="<ul class='list-group' style='color:black;'>"+listMessages+"</ul>";
      
              this.$swal.fire({
                icon: 'error',
                title: 'Ingrese los datos requeridos',
                html: messages_errs
              });
              
          }else{
              this.$swal('Procesando busqueda');

              this.$swal.showLoading();
          
              this.type=this.model.cbMetrica.text;
          
              const response = await    axios.get(`${this.$developer}family_summary_resumen`, { params: { family: this.model.cbFamily ,year:this.model.txtYear,datapoint:this.model.cbMetrica.id} })
                  
              this.resumen = response.data;

              if (response) {
                  this.updateChart();
                  this.$swal.close();
                  this.$swal.fire(
                    'Se encontaron '+response.data.length+' registros',
                    '',
                    'success'
                  )         
              }else{
                this.$swal.close();
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrio un error al procesar',
                    footer: '<a href="#">Contactese con el administrador del sistema</a>'
                  });
              }
          }
    },
    updateChart() {
        
        const newData = this.resumen.map((x) => {
          return x.min!=null ? x.min:x.max!=null ? x.max :x.avg!=null ? x.avg:x.total!=null ? x.total:0
        });

        this.options = {
          colors: 
          [function({ value}) {
              if (value > 0) {
                  return '#FEB019'
              } else {
                  return '#FF4560'
              }
            }
          ],
          xaxis:{
            categories:this.resumen.map((c)=>{
              return c.mes
            })
          }

        };
        
        this.series = [{
          data: newData
        }]
      },
      validations:function(model){
        let messages=[];
        console.log('entro validacion');
        if (model.cbFamily === '') messages.push('Seleccione Familia');
        if (model.cbMetrica === '') messages.push('Seleccione Familia');
        if (model.txtYear === '') messages.push('Ingrese Año de consulta');
        return messages;
    }
  },
  mounted(){
      axios.get(`${this.$developer}families`)
      .then(response => (this.families = response.data))
      .catch(error => console.log(error))
      .finally(() => console.log('finalizado'))
  },
  computed:{
  }

};
</script>

