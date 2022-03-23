<template>
    <div>
    <v-container fluid>
        <v-row justify="space-between">
            <v-col>
                Dashboard
            </v-col>
        </v-row>

        <v-row>

            <v-col md="6" sm="12">
                <bar-box :title='chart[0].title' :data="chart[0].data" />
            </v-col>
            <v-col md="6" sm="12">
                <line-box :title='chart[1].title' :data="chart[1].data" />
            </v-col>
        </v-row>

        <v-row>
            <v-col md="6" sm="12">
                <doughnut-box :title="chart[2].title" :data="chart[2].data" />
            </v-col>
            <v-col md="6" sm="12">
                <line-box :title='chart[3].title' :data="chart[3].data" />
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
import { orderApi } from '@/api/order'
import BarBox from '@/components/chart/box/BarBox'
import DoughnutBox from '@/components/chart/box/DoughnutBox'
import LineBox from '@/components/chart/box/LineBox'
import { productApi } from '@/api/product';

export default {
  name: 'Dashboard',
  components: { 
    DoughnutBox,
    BarBox,
    LineBox
  },
  data() {
    return {
        chart: [
            {title: 'Tốc độ tăng trưởng doanh thu', data: []},
            {title: 'Tốc độ tăng trưởng đơn hàng', data: []},
            {title: 'Sản phẩm tồn kho', data: []},
            {title: 'Tốc độ tăng trưởng khách hàng', data: []},
        ],

    }
  },
  computed: {
      listClient(){
          return this.$store.state.allClient;
      }
  },
  watch: {

  },
  created() {
    
    this.getOrder();
    this.getProduct();
    this.customReportForClient();
  },
  mounted() {

  },
  methods: {
    async getOrder(){
        let res = await orderApi.getOrders();
        let chart1 = {}
        let chart2 = {}
        res.listObject.map(order=>{

            if(chart1[order.date] != undefined){
                chart1[order.date] = Number(chart1[order.date]) + Number(order.total)
                chart2[order.date] += 1
            }  
            else {
                chart1[order.date] = order.total
                chart2[order.date] = 1
            }
        })
        for(let key in chart1){
            this.chart[0].data.push(
                {name: key, cnt: chart1[key]}
            )            
        }
        for(let key in chart2){
            this.chart[1].data.push(
                {name: key, cnt: chart2[key]}
            )            
        }
    },
    async getProduct(){
        let res = await productApi.getProducts();
        res.response.map(product=>{
            this.chart[2].data.push(
                {name: product.name, cnt: product.quantity}
            ) 
        })

    },
    customReportForClient(){
        let chart4 = {}
        this.listClient.map(client=>{

            if(chart4[client.created_at] != undefined){
                client.created_at = client.created_at.slice(0, 10)
                chart4[client.created_at] += 1
            }  
            else {
                client.created_at = client.created_at.slice(0, 10)
                chart4[client.created_at] = 1
            }
        })
        for(let key in chart4){
            this.chart[3].data.push(
                {name: key, cnt: chart4[key]}
            )            
        }

    },
  }
}
</script>

<style>

</style>