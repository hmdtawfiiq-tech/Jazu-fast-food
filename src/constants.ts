import { MenuData, MenuItem } from './types';

export const menuData: MenuData = {
  BREAKFAST: [
    { name: "chai ya viungo", price: 1000 },
    { name: "chapati", price: 1000 },
    { name: "maziwa", price: 2000 },
    { name: "supu (nyama)", price: 5000 },
    { name: "maini roast", price: 5000 },
    { name: "supu (samaki)", price: 15000 }
  ],

  WALI: [
    { name: "nyama roast", price: 10000 },
    { name: "maini roast", price: 10000 },
    { name: "kuku", price: 15000 },
    { name: "samaki", price: 20000 },
    { name: "makange (nyama)", price: 15000 },
    { name: "makange (kuku)", price: 20000 },
    { name: "makange (samaki)", price: 20000 },
    { name: "changamoto (nyama)", price: 15000 },
    { name: "changamoto (kuku)", price: 20000 },
    { name: "changamoto (samaki)", price: 20000 }
  ],

  UGALI: [
    { name: "nyama roast", price: 10000 },
    { name: "maini roast", price: 10000 },
    { name: "kuku", price: 15000 },
    { name: "samaki", price: 20000 },
    { name: "makange (nyama)", price: 15000 },
    { name: "makange (kuku)", price: 20000 },
    { name: "makange (samaki)", price: 20000 },
    { name: "changamoto (nyama)", price: 15000 },
    { name: "changamoto (kuku)", price: 20000 },
    { name: "changamoto (samaki)", price: 20000 }
  ],

  PILAU: [
    { name: "nyama", price: 12000 },
    { name: "kuku", price: 15000 },
    { name: "samaki", price: 20000 }
  ],

  NDIZI: [
    { name: "nyama", price: 10000 },
    { name: "kuku", price: 12000 },
    { name: "samaki", price: 15000 }
  ],

  BIRYANI: [
    { name: "nyama", price: 10000 },
    { name: "kuku", price: 15000 }
  ],

  FAST_FOOD: [
    { name: "sausage", price: 1000 },
    { name: "ndizi mzuzu", price: 2000 },
    { name: "firigisi", price: 2000 },
    { name: "mshikaki", price: 2000 },
    { name: "chips kavu", price: 3000 },
    { name: "kuku (¼)", price: 4000 },
    { name: "chips yai (mayai 4)", price: 5000 },
    { name: "makange (nyama)", price: 10000 },
    { name: "changamoto (nyama)", price: 10000 },
    { name: "makange (kuku)", price: 12000 },
    { name: "changamoto (kuku)", price: 12000 },
    { name: "makange (samaki)", price: 15000 },
    { name: "changamoto (samaki)", price: 15000 }
  ],

  NYAMA_CHOMA: [
    { name: "mshikaki", price: 3000 },
    { name: "ng'ombe (foil)", price: 5000 },
    { name: "mbuzi (foil)", price: 5000 },
    { name: "sekela", price: 5000 },
    { name: "lemon", price: 5000 },
    { name: "ng'ombe (posheni)", price: 10000 },
    { name: "mbuzi (posheni)", price: 10000 },
    { name: "samaki", price: 15000 }
  ],

  DRINKS: [
    { name: "maji (1 litre)", price: 1000 },
    { name: "maji (1.6 litres)", price: 2000 },
    { name: "soda", price: 2000 },
    { name: "live juice", price: 5000 },
    { name: "mango passion juice", price: 5000 },
    { name: "tende juice", price: 5000 }
  ]
};

export const sortByPrice = (items: MenuItem[]) => {
  return [...items].sort((a, b) => a.price - b.price);
};
