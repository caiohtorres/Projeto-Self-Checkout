/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    // Limpa os dados existentes
    await tx.restaurant.deleteMany();

    // Restaurante FSW Donalds (mantido com links funcionais)
    const restaurant = await tx.restaurant.create({
      data: {
        name: "FSW Donalds",
        slug: "fsw-donalds",
        description: "O melhor fast food do mundo",
        avatarImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
        coverImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
      },
    });
    const combosCategory = await tx.menuCategory.create({
      data: {
        name: "Combos",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "McOferta Média Big Mac Duplo",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
        },
        {
          name: "Novo Brabo Melt Onion Rings",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
        },
        {
          name: "McCrispy Chicken Elite",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
        },
        {
          name: "Duplo Cheddar McMelt",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
          menuCategoryId: combosCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
        },
      ],
    });
    const hamburguersCategory = await tx.menuCategory.create({
      data: {
        name: "Lanches",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Big Mac",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Duplo Quarterão",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "McMelt",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "McNífico Bacon",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const frenchFriesCategory = await tx.menuCategory.create({
      data: {
        name: "Fritas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Fritas Grande",
          description: "Batatas fritas crocantes e sequinhas. Vem bastante!",
          ingredients: [],
          price: 10.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Fritas Média",
          description:
            "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
          ingredients: [],
          price: 9.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Fritas Pequena",
          description:
            "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const drinksCategory = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Coca-cola",
          description: "Coca-cola gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Fanta Laranja",
          description: "Fanta Laranja gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Água Mineral",
          description: "A bebida favorita do Cristiano Ronaldo.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const desertsCategory = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Casquinha de Baunilha",
          description: "Casquinha de sorvete sabor baunilha.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
          menuCategoryId: desertsCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Casquinha de Chocolate",
          description: "Casquinha de sorvete sabor chocolate.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
          menuCategoryId: desertsCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Casquinha de Mista",
          description: "Casquinha de sorvete sabor baunilha e chocolate.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
          menuCategoryId: desertsCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });

    // Restaurante Hotdog Mania
    const hotdogRestaurant = await tx.restaurant.create({
      data: {
        name: "Hotdog Mania",
        slug: "hotdog-mania",
        description: "O melhor hotdog da cidade!",
        avatarImageUrl:
          "https://3c3poylpye.ufs.sh/f/pItA58usWK2qtOBw93qH37z2n8hj6JymFEikZfbswXU9dASB", // Substitua pelo link real
        coverImageUrl:
          "https://3c3poylpye.ufs.sh/f/pItA58usWK2qaZ82I09SBCnF6jxioPZTvyHYbsU4OthGLgfd", // Substitua pelo link real
      },
    });

    // Categorias do Hotdog Mania
    const hotdogCategory = await tx.menuCategory.create({
      data: {
        name: "Hotdogs",
        restaurantId: hotdogRestaurant.id,
      },
    });

    const hotdogExtrasCategory = await tx.menuCategory.create({
      data: {
        name: "Extras",
        restaurantId: hotdogRestaurant.id,
      },
    });

    const hotdogDrinksCategory = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: hotdogRestaurant.id,
      },
    });

    const hotdogDessertsCategory = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: hotdogRestaurant.id,
      },
    });

    // Produtos do Hotdog Mania
    await tx.product.createMany({
      data: [
        // Hotdogs
        {
          name: "Hotdog Clássico",
          description:
            "Pão macio, salsicha suína grelhada, molho de tomate caseiro, maionese cremosa, mostarda tradicional e cebola picada. Um clássico que nunca sai de moda.",
          price: 12.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qPizCuad02tuBLNAHW7ZQX4sTOpwhI6PlJRgx", // Substitua pelo link real
          menuCategoryId: hotdogCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: [
            "Pão",
            "Salsicha",
            "Molho de tomate",
            "Maionese",
            "Mostarda",
          ],
        },
        {
          name: "Hotdog Bacon",
          description:
            "Pão fresco, salsicha suína, fatias crocantes de bacon, queijo cheddar derretido, molho de tomate, maionese e um toque de cebola caramelizada. Perfeito para quem ama um sabor defumado.",
          price: 15.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qCaKgumG3FiScDrTEkm03M12n4hPvIalBqxKb", // Substitua pelo link real
          menuCategoryId: hotdogCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: [
            "Pão",
            "Salsicha",
            "Bacon",
            "Queijo cheddar",
            "Molho de tomate",
            "Maionese",
          ],
        },
        {
          name: "Hotdog Vegetariano",
          description:
            "Pão integral, salsicha de soja grelhada, milho doce, ervilhas frescas, batata palha crocante, molho de tomate e maionese vegana. Uma opção leve e saborosa.",
          price: 14.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qxxaQcDf0hRfYQFVvPcij9HD6OapBs2kJ7Tqd", // Substitua pelo link real
          menuCategoryId: hotdogCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: [
            "Pão",
            "Salsicha de soja",
            "Milho",
            "Ervilha",
            "Batata palha",
            "Molho de tomate",
            "Maionese",
          ],
        },
        {
          name: "Hotdog Picante",
          description:
            "Pão artesanal, salsicha suína, pimenta jalapeño em conserva, molho de pimenta caseiro, queijo cheddar derretido e maionese temperada. Para quem gosta de um toque ardido.",
          price: 16.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qAb6VPfTXwJnZIzPijvaDEf0Qr6yxpHocOYV5", // Substitua pelo link real
          menuCategoryId: hotdogCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: [
            "Pão",
            "Salsicha",
            "Pimenta jalapeño",
            "Molho de pimenta",
            "Queijo cheddar",
            "Maionese",
          ],
        },

        // Extras
        {
          name: "Batata Frita",
          description:
            "Porção de batatas cortadas em palito, fritas até ficarem douradas e crocantes. Acompanha molho especial da casa.",
          price: 8.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1", // Substitua pelo link real
          menuCategoryId: hotdogExtrasCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: ["Batata"],
        },
        {
          name: "Onion Rings",
          description:
            "Anéis de cebola empanados e fritos até ficarem dourados e crocantes. Acompanha molho barbecue.",
          price: 10.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qaVHxavSBCnF6jxioPZTvyHYbsU4OthGLgfd8", // Substitua pelo link real
          menuCategoryId: hotdogExtrasCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: ["Cebola", "Farinha de rosca"],
        },
        {
          name: "Nuggets",
          description:
            "Pedaços de frango empanados e fritos, crocantes por fora e suculentos por dentro. Acompanha molho de mostarda e mel.",
          price: 12.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qAYY7bVTXwJnZIzPijvaDEf0Qr6yxpHocOYV5", // Substitua pelo link real
          menuCategoryId: hotdogExtrasCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: ["Frango", "Farinha de rosca"],
        },
        // Bebidas
        {
          name: "Coca-cola",
          description: "Coca-cola gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
          menuCategoryId: hotdogDrinksCategory.id,
          restaurantId: hotdogRestaurant.id,
        },
        {
          name: "Fanta Laranja",
          description: "Fanta Laranja gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
          menuCategoryId: hotdogDrinksCategory.id,
          restaurantId: hotdogRestaurant.id,
        },
        {
          name: "Água Mineral",
          description: "A bebida favorita do Cristiano Ronaldo.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: hotdogDrinksCategory.id,
          restaurantId: hotdogRestaurant.id,
        },
        // Sobremesas
        {
          name: "Casquinha de Chocolate",
          description: "Casquinha de sorvete sabor chocolate.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
          menuCategoryId: hotdogDessertsCategory.id,
          restaurantId: hotdogRestaurant.id,
        },
        {
          name: "Brownie",
          description: "Brownie de chocolate com nozes.",
          price: 8.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qpoIoKa8usWK2qawitC4yDGxY6g3VmSdBjETI", // Substitua pelo link real
          menuCategoryId: hotdogDessertsCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: [],
        },
        {
          name: "Torta de Limão",
          description: "Fatia de torta de limão com merengue.",
          price: 9.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qZNL1w6OQ5v8seEKiShxFUq3yamJpPcTRGYfN", // Substitua pelo link real
          menuCategoryId: hotdogDessertsCategory.id,
          restaurantId: hotdogRestaurant.id,
          ingredients: [],
        },
      ],
    });
    

  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
