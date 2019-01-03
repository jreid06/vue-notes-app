<template>
	<div>
		<div class="row pt-0 bg-light">
			<div class="col-12 p-4 text-left">
				<h3><span class="text-success">Settings</span></h3>
				<p class="small">Update your avatar, add folder colours &amp; change personal details</p>
			</div>
		</div>
		<div class="row pr t-30 z-3">
			<div class="col-12 col-md-6 col-lg-4 p-2" v-for="(n,i) in 6" :key="i">
				<div class="click-box create-category p-5 shadow-sm mb-3 bg-white flex-grow-1">
					<p class="h3"><i class="fas fa-cog text-success"></i></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			
		}
	}
}
</script>
<style lang="scss" scoped>

</style>
