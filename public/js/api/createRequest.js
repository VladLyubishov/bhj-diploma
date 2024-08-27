/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    const formData = new FormData();

    if (!options.data) {
        return new FormData();
    }

    if (options.method == 'GET'){

        xhr.open('GET', `${options.url}?mail=${options.data.email}&password=${options.data.password}&name=${options.data.name}`)
        xhr.send()

    } else {

        formData.append('email', options.data.email)
        formData.append('password', options.data.password)

        xhr.open(options.method, options.url)
        xhr.send(formData)
    }

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (options.callback) {
                options.callback(null, xhr.response)
            }
        } else {
            if (options.callback) {
                options.callback(new Error('Ошибка запроса'), null)
            } 
        }
    })

    xhr.addEventListener('error', () => {
        if (options.callback) {
            options.callback(new Error('Ошибка сервера'), null)
        }
    })
};
