<template>
  <view class="page-body">
    <uct-scroll
      v-bind="config.scroll"
      v-model="config.scroll.tabIndex"
      @success="init"
      @change="changeTabIndex"
    >
      <view v-for="(item, index) in config.scroll.tabs" class="px40" :key="index" :slot="index">
        <view>{{ index }}</view>
      </view>
    </uct-scroll>
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
    // tabbar发生改变时的回调
    changeTabIndex(v) {},
  },
};
</script>
