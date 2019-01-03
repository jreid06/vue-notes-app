<template>
	<div>
		<div class="row pt-0 bg-light">
			<div class="col-12 p-4 text-left">
				<h3>Welcome to <span class="text-success">mynotes</span> </h3>
				<p class="small">{{appDescription}}</p>
			</div>
		</div>
		<div class="row pr t-30 z-3">
			<div class="col-12 col-sm-6 col-lg-4 p-2 d-flex flex-column">
				<div class="click-box create-category p-3 w-100 shadow-sm mb-3 bg-white" v-for="(action, key) in actions[0]" :key="key" :data-action="key" @click="triggerModal">
					<h2 :data-action="key"><i :class="action.icon"></i></h2>
					<h4 class="text-capitalize" :data-action="key">{{action.name}}</h4>
					<p class="h3" :data-action="key"><i class="fas fa-plus-circle text-success" :data-action="key"></i></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const $ = require('jquery');
import {mapGetters} from 'vuex';

export default {
	computed: {
		...mapGetters(['appDescription', 'modalID'])
	},
	data(){
		return {
			actions:[
				{
					category:{
						name: 'create category',
						icon: 'far fa-folder',
						action: 'category'
					},
					note: {
						name: 'create note',
						icon: 'far fa-file-alt',
						action: 'note'
					},
					load: {
						name: 'load note',
						icon: 'far fa-hdd',
						action: 'load'
					}

				}
			]
		}
	},
	methods: {
		triggerModal(e){
			const vm = this;

			let target = e.target,
				action = target.hasAttribute('data-action') ? target.attributes['data-action'].value : target.parentElement.attributes['data-action'].value;

			switch(action){
				case 'note': 
					console.log('note modal');
					$(`#${vm.modalID(action)}`).modal();
					return;
					break;
				case 'category':
					console.log('category modal');
					$(`#${vm.modalID(action)}`).modal();
					return;
					break
				case 'load':
					console.log('load note modal');
					$(`#${vm.modalID(action)}`).modal();
					return;
					break;
			}

			console.log('action');
			console.log(action);


		}
	}
}
</script>
<style lang="scss" scoped>
	.click-box{
		cursor: pointer;
	}
</style>
