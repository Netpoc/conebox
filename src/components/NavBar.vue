<template>
  <v-app-bar app class="rounded-xl">      
      <v-sheet
        class="ma-4 rounded-lg d-flex align-center justify-center"
        height="50"
        width="50"
        color="grey"
      >
        logo
      </v-sheet>
      <a-form-item
              class="mt-5"
                name="username"
                rules="[ { required: true, message: 'Please input your username!' } ]"
              >
                <a-input v-model:value="username" placeholder="Search">
                  <template #prefix>
                    <UserOutlined />
                  </template>
            </a-input>
      </a-form-item>
      <v-spacer></v-spacer>
      
      <v-sheet class="ma-3 rounded-xl d-flex align-center justify-lg-space-evenly" width="200" color="grey">
        <v-btn icon>
        <v-icon>mdi-bell</v-icon>
        </v-btn>
        <small>notifications</small>
        <v-sheet class="rounded-xl d-flex align-center justify-center" height="30" width="30" color="red"><small>23</small></v-sheet>
      </v-sheet>
      
      <v-avatar>
      <v-img
        alt="John"
        src="https://cdn.vuetifyjs.com/images/john.jpg"
      ></v-img>
      </v-avatar>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
  </v-app-bar>
</template>