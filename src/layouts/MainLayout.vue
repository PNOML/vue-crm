<template>
  <div>
    <Loader v-if="loading" />

    <div
      v-else
      class="app-main-layout"
    >

      <Navbar @move-sidebar="sidebarIsOpen = !sidebarIsOpen" />

      <Sidebar
        v-model="sidebarIsOpen"
        :key="locale"
      />

      <main
        class="app-content"
        :class="{full: !sidebarIsOpen}"
      >
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "../messages/messages";

export default {
  name: "main-layout",
  data: () => ({
    sidebarIsOpen: true,
    loading: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>