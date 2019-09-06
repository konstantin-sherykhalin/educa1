export default async function API(method,data = {}) {
    // fetch(...);
    if(method == 'get_data') {
        await new Promise(res => setTimeout(res,Math.random()*1000));

        // Типа ошибка
        if(Math.random() < 0.2) {
            return {
                error: {
                    code: 500,
                    message: 'Произошла непредвиденная ошибка',
                },
            };

        // Нормально
        } else {
			let last_value = data.last_value;
			let rates = [];
			for(let i=0; i<3; i++) {
				last_value = last_value-0.01+0.02*Math.random()
				rates.push({
					value:		last_value,
					timestamp:	+new Date()-2000,
				});
			}
			// Типа вот это с сервера получили
            return {
                response: {
                    id: data.id,
                    name: data.name,
                    rates,
                },
            };
        }
    }
}
