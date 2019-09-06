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
            return {
                result: {
                    id:     data.id,
                    name:   data.name,
                    rates: [
                        {
                            value:		1.10+0.02*Math.random(),
                            timestamp:	+new Date()-2000,
                        },
                        {
                            value:		1.10-0.02*Math.random(),
                            timestamp:	+new Date()-1000,
                        },
                        {
                            value:		1.09+0.02*Math.random(),
                            timestamp:	+new Date(),
                        },
                    ],
                },
            };
        }
    }
}
