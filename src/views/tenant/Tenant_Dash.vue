<template>
  <Nav />
  <v-main>
    <h1 class="ma-5">Tenant Dashboard</h1>
    <v-row
      class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5"
      no-gutters
    >
    <v-col md="2">
        <NavList />
    </v-col>
    <v-col
        class="flex-grow-1 flex-shrink-0"
        md="6"
        style="min-width: 100px; max-width: 100%"
      >
        <v-sheet class="ma-2 bg-grey-lighten-4 d-flex rounded-lg justify-space-around">
          <v-sheet            
            class="rounded-xl ma-3 d-flex align-center"
          >
            <v-sheet
              class="ma-3 rounded-lg d-flex justify-center align-center"
              height="45"
              width="45"
              color="grey"
            >
              <v-icon>mdi-account-star</v-icon>
            </v-sheet>
            <div class="d-flex flex-column">
              <span>2390</span>
              <p class="text-caption">Active users +2.45%</p>
            </div>
          </v-sheet>

          <v-sheet            
            class="rounded-xl pa-3 ma-3 d-flex align-center"
          >
            <v-sheet
              class="ma-3 rounded-lg d-flex justify-center align-center"
              height="45"
              width="45"
              color="grey"
            >
              <v-icon>mdi-cpu-64-bit</v-icon>
            </v-sheet>
            <div class="d-flex flex-column">
              <large>2390</large>
              <p class="text-caption">Active users +2.45%</p>
            </div>
          </v-sheet>

          <v-sheet
            
            class="rounded-xl pa-3 ma-3 d-flex align-center"
          >
            <v-sheet
              class="ma-3 rounded-lg d-flex justify-center align-center"
              height="45"
              width="45"
              color="grey"
            >
              <v-icon>mdi-clock-outline</v-icon>
            </v-sheet>
            <div class="d-flex flex-column">
              <large>2390</large>
              <p class="text-caption">Active users +2.45%</p>
            </div>
          </v-sheet>
        </v-sheet>

        <v-sheet height="240" class="ma-5 rounded-xl"> 
          <Bar :style="myStyles"/>
        </v-sheet>
        <v-sheet height="180" class="ma-2">
          <v-tabs
            v-model="tab"
            :items="tabs"
            align-tabs="center"
            color="white"
            height="60"
            slider-color="#f78166"
          >
            <template v-slot:tab="{ item }">
              <v-tab
                :prepend-icon="item.icon"
                :text="item.text"
                :value="item.value"
                class="text-none"
              ></v-tab>
            </template>

            <template v-slot:item="{ item }">
              <v-tabs-window-item :value="item.value" class="pa-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, ratione debitis quis est labore voluptatibus! Eaque
                cupiditate minima, at placeat totam, magni doloremque veniam
                neque porro libero rerum unde voluptatem!
              </v-tabs-window-item>
            </template>
          </v-tabs>
        </v-sheet>
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0"
        md="4"
        style="min-width: 100px; max-width: 100%">
        <v-sheet class="pa-5 ma-5 rounded-xl">
            <div class="d-flex justify-space-between align-center">
                <h2>Billings</h2>
                <v-btn variant="text" size="small" class="rounded-xl">More</v-btn>
            </div>
            Company:             
                <a-input class="mt-3" v-model:value="tenant" placeholder="Enter Company">
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
                <a-space class="mt-3" direction="vertical" :size="12">
                <a-range-picker v-model:value="value1" />
                </a-space>
                <a-form-item>
                <a-button
                  block
                  html-type="submit"                  
                  class="button mt-3"
                >
                  Generate Billing
                </a-button>
              </a-form-item>
        </v-sheet>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-1" md="4" style="min-width: 100px">

      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import Nav from "../../components/NavBar";
import NavList from "../../components/TenantDrawer"


export default {
  components: {
    Nav,
    NavList,
    Bar
    
  },
  data() {
    return {
        
    };
  },
  computed: {
    myStyles () {
      return {
        height: 200,
        position: 'relative'
      }
    }
  }
};
</script>
<style scoped>
    .button {
        background-color: #ffc107;
    }
</style>
