import {
  mapGetters
} from 'vuex'
import {
  mapMutations
} from 'vuex'

import toaster from 'toastr';

export default {
  data() {
    return {
		message: {
			success: 'Successfully completed action',
			error: 'Error completing action',
			warning: 'Something didnt quite work as expected',
			info: ''
		}
    }
  },
  computed: {
    
  },
  methods: {
    initializeToaster(){
		toaster.options.timeOut = 30;
		toaster.options.extendedTimeOut = 60; 
		toaster.options.progressBar = true;
	},
	successToaster(message){
		toaster.success(!!message ? message : this.message.success);
	},
	errorToaster(message){
		toaster.error(!!message ? message : this.message.success);
	},
	warningToaster(message) {
	  toaster.warning(!!message ? message : this.message.success);
	},
	infoToaster(message) {
	  toaster.info(!!message ? message : this.message.success);
	}

  }
}