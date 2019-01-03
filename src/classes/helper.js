export default class {
	static isJSON(val){
		try {
			JSON.parse(val) 
		} catch (e){			
			console.log('not json');
		}

		return 'is json';
	}

	static randomString(){
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}
}