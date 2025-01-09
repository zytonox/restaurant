import { createStore } from 'vuex'

export default createStore({
  state: {
    Products: [
      {
        id: 0,
        img: require('@/assets/images/oyster.png'),
        title: 'Устрицы по рокфеллеровски',
        description:
          'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
        price: 2700,
        weight: '500 г.',
        count: 0
      },
      {
        id: 1,
        img: require('@/assets/images/pork.png'),
        title: 'Свиные ребрышки на гриле с зеленью',
        description:
          'Не следует, однако забывать, что реализация намеченных плановых',
        price: 1600,
        weight: '750 г.',
        count: 0
      },
      {
        id: 2,
        img: require('@/assets/images/shrimp.png'),
        title: 'Креветки по-королевски в лимонном соке',
        description:
          'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры обеспечивает широкому кругу',
        price: 1820,
        weight: '7 шт.',
        count: 0
      },
      {
        id: 3,
        img: require('@/assets/images/oyster.png'),
        title: 'Устрицы по рокфеллеровски',
        description:
          'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
        price: 2700,
        weight: '500 г.',
        count: 0
      },
      {
        id: 4,
        img: require('@/assets/images/pork.png'),
        title: 'Свиные ребрышки на гриле с зеленью',
        description:
          'Не следует, однако забывать, что реализация намеченных плановых',
        price: 1600,
        weight: '750 г.',
        count: 0
      },
      {
        id: 5,
        img: require('@/assets/images/shrimp.png'),
        title: 'Креветки по-королевски в лимонном соке',
        description:
          'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры обеспечивает широкому кругу',
        price: 1820,
        weight: '7 шт.',
        count: 0
      },
      {
        id: 6,
        img: require('@/assets/images/oyster.png'),
        title: 'Устрицы по рокфеллеровски',
        description:
          'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры',
        price: 2700,
        weight: '500 г.',
        count: 0
      },
      {
        id: 7,
        img: require('@/assets/images/pork.png'),
        title: 'Свиные ребрышки на гриле с зеленью',
        description:
          'Не следует, однако забывать, что реализация намеченных плановых',
        price: 1600,
        weight: '750 г.',
        count: 0
      }
    ],
    BasketProducts: [],
    CurrentProduct: {}
  },
  getters: {
    getCountProductsInBasket: (state) =>
      state.BasketProducts.reduce(
        (allProducts, product) => allProducts + product.count,
        0
      ),
    getAllPriceProductsInBasket: (state) =>
      state.BasketProducts.reduce(
        (totalPrice, product) => totalPrice + product.price * product.count,
        0
      ),
    getProducts: (state) => state.Products,
    getBasketProducts: (state) => state.BasketProducts
  },
  mutations: {
    addProduct (state, product) {
      if (product.count > 0 && product.count < 3) {
        product.count = ++product.count
      }

      if (product.count === 0) {
        product.count = ++product.count
        state.BasketProducts.push(product)
      }
    },
    removeProduct (state, product) {
      if (product.count === 1) {
        product.count = 0
        state.BasketProducts = state.BasketProducts.filter(
          (basketProduct) => basketProduct.id !== product.id
        )
      }

      if (product.count > 1) {
        product.count = --product.count
      }
    },
    clearBasket (state) {
      state.BasketProducts.forEach((product) => {
        product.count = 0
      })
      state.BasketProducts = []
    },
    setCurrentProduct (state, product) {
      state.CurrentProduct = product
    }
  },
  actions: {},
  modules: {}
})
