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

    // Categorias e produtos do FSW Donalds
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
        // Outros produtos do FSW Donalds...
      ],
    });

    // Restaurante Hotdog Mania
    const hotdogRestaurant = await tx.restaurant.create({
      data: {
        name: "Hotdog Mania",
        slug: "hotdog-mania",
        description: "O melhor hotdog da cidade!",
        avatarImageUrl:
          "https://3c3poylpye.ufs.sh/f/pItA58usWK2qtOBw93qH37z2n8hj6JymFEikZfbswXU9dASB",
        coverImageUrl:
          "https://3c3poylpye.ufs.sh/f/pItA58usWK2qaZ82I09SBCnF6jxioPZTvyHYbsU4OthGLgfd",
      },
    });

    // Categorias e produtos do Hotdog Mania
    const hotdogCategory = await tx.menuCategory.create({
      data: {
        name: "Hotdogs",
        restaurantId: hotdogRestaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Hotdog Clássico",
          description:
            "Pão macio, salsicha suína grelhada, molho de tomate caseiro, maionese cremosa, mostarda tradicional e cebola picada. Um clássico que nunca sai de moda.",
          price: 12.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qPizCuad02tuBLNAHW7ZQX4sTOpwhI6PlJRgx",
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
        // Outros produtos do Hotdog Mania...
      ],
    });

    // Restaurante Marmita Express
    const lunchRestaurant = await tx.restaurant.create({
      data: {
        name: "Marmita Express",
        slug: "marmita-express",
        description: "Marmitas saborosas e práticas para o seu dia a dia!",
        avatarImageUrl:
          "https://3c3poylpye.ufs.sh/f/pItA58usWK2qPZiXgwd02tuBLNAHW7ZQX4sTOpwhI6PlJRgx",
        coverImageUrl:
          "https://3c3poylpye.ufs.sh/f/pItA58usWK2qxjW06tf0hRfYQFVvPcij9HD6OapBs2kJ7Tqd",
      },
    });

    // Categorias do Marmita Express
    const lunchCategory = await tx.menuCategory.create({
      data: {
        name: "Marmitas",
        restaurantId: lunchRestaurant.id,
      },
    });

    const lunchDrinksCategory = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: lunchRestaurant.id,
      },
    });

    const lunchDessertsCategory = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: lunchRestaurant.id,
      },
    });

    // Produtos do Marmita Express
    await tx.product.createMany({
      data: [
        // Marmitas
        {
          name: "Marmita de Frango",
          description:
            "Arroz branco, feijão carioca, frango grelhado temperado com ervas, salada fresca de alface e tomate, e farofa crocante.",
          price: 22.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qolXpgxz9luOVnbvZedKX4aYTjmqCUhFEGRPH",
          menuCategoryId: lunchCategory.id,
          restaurantId: lunchRestaurant.id,
          ingredients: [
            "Arroz",
            "Feijão",
            "Frango grelhado",
            "Salada",
            "Farofa",
          ],
        },
        {
          name: "Marmita de Carne",
          description:
            "Arroz branco, feijão carioca, carne bovina assada com molho de ervas, salada de rúcula e cenoura ralada, e farofa de bacon.",
          price: 24.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qQhZ76qctlzN2guHj1S3FaJiWKOmydn0cV5t8",
          menuCategoryId: lunchCategory.id,
          restaurantId: lunchRestaurant.id,
          ingredients: ["Arroz", "Feijão", "Carne assada", "Salada", "Farofa"],
        },
        {
          name: "Marmita de Peixe",
          description:
            "Arroz branco, feijão carioca, filé de peixe grelhado com ervas, salada de alface e tomate, e purê de batata cremoso.",
          price: 26.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qWyy5QyhDhmVEcPjLde9kXIAfO5zHFMQZWyYw",
          menuCategoryId: lunchCategory.id,
          restaurantId: lunchRestaurant.id,
          ingredients: [
            "Arroz",
            "Feijão",
            "Filé de peixe",
            "Salada",
            "Purê de batata",
          ],
        },
        // Bebidas
        {
          name: "Coca-cola",
          description: "Coca-cola gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
          menuCategoryId: lunchDrinksCategory.id,
          restaurantId: lunchRestaurant.id,
        },
        {
          name: "Fanta Laranja",
          description: "Fanta Laranja gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
          menuCategoryId: lunchDrinksCategory.id,
          restaurantId: lunchRestaurant.id,
        },
        {
          name: "Água Mineral",
          description: "A bebida favorita do Cristiano Ronaldo.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: lunchDrinksCategory.id,
          restaurantId: lunchRestaurant.id,
        },
        // Sobremesas
        {
          name: "Pudim",
          description:
            "Pudim de leite condensado, cremoso e com calda de caramelo.",
          price: 8.9,
          imageUrl:
            "https://3c3poylpye.ufs.sh/f/pItA58usWK2qAf23X1TXwJnZIzPijvaDEf0Qr6yxpHocOYV5",
          menuCategoryId: lunchDessertsCategory.id,
          restaurantId: lunchRestaurant.id,
          ingredients: [],
        },
        {
          name: "Casquinha de Chocolate",
          description: "Casquinha de sorvete sabor chocolate.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
          menuCategoryId: lunchDessertsCategory.id,
          restaurantId: lunchRestaurant.id,
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
