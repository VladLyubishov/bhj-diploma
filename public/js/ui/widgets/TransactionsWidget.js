/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element){
      return new Error('Переданный элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {

    const newIncome = document.querySelector('#modal-new-income');
    const newExpense = document.querySelector('#modal-new-expense');

    newIncome.onclick = (element) => {
      const closeModal = new Modal(App.getModal('newIncome').element)
      closeModal.open();
    }

    
    newExpense.onclick = (element) => {
      App.getModal('newExpense')
    }

  }
}
