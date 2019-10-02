<template>
    <div>
        <el-form ref="form">
            <el-form-item label="Start harvesting on app startup">
                <el-switch v-model="startOnStartup"></el-switch>
            </el-form-item>
            <el-form-item label="Run app at system startup">
                <el-switch v-model="startup"></el-switch>
            </el-form-item>
        </el-form>


        <el-table :data="keywords.filter(data => !search || data.keyword.toLowerCase().includes(search.toLowerCase()))">
            <el-table-column column-key="keyword" label="Keyword" prop="keyword" sortable></el-table-column>
            <el-table-column column-key="notice" label="Notification" prop="notice" sortable :formatter="showBool"></el-table-column>
            <el-table-column column-key="screenshot" label="Take a screenshot" prop="screenshot" sortable :formatter="showBool"></el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Type to search"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteKeyword(scope.$index)">Delete</el-button>
                </template>
            </el-table-column>
            <template slot="append" v-if="add">
                <div style="margin: 10px 0">
                    <el-row>
                        <el-col :span="12">
                            <el-input placeholder="Keyword" v-model="form.keyword"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox label="Notification" v-model="form.notice"></el-checkbox>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox label="Screenshot" v-model="form.screenshot"></el-checkbox>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" icon="el-icon-plus" @click="newKeyword"></el-button>
                        </el-col>
                    </el-row>
                </div>
            </template>
        </el-table>
        <div style="margin-top: 20px">
            <el-button type="primary" icon="el-icon-plus" @click="add = true">Add new keyword</el-button>
        </div>
    </div>

</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Settings',
    methods: {
      ...mapActions(['setSetting', 'addKeyword', 'deleteKeyword']),
      newKeyword() {
        this.addKeyword(Object.assign({}, this.form))
        for (const key in this.form) {
          this.form[key] = null
        }
        this.add = false
      },
      showBool(row, column, cellValue, index) {
        if (cellValue == true) {
          return 'Yes'
        }
        return 'No'
      }
    },
    data () {
      return {
        search: null,
        add: false,
        form: {
          keyword: null,
          notice: false,
          screenshot: false
        }
      }
    },
    computed: {
      ...mapState(['settings', 'keywords']),
      startup: {
        get() {
          return this.settings.startup
        },
        set(value) {
          this.setSetting({name: 'startup', value: value})
        }
      },
      startOnStartup: {
        get() {
          return this.settings.startOnStartup
        },
        set(value) {
          this.setSetting({name: 'startOnStartup', value: value})
        }
      }
    }
  }
</script>

<style scoped>

</style>