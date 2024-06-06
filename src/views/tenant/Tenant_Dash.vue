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
            class="rounded-xl pa-3 ma-3 d-flex align-center"
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

        <v-sheet height="240" class="ma-2"> </v-sheet>
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

      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import Nav from "../../components/NavBar";
import NavList from "../../components/TenantDrawer"
export default {
  components: {
    Nav,
    NavList,
  },
  data() {
    return {};
  },
};
</script>
