/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelects = document.querySelectorAll('.accounts-select');

    Account.list({}, (err, res) => {
      if (err){
        throw new Error('');
      }
      if (!res.success){
        return;
      }
      accountsSelects.forEach(select => {
        for(var i = select.options.length - 1; i >= 0; i--) {
          select.remove(i);
        }
        res.data.forEach(element => {
          select.insertAdjacentHTML('afterBegin', `
            <option value="${element.id}">${element.name}</option>
          `)
        });
      });
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, res) => {
      if (err){
        throw new Error('');
      }
      if (!res.success){
        return;
      }
      
      App.update()
      this.element.reset();
      const modalName = this.element.closest('.modal').dataset.modalId
      const closeModal = new Modal(App.getModal(modalName).element)
      closeModal.close();
    })
  }
}