/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, res) => {
      if (err){
        throw new Error('')
      } 
      if (!res.success){
        return;
      }
      const closeModal = new Modal(App.getModal('createAccount').element)
      closeModal.close();
      App.update();
    })
  }
}