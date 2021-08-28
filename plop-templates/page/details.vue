<template>
  <view class="page-body">
    <uct-details v-bind="config.details"> </uct-details>
    <!-- 该注释用于添加组件，不可删除 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      config: require('./{{name}}.json'),
    };
  },
  mounted() {
    setTimeout(() => {
      this.config.details.loading = false;
    }, 2000);
  },
};
</script>