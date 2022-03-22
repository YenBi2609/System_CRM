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
            <v-col md="4" sm="6" xs="12">
                <doughnut-box :title="chart[1].title" :data="chart[1].data" />
            </v-col>
            <v-col md="4" sm="6" xs="12">
                <line-box :title='chart[1].title' :data="chart[1].data" />
            </v-col>
            <v-col md="4" sm="6" xs="12">

            </v-col>
            <v-col md="4" sm="6" xs="12">

            </v-col>
            <v-col md="4" sm="6" xs="12">

            </v-col>
            <v-col md="4" sm="6" xs="12">

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
            {title: '3', data: []},
            {title: '4', data: []},
        ],

    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    
    this.getOrder();
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
  }
}
</script>

<style>

</style>