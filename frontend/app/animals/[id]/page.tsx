import Link from 'next/link';

async function getAnimal(id: string) {
  const res = await fetch(`http://localhost:3000/animals/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function AnimalDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const animal = await getAnimal(params.id);
  if (!animal) {
    return <p>Animal não encontrado.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <img
            src={animal.mainPhotoUrl ?? '/placeholder.jpg'}
            alt={animal.name}
            className="w-full h-80 object-cover rounded"
          />
          {animal.photoUrls && animal.photoUrls.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {animal.photoUrls.map((url: string, idx: number) => (
                <img
                  key={idx}
                  src={url}
                  alt={`${animal.name} ${idx + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{animal.name}</h1>
          <p className="text-gray-600 text-sm">
            {animal.species} • {animal.breed || 'Sem raça definida'} • {animal.age} anos
          </p>
          <p className="text-gray-600 text-sm">
            Porte: {animal.size} • Sexo: {animal.gender}
          </p>
          <p className="text-sm mt-2">{animal.description}</p>

          <div className="space-x-2 mt-4">
            <Link
              href={`/dashboard/reservations/new?animalId=${animal.id}`}
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm"
            >
              Quero Adotar / Reservar
            </Link>
            <Link
              href={`/dashboard/appointments/new?animalId=${animal.id}`}
              className="px-4 py-2 rounded border text-sm"
            >
              Agendar Visita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}