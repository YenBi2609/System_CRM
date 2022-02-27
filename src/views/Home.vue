<template>
<div id="#app">
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      dark
      hide-overlay
      :src="bg"
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
      color="primary"
      dark
      :src="bg"
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
            v-model="q"
            flat
            hide-details
            solo-inverted
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
        </v-form>
      </v-row>

      <v-spacer></v-spacer>

      <span class="mx-2">{{ username }}</span>
      <v-btn icon @click="signOut">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
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
import bg from '../assets/bg.png'
export default {
  name: 'Home',
  components: { 
    // ModalNotDoneTasks 
  },
  data() {
    return {
      bg,
      q: null,
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
          label: 'Projects',
          icon: 'mdi-folder-open',
          route: '/project',
        },
        {
          label: 'Tasks',
          icon: 'mdi-clock-outline',
          route: '/task',
        },
        {
          label: 'Documents',
          icon: 'mdi-bookmark',
          route: '/document',
        },
        {
          label: 'Contacts',
          icon: 'mdi-contacts',
          children: [
            {
              label: 'contacts',
              icon: 'mdi-local_phone',
              route: '/contact',
            },
            {
              label: 'address',
              icon: 'mdi-my_location',
              route: '/address',
            },
          ],
        },
        {
          label: 'Dictionaries',
          icon: 'mdi-list',
          children: [
            {
              label: 'Country',
              icon: 'mdi-flag',
              route: '/country',
            },
            {
              label: 'Language',
              icon: 'mdi-format_align_justify',
              route: '/language',
            },
            {
              label: 'Contact_type',
              icon: 'mdi-call_end',
              route: '/contact_type',
            },
            {
              label: 'Project_type',
              icon: 'mdi-work',
              route: '/project_type',
            },
            {
              label: 'Project_status',
              icon: 'mdi-web',
              route: '/project_status',
            },
            {
              label: 'Task_status',
              icon: 'mdi-web_asset',
              route: '/task_status',
            },
            {
              label: 'Label',
              icon: 'mdi-label',
              route: '/label',
            },
          ],
        },
        {
          label: 'Users',
          icon: 'mdi-security',
          children: [
            {
              label: 'Uers',
              icon: 'mdi-account_box',
              route: '/user',
            },
            {
              label: 'Groups',
              icon: 'mdi-people_outline',
              route: '/group',
            },
          ],
        },
        {
          label: 'Maintenance',
          icon: 'mdi-cog',
          children: [
            {
              label: 'History',
              icon: 'mdi-timelapse',
              route: '/history',
            },
          ],
        },
      ],
    }
  },
  computed: {
    username() {
      return 'Mrs.Yen'
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
      this.getTasks()
    // }

    this.initActiveMenuItem()
  },
  methods: {
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
      this.$store.dispatch('auth/logout')
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
.v-navigation-drawer {
  .v-list {
    &-group--active {
      .v-list-group__items {
        background: #142430;
      }
      .v-list-group__header {
        background: #142430;
      }
    }
    .theme--dark {
      .v-icon {
        color: #fff !important;
      }
    }
  }
}
.active-item {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3 !important;
    background-color: #fafafa !important;
  }
}
</style>
