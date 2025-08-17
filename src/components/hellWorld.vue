<template>
<div>
  <div>Hello world!</div>
<t-button>确定</t-button>
<textL />
</div>
</template>
<script>
import textL from './text.vue'
import {
  ChromeExtensionProxyPage,
  ChromeExtensionProxyPageAgent,
} from '@midscene/web/chrome-extension';

export default {
  components: {
textL
  },
  mounted() {
    const page = new ChromeExtensionProxyPage(false);
  this.agent = new ChromeExtensionProxyPageAgent(page);
  console.log(this.agent, 'nihao')
  }
}
</script>