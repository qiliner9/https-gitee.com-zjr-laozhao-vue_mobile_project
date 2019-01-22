<template>
  <div>
    <div class="mui-card" v-for="item in list" :key="item.id">
      <div class="mui-card-header">{{ item.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <video
            style=" object-fit: fill; width: 100%; height: 100%; "
            :poster="item.poster"
            controls
            preload="true"
            data-setup="{}"
          >
            <source :src="item.url" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [ ]
    };
  },
  created(){
    this.getVideos()
  },
  methods:{
    getVideos(){
      this.$http.get('api/getvideos').then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      })
    }
  }
};
</script>


<style lang="scss" scoped>
</style>

