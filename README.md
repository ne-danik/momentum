# [momentum](https://ne-danik.github.io/momentum/)

Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/ready-projects/momentum.md

Screenshot:
![](https://raw.githubusercontent.com/ne-danik/images/master/screen-momentum.png)

* Базовая функциональность
    * воспроизводится функциональность исходного проекта:
    * отображается время;
    * можно ввести имя пользователя и его цель, эти данные сохраняются в local storage и отображаются после обновления страницы, фоновое изображение и приветствие изменяются в зависимости от времени суток.
    * Отличия от исходного проекта:
    * 1) выводится не только время, но и день недели, дата, месяц, например: "Пятница, 25 сентября";
    * 2) время выводится в 24-часовом формате;
    * 3) при клике в поле ввода текст, который там был, исчезает, если пользователь ничего не ввёл или ввёл пустую строку, текст восстанавливается;
    * 4) четыре времени суток: утро 6:00-12:00, день 12:00-18:00, вечер 18:00-24:00, ночь 24:00-6:00.

* Смена фонового изображения
    * Плавная смена фоновых изображений.
    * Фоновые изображения меняются каждый час, их содержание соответствует времени суток (утро, день, вечер, ночь).
    * Есть кнопка, при клике по которой можно пролистать все фоновые изображения за сутки. Изображения пролистываются в том же порядке, в котором они менялись бы в реальном времени.

* Цитата дня
    * При загрузке приложения выводится цитата.
    * При перезагрузке страницы или клике на предназначенную для этого кнопку цитата заменяется на другую.

* Прогноз погоды
    * В приложении выводится прогноз погоды для указанного пользователем города.
    * Прогноз погоды включает в себя иконку погоды, данные о температуре, относительной влажности воздуха, скорости ветра.

* Адаптивный дизайн
    * приложение корректно отображается как на компьютере, так и на мобильных устройствах.
