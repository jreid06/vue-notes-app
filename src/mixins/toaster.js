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
		toaster.options.extendedTimeOut = 3000; 
		toaster.options.progressBar = true;
	},
	successToaster(message){
		toaster.success(!!message ? message : this.message.success);
	},
	errorToaster(message){
		toaster.error(!!message ? message : this.message.error);
	},
	warningToaster(message) {
	  toaster.warning(!!message ? message : this.message.warning);
	},
	infoToaster(message) {
	  toaster.info(!!message ? message : this.message.info);
	}

  }
}