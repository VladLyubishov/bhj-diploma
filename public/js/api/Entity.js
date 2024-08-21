/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  static URL = ''
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    const requestData = {
      method: 'GET',
      url: this.URL,
      data,
      callback
    };
    createRequest(requestData); 
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    const requestData = {
      method: 'PUT',
      url: this.URL,
      data,
      callback
    };
    createRequest(requestData); 
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    const requestData = {
      method: 'DELETE',
      url: this.URL,
      data,
      callback
    };
    createRequest(requestData);  
  }
}
