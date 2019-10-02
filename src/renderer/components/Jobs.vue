<template>
    <el-table :data="jobs">
        <el-table-column column-key="type" label="Type" prop="type" sortable></el-table-column>
        <el-table-column column-key="url" label="URL" prop="url" sortable></el-table-column>
        <el-table-column column-key="status" label="Status" prop="status" sortable></el-table-column>
    </el-table>
</template>

<script>
  export default {
    name: 'Jobs',
    data() {
      return {
        jobs: [
          {
            type: 'collect',
            url: 'https://facebook.com'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>