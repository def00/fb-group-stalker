<template>
    <div id="app">
        <el-container>
            <el-aside style="width: 20%; min-width: 100px">
                <el-menu>
                    <el-menu-item @click="view = 'jobs'"><i class="el-icon-position"></i> Jobs</el-menu-item>
                    <el-menu-item @click="view = 'settings'"><i class="el-icon-setting"></i> Settings</el-menu-item>
                </el-menu>
            </el-aside>
            <div style="width: 79%; min-width: 300px; margin-left: 1%;">
                <settings v-if="view === 'settings'"></settings>
                <jobs v-if="view === 'jobs'"></jobs>
            </div>
        </el-container>
    </div>
</template>

<script>
  import Settings from './components/Settings.vue'
  import Jobs from './components/Jobs.vue'
  import {ipcRenderer} from 'electron'

  export default {
    name: 'App.vue',
    components: {
      Settings,
      Jobs
    },
    data() {
      return {
        view: 'jobs'
      }
    },
    mounted() {
      ipcRenderer.send('app', 'ready')
    },
    methods: {
      open(what) {
        this.view = what
      }
    }
  }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
    }

    a {
        color: #000;
    }
</style>