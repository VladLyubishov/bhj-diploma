/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle')

    sidebarToggle.onclick = () => {
      document.body.classList.toggle('sidebar-open')
      document.body.classList.toggle('sidebar-collapse')
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerBtn = document.querySelector('.menu-item_register');
    const loginBtn = document.querySelector('.menu-item_login');
    const logoutBtn = document.querySelector('.menu-item_logout');

    registerBtn.onclick = () => {
      const registerModal = new Modal(App.getModal('register').element);
      registerModal.open();
    }
    
    loginBtn.onclick = () => {
      const modalLogin = new Modal(App.getModal('login').element);
      modalLogin.open();
    }

    logoutBtn.onclick = () => {
      console.log(User.logout((err, res) => {
          if (err) {
            throw new Error(err);
          }
          if (!res.success) {
            return;
          }}
        )
      )
      User.logout((err, response) => {
        if (err) {
          return;
        }
        
        if (!response.success) {
          return;
        }

        App.setState('init');
        console.log(response)
      }
    
      )
    }
  }
}