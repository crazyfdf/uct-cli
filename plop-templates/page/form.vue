<template>
  <view class="page-body">
    <uct-form v-bind="config.form" @submit="submit"></uct-form>
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
  methods: {
    // 成功回调
    submit(data, res) {
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

