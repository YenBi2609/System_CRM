<template>
<div id="#app">
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app     
      hide-overlay
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group

            :key="item.label"
            ref="listGroup"
            v-model="item.model"
            :prepend-icon="prependIcon(item)"
            :append-icon="appendIcon(item)"
            @click="listItemClick(item)"
          >
            <template #activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.label }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <template v-for="(child, i) in item.children">
              <v-list-item

                :key="i"
                :class="{
                  'active-item': routeName(child.route) === activeRoute,
                }"
                @click="listItemClick(child)"
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon right>
                    {{ child.icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.label }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="white"
      dense
    >
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down mx-2">Symper CRM</span>
      </v-toolbar-title>

      <v-row class="flex-column">
        <v-form
          method="get"
          class="hidden-sm-and-down"
          @submit.prevent="search"
        >
          <v-text-field
            v-model="keySearch"
            flat
            hide-details
            outlined
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
            dense
            color="#f58634"
          ></v-text-field>
        </v-form>
      </v-row>

      <v-spacer></v-spacer>
        <span style="color:#f58634;">{{username}}</span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                small
                icon 
                @click="signOut"
                v-bind="attrs"
                v-on="on"
                >
                    <v-icon>mdi-power</v-icon>
                </v-btn>
            </template>
            <span>Đăng xuất</span>
        </v-tooltip>
    </v-app-bar>

    <v-main>
      <router-view :keySearch="keySearch"/>
    </v-main>

<!-- 
    <is-footer></is-footer>

    <modal-not-done-tasks
      :tasks="tasks"
      :dialog="dialog"
      @dialog-close="dialog = false"
    ></modal-not-done-tasks> -->
  </v-app>
</div>
</template>

<script>
// import ModalNotDoneTasks from '@/components/layout/ModalNotDoneTasks'
import { taskApi } from '@/api/task';
import { clientApi } from '@/api/client';
import { userApi } from '@/api/user';
export default {
  name: 'Home',
  components: { 
    // ModalNotDoneTasks 
  },
  data() {
    return {
      keySearch: null,
      tasks: [],
      dialog: false,
      drawer: null,
      activeRoute: null,
      items: [
        {
          label: 'Dashboard',
          icon: 'mdi-tablet-dashboard',
          route: '/dashboard',
        },
        {
          label: 'Calendar',
          icon: 'mdi-calendar',
          route: '/calendar',
        },
        {
          label: 'Clients',
          icon: 'mdi-account-group',
          route: '/client',
        },
        {
          label: 'Product',
          icon: 'mdi-database-cog',
          route: '/product',
        },
        {
          label: 'Tasks',
          icon: 'mdi-checkbox-marked-circle-plus-outline',
          route: '/task',
        },
        {
          label: 'Orders',
          icon: 'mdi-cart-heart',
          route: '/order',
        },
        {
          label: 'Call',
          icon: 'mdi-phone',
          route: '/call',
        },
        {
          label: 'Email Marketing',
          icon: 'mdi-email-send-outline',
          route: '/email',
        },
        {
          label: 'Users',
          icon: 'mdi-account-cog',
          route: '/user',
        },
      ],
    }
  },
  computed: {
    username() {
      return this.$store.state.currentUser.name;

    },
  },
  watch: {
    // $route(to, from) {
    //   this.activeRoute = this.routeName(to.name)
    //   this.initActiveMenuItem()
    // },
  },
  created() {
    this.activeRoute = this.routeName(this.$route.name)
  },
  mounted() {
    // if (this.isGranted('ROLE_TASK_LIST')) {
      this.getData()
    // }

    this.initActiveMenuItem()
  },
  methods: {
    async getData(){
        // get task
        let task = await taskApi.getTasks();
        this.$store.commit('handleGetTask', task.response);
        // get client
        let client = await clientApi.getClients();
        this.$store.commit('handleGetClient', client.response);
        // get user
		let user = await userApi.getUsers();
		this.$store.commit('handleGetUser', user.response);
    },
    initActiveMenuItem() {
      this.items.forEach((i) => {
        if (i.children && i.children.length) {
          i.children.forEach((el) => {
            if (this.routeName(el.route) === this.activeRoute) {
              i.model = true
            }
          })
        } else if (this.routeName(i.route) === this.activeRoute) {
          i.model = true
        }
      })
    },
    routeName(route) {
      return route ? route.replace(/(List|Show|Create|Update)/, '') : ''
    },
    prependIcon(item) {
      if (item.icon) {
        return item.icon
      }
    },
    appendIcon(item) {
      if (item.children && item.children.length) {
        return 'mdi-chevron-down'
      }

      return null
    },
    listItemClick(item) {
      this.keySearch = ''
      if (item.route) {
        this.$router.push(item.route)
      }
    },
    // isGrantedItem(item) {
    //   // if (item.role) {
    //   //   return this.isGranted(item.role)
    //   // }

    //   // if (item.children) {
    //   //   return item.children.some((child) => this.isGranted(child.role))
    //   // }

    //   return false
    // },
    search() {
      this.$router.push({ name: 'search___en', query: { q: this.q } })
    },
    signOut() {
      // this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
    getTasks() {
      // const url = `${process.env.NUXT_ENV_API_URL}/tasks/deadline`

      // this.$axios.get(url).then((response) => {
      //   this.tasks = response.data['hydra:member']

      //   if (this.tasks.length) {
      //     this.dialog = true
      //   }
      // })
    },
  },
}
</script>

<style lang="scss">

</style>
