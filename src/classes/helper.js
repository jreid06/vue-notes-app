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

	static formatDate(timestamp){
		let date = new Date((timestamp)),
			months = ['january','february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

		return {
			day: date.getDate(),
			month: months[date.getMonth()],
			minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(), ,
			hours: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
			year: date.getFullYear(),
			prefix: date.getHours() < 12 ? 'am':'pm' 
		}
	}
}