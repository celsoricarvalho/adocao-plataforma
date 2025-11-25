import Link from "next/link";

async function getFeaturedAnimals() {
  const res = await fetch("http://localhost:3000/animals?limit=6", {
    cache: "no-store",
  });

  if (!res.ok) return { items: [] };
  return res.json();
}

export default async function HomePage() {
  const data = await getFeaturedAnimals();
  const animals = data.items ?? [];

  return (
    <main className="space-y-16">

      {/* ================= HERO / BANNER ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Adote amor. Mude uma vida. 🐾
          </h1>

          <p className="text-lg opacity-90 mb-6">
            Encontre seu novo melhor amigo entre os animais disponíveis para adoção!
          </p>

          <Link
            href="/animals"
            className="inline-block px-6 py-3 bg-white text-blue-700 font-semibold rounded shadow hover:bg-gray-100 transition"
          >
            Ver animais disponíveis
          </Link>
        </div>
      </section>

      {/* ================= DESTAQUES ================= */}
      <section className="px-2">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Animais em Destaque
        </h2>

        {/* grid cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {animals.map((animal: any) => (
            <Link
              key={animal.id}
              href={`/animals/${animal.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3"
            >
              <img
                src={animal.mainPhotoUrl ?? "/placeholder.jpg"}
                alt={animal.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />

              <h3 className="text-lg font-bold text-gray-800">{animal.name}</h3>
              <p className="text-sm text-gray-600">
                {animal.species} • {animal.size} • {animal.age} anos
              </p>

              <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {animal.description}
              </p>
            </Link>
          ))}

          {/* no animals */}
          {animals.length === 0 && (
            <p className="text-sm text-gray-500 col-span-full">
              Nenhum animal cadastrado ainda.
            </p>
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-8 text-sm text-gray-500">
        Desenvolvido com ❤️ para ajudar animais encontrarem um lar.
      </footer>
    </main>
  );
}
