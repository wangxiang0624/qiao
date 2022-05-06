<template>
	<div>
		<button @click="goBack" type="button">返回app</button>
	</div>
</template>

<script>
	import{getCurrentInstance} from 'vue'
		export default {
			name: 'home',
			setup() {
				// vue3中取消了this的概念，可用getCurrentInstance来获取上下文，这里的proxy相当于this
				const { proxy } = getCurrentInstance()
				  console.log(proxy.$jsbridge);
				// onMounted(()=>{
				// 	proxy.$axios.get('/index-infos')
				// })
				 const methods = {
				      goBack() {						
				        console.log(proxy.$jsbridge);
						alert(window.address_a);
						// if(window.WebViewJavascriptBridge){
						// 	alert(window.WebViewJavascriptBridge);
							proxy.$jsbridge.back();
						// }else{
						// 	alert('无window.WebViewJavascriptBridge');
						// }
				      },
				    };
				    return {
				      ...methods
				    }
			}
		}
</script>

<style>
</style>
