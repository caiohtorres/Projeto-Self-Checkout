import Image from "next/image";
import Link from "next/link";

import { db } from "@/lib/prisma";

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  avatarImageUrl: string;
}

const HomePage = async () => {
  const restaurants = await db.restaurant.findMany();

  return (
    <div className="h-screen flex-col items-center justify-center px-6 pt-24">
      {/* TITULO */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Escolha um Restaurante</h2>
      </div>

      {/* LISTA DE RESTAURANTES */}
      <div className="grid grid-cols-1 gap-6 pt-14 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant: Restaurant) => (
          <Link key={restaurant.id} href={`/${restaurant.slug}`}>
            <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
              <Image
                src={restaurant.avatarImageUrl}
                alt={restaurant.name}
                height={100}
                width={100}
                className="rounded-full"
              />
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
