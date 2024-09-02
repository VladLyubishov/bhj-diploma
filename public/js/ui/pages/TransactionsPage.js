/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element){
      return new Error('Переданный элемент не существует');
    }
    
    this.element = element;
    this.registerEvents();
    this.content = this.element.querySelector('.content');
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.removeTransactionButtons();
    this.removeAccountButtons();
  }

  removeAccountButtons() {
    const removeAccount = document.querySelectorAll('.remove-account')
   
    removeAccount.forEach((btn) => {
      btn.onclick = () => {
        this.removeAccount();
      }
    })
  }

  removeTransactionButtons() {
    const removeTransactions = document.querySelectorAll('.transaction__remove');
  

    removeTransactions.forEach((btn) => {
      btn.onclick = () => {
        this.removeTransaction(btn.dataset);
      };
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions){
      return;
    }

    let ask = confirm("Вы действительно хотите удалить счёт?");

    if(ask){
      Account.remove({id: this.lastOptions.account_id}, (err, res) => {
        if (err){
          throw new Error('Ошибка сервера');
        }
        if (!res.success){
          throw new Error('Ошибка запроса');
        }
        App.updateWidgets();
        App.updateForms();
        this.clear();
      })
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    let ask = confirm("Вы действительно хотите удалить счёт?");
    
    if(ask){
      Transaction.remove(id, (err, res) => {
        if(err){
          throw new Error('Ошибка сервера');
        }
        if(!res.success){
          throw new Error('Ошибка запроса');
        }
        App.update();
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(!options){
      return;
    }
    
    this.lastOptions = options;
    
    Account.get(options.account_id, (err, res) => {
      if (err){
        throw new Error('Ошибка сервера');
      }
      if (!res.success){
        throw new Error('Ошибка запроса');
      }
      this.renderTitle(res.data.name);
    });

    Transaction.list(options, (err, res) => {
      if (err) {
        throw new Error('Ошибка сервера');
      }
      if (!res.success) {
        throw new Error('Ошибка запроса');
      }
      this.renderTransactions(res.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const contentTitle = document.querySelector('.content-title');
    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const dateString = new Date(date);

    const monthNames = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
  
    const day = dateString.getDate();
    const month = monthNames[dateString.getMonth()];
    const year = dateString.getFullYear();
    const hours = dateString.getHours();
    const minutes = dateString.getMinutes();
  
    return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    return(`
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <!-- дата -->
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          <!--  сумма -->
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <!-- в data-id нужно поместить id -->
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
      </div>
    `);
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const markup = data.reduce((prev, item) => prev + this.getTransactionHTML(item), '');
    this.content.innerHTML = markup;
    this.removeTransactionButtons();
  }
}