/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const buildFormData = (data) => {
    if (!data) {
        return new FormData();
    }
    const formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }

    return formData;
};

const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (options.method == 'GET'){
        if (options.url.startsWith('/account')){
            xhr.open('GET', `${options.url}`);
        } 
        else if (options.url.startsWith('/transaction')){
            xhr.open('GET', `${options.url}?account_id=${options.data.account_id}`);
        } 
        else if(options.url.startsWith('/user')){
            xhr.open('GET', `${options.url}`);
        } else {
            if(options.data?.password && options.data?.email){
                xhr.open('GET', `${options.url}?mail=${options.data.email}&password=${options.data.password}`);
            } else {
                return;
            }
        }
        
        xhr.send();

    } else {
        const newFormData = buildFormData(options.data)  
        
        xhr.open(options.method, options.url);
        xhr.send(newFormData);
    }

    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (options.callback) {
                options.callback(null, xhr.response);
            }
        } else {
            if (options.callback) {
                options.callback(new Error('Ошибка запроса'), null);
            } 
        }
    })

    xhr.addEventListener('error', () => {
        if (options.callback) {
            options.callback(new Error('Ошибка сервера'), null);
        }
    })
};

