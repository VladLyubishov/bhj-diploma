/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, res) => {
      if (err) {
        throw new Error(err);
      }
      if (!res.success) {
        return;
      }
      this.element.reset();
      App.setState('user-logged');
      const closeModal = new Modal(App.getModal('register').element)
      closeModal.close();
    })
  }
}