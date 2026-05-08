import json
import random

LOCATIONS = {
    "Comuna 1 (Popular)": "Metrocable Línea K (Estación Santo Domingo)",
    "Comuna 2 (Santa Cruz)": "Estación Acevedo",
    "Comuna 3 (Manrique)": "Metroplús Línea 1 o 2 (Estación Gardel o Palos Verdes)",
    "Comuna 4 (Aranjuez)": "Estación Universidad o Metroplús Aranjuez",
    "Comuna 5 (Castilla)": "Estación Tricentenario",
    "Comuna 6 (Doce de Octubre)": "Metrocable Línea P (Estación Doce de Octubre)",
    "Comuna 7 (Robledo)": "Estación Vallejuelos o La Aurora",
    "Comuna 8 (Villa Hermosa)": "Metrocable Línea M (Estación Trece de Noviembre)",
    "Comuna 9 (Buenos Aires)": "Tranvía Estación Miraflores",
    "Comuna 10 (La Candelaria)": "Estación San Antonio, Parque Berrío o Prado",
    "Comuna 11 (Laureles)": "Estación Estadio o Suramericana",
    "Comuna 12 (La América)": "Estación Santa Lucía o Floresta",
    "Comuna 13 (San Javier)": "Estación San Javier",
    "Comuna 14 (El Poblado)": "Estación Poblado o Aguacatala",
    "Comuna 15 (Guayabal)": "Estación Industriales o Poblado",
    "Comuna 16 (Belén)": "Estación Industriales y Metroplús Línea 1",
    "Guatapé": "Terminal del Norte (Estación Caribe)",
    "Santa Fe de Antioquia": "Terminal del Norte (Estación Caribe)",
    "Jardín": "Terminal del Sur (Cerca a Estación Poblado)",
    "Jericó": "Terminal del Sur (Cerca a Estación Poblado)",
    "Rionegro": "Terminal del Norte o Bus de Rionegro por la Autopista Sur",
    "Marinilla": "Terminal del Norte (Estación Caribe)",
    "La Ceja": "Terminal del Sur (Cerca a Estación Poblado)",
    "San Cristóbal": "Conexión vía túnel o Estación San Javier",
    "Santa Elena": "Metrocable Arví (Estación Santo Domingo -> Línea L)"
}

templates = [
    "¿Cómo llego a {loc}?", "¿Qué ruta me sirve para {loc}?", "¿Estación más cercana a {loc}?",
    "Parce, ¿cómo voy para {loc}?", "Vea, necesito llegar a {loc}, ¿qué hago?",
    "¿Me puede decir la estación para {loc}?", "¿Cuál es el camino a {loc} usando el Metro?",
    "¿Hay algún cable que me lleve a {loc}?", "¿Cómo llego a {loc} desde el centro?",
    "Ruta para {loc} por favor.", "Quiero ir a {loc}, ¿qué transporte cojo?",
    "¿Qué bus o metro me lleva a {loc}?", "Dime la mejor forma de ir a {loc}.",
    "Estoy en el centro y quiero ir a {loc}.", "¿{loc} tiene estación de metro cerca?",
    "¿Qué medio de transporte me deja en {loc}?", "Instrucciones para llegar a {loc}.",
    "¿Cuál es el transporte más rápido para {loc}?", "¿Cómo me muevo hacia {loc}?",
    "Explícame cómo llegar a {loc} usando el SITVA."
]

faqs = [
    ("¿A qué hora abre el metro?", "El Metro abre de lunes a sábado a las 4:30 a. m. Los domingos y festivos abre a las 5:00 a. m."),
    ("¿A qué hora cierra el metro?", "El sistema cierra de lunes a sábado a las 11:00 p. m. Los domingos y festivos a las 10:00 p. m."),
    ("¿Cuánto vale el pasaje?", "La tarifa de la tarjeta Cívica para 2026 ronda los $3.210 pesos, pero puede variar si usas integrados."),
    ("¿Qué es un alimentador?", "Los alimentadores son buses verdes del SITVA que te llevan desde los barrios hasta las estaciones del Metro."),
    ("¿El Cable Arví funciona hoy?", "El Cable Arví (Línea L) no opera los lunes por mantenimiento. De martes a domingo abre desde las 9:00 a. m."),
    ("¿Cómo saco la tarjeta Cívica?", "Puedes sacarla en los Puntos de Atención al Cliente (PAC) en estaciones como Itagüí, San Antonio o Niquía."),
    ("¿Qué es el SITVA?", "Es el Sistema Integrado de Transporte del Valle de Aburrá, que incluye Metro, Cables, Tranvía, Metroplús y Alimentadores."),
    ("¿Qué hago en una emergencia?", "Busca el botón rojo de emergencia en los trenes o plataformas, o contacta al personal de la estación (chaleco naranja/gris)."),
    ("¿Se me perdió algo en el Metro?", "Debes dirigirte al PAC de la Estación Itagüí, allí está la oficina de objetos encontrados.")
]

prefixes = ["Disculpe, ", "Oiga, ", "Vea, ", "", "¿Me dice ", "Hola, ", "Qué pena, ", "Sabe usted ", "Me podría informar ", "Ome, "]

dataset = []

for loc, ref in LOCATIONS.items():
    for temp in templates:
        resps = [f"Para {loc}, bájese en la {ref}.", f"Llegue a la {ref} para ir a {loc}.", f"La {ref} le queda perfecta para {loc}."]
        dataset.append({"instruction": temp.format(loc=loc), "input": "", "output": random.choice(resps)})

for q, a in faqs:
    for prefix in prefixes:
        dataset.append({"instruction": f"{prefix}{q.lower()}", "input": "", "output": a})

stations_a = ["Niquía", "Bello", "Madera", "Acevedo", "Tricentenario", "Caribe", "Universidad", "Hospital", "Prado", "Parque Berrío", "San Antonio", "Alpujarra", "Exposiciones", "Industriales", "Poblado", "Aguacatala", "Ayurá", "Envigado", "Itagüí", "Sabaneta", "La Estrella"]
stations_b = ["San Antonio", "Cisneros", "Suramericana", "Estadio", "Floresta", "Santa Lucía", "San Javier"]

for i in range(len(stations_a)-1):
    dataset.append({"instruction": f"¿Qué sigue después de {stations_a[i]} hacia el sur?", "input": "", "output": f"Sigue la Estación {stations_a[i+1]}."})
for i in range(len(stations_b)-1):
    dataset.append({"instruction": f"¿Qué sigue después de {stations_b[i]} hacia el occidente?", "input": "", "output": f"Sigue la Estación {stations_b[i+1]}."})

with open('scripts/dataset.jsonl', 'w', encoding='utf-8') as f:
    for entry in dataset:
        f.write(json.dumps(entry, ensure_ascii=False) + '\n')

print(f"🌟 DATASET SUPREMO generado con {len(dataset)} ejemplos.")
