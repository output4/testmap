const phrases: Record<string, any> = {
  messages: {
    en: {
      title: 'Test task for SquareGps',
      about: 'About task',
      map: 'Map',
      switcher: {
        russian: 'Russian',
        english: 'English'
      },
      mapPage: {
        add: 'Add marker',
        remove: 'Leave add marker resume',
        alertAdd: {
          title: 'Creation mode',
          text: 'Creation mode activated. Just click on the map for add marker.'
        },
        alertRemove: {
          title: 'Creation mode',
          text: 'Creation mode deactivated.'
        },
        error: {
          title: 'Can\'t add this marker',
          text: 'This point hasn\'t address',
        },
        titleLeft: 'Markers:',
        emptyList: 'There aren\'t any markers. Please add new ones.'
      },
      list: {
        defaultEmptyMsg: 'There aren\'t any items'
      }
    },
    ru: {
      title: 'Тестовое задание для SquareGps',
      about: 'О задании',
      map: 'Карта',
      switcher: {
        russian: 'Русский',
        english: 'Английский'
      },
      mapPage: {
        add: 'Добавить маркер',
        remove: 'Выйти из режима добавления',
        alertAdd: {
          title: 'Режим добавления',
          text: 'Активирован режим добавления. Кликните на карту чтобы добавить маркер.'
        },
        alertRemove: {
          title: 'Режим добавления',
          text: 'Режим добавления отключён'
        },
        error: {
          title: 'Невозможно добавить маркер',
          text: 'Данная точка не содержит адрес',
        },
        titleLeft: 'Маркеры:',
        emptyList: 'Маркеры отсутствуют. Добавьте первый'
      },
      list: {
        defaultEmptyMsg: 'Список пуст'
      }
    }
  }
};

export default phrases;
