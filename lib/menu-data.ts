/**
 * Structured menu data — extracted from the printed menu page scans in
 * public/images/menu-*.png (May 2026).
 *
 * This is the source of truth until Sanity is wired up (Day 3). At that
 * point this file gets imported as a one-time seed and then deleted.
 *
 * Section order in the exported array IS the display order on /menu and
 * the homepage sticky nav. Reorder by moving section objects up or down.
 *
 * Prices in CAD. Verify with the client before launch — printed-menu OCR
 * is reliable for 90% of items but should be checked.
 */

export type DietaryTag =
  | "halal"
  | "vegetarian"
  | "vegan"
  | "vegan-on-request"
  | "gluten-free-on-request"
  | "contains-dairy"
  | "contains-nuts";

export type MenuItem = {
  name: string;
  description?: string;
  price: number;
  /** For multi-tier items (e.g. half / full bowl) */
  altPrice?: { label: string; price: number };
  dietary?: DietaryTag[];
  /** Marks signature dishes for Featured-on-homepage selection */
  featured?: boolean;
  /** Per-item photograph; rendered as a card image on /menu. */
  image?: string;
  /**
   * Renders this item as a compact name+price row instead of a full card.
   * Used for beverages where photos would feel cluttered.
   */
  compact?: boolean;
};

export type MenuSection = {
  slug: string;
  name: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    slug: "kebabs",
    name: "Kebabs",
    description:
      "Charcoal-grilled skewers and platters — our signature category.",
    imageSrc: "/images/photo-kebab-platter.jpg",
    imageAlt:
      "A mixed kebab platter at Meet and Eat featuring Adana, lamb shish, chicken shish, and beef doner kebabs with rice, fresh salad, and grilled peppers",
    items: [
      { name: "Beef Doner Kebab", description: "Thinly sliced marinated beef, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 23, featured: true, image: "/images/menu/Kebabs/Doner.jpg" },
      { name: "Iskender Kebab", description: "Marinated beef slices over pita bread, topped with tomato sauce and melted butter, served with yogurt.", price: 24, featured: true, image: "/images/menu/Kebabs/Iskender.jpg" },
      { name: "Chicken Shish", description: "Grilled marinated chicken skewers, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 22, image: "/images/menu/Kebabs/Chicken.jpg" },
      { name: "Chicken Wings", description: "Grilled marinated chicken wings, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 19, image: "/images/menu/Kebabs/Wings.jpg" },
      { name: "Adana Kebab", description: "Spicy minced beef kebab, grilled and served with rice, onion, and sour red cabbage salad, and flatbread.", price: 23, featured: true, image: "/images/menu/Kebabs/Adana.jpg" },
      { name: "Beyti Kebab", description: "Grilled ground meat wrapped in flatbread, topped with tomato sauce and butter, served with yogurt.", price: 25, image: "/images/menu/Kebabs/Beyti.jpg" },
      { name: "Kofte (Meatballs)", description: "Seasoned minced meat patties, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 20, image: "/images/menu/Kebabs/Kofte.jpg" },
      { name: "Ali Nazik", description: "Tender lamb sauteed in butter and tomato sauce, served over a roasted eggplant puree with garlic yogurt.", price: 27, image: "/images/menu/Kebabs/Alinazik.jpg" },
      { name: "Mixed Kebab Platter", description: "A selection of Adana Kebab, Chicken Shish, and a half portion of Beef Döner, served with rice, onion, salad, and warm flatbread.", price: 35, image: "/images/menu/Kebabs/Mixed Kebab Platter 2026.png" },
      { name: "Mixed Kebab Platter for 2", description: "Generous platter featuring 1 Chicken Shish, 2 Adana skewers, 2 pcs Chicken Wings, 2 pcs Köfte, and a half portion of Beef Döner. Served with rice, onion, salad, and 2 warm flatbreads.", price: 55, image: "/images/menu/Kebabs/Mixed Kebab Platter for 2 2026.png" },
      { name: "Mixed Kebab Platter for Family", description: "Generous platter featuring 1 Chicken Shish, 4 Adana skewers, 4 pcs Chicken Wings, 4 pcs Köfte, and 1 portion of Beef Döner. Served with rice, onion, salad, and 2 warm flatbreads.", price: 85, image: "/images/menu/Kebabs/Mixed Kebab Platter for Family 2026.png" },
    ],
  },
  {
    slug: "traditional",
    name: "Traditional Dishes & Wraps",
    description:
      "Slow-cooked Turkish casseroles, lamb chops, and house-made wraps.",
    imageSrc: "/images/photo-lamb-platter.jpg",
    imageAlt:
      "A traditional lamb platter at Meet and Eat featuring grilled lamb chops, lamb shish, and seasoned lamb cuts with rice, salads, and grilled tomatoes",
    items: [
      { name: "Lamb Shank", description: "Slow-cooked lamb shank, seasoned with spices and topped with mozzarella, served with rice and flatbread.", price: 25, featured: true, image: "/images/menu/Traditional Dishes/Lamb Shank.jpg" },
      { name: "Lamb Chops", description: "Grilled, juicy lamb chops served with rice, onion and sour red cabbage salad, and flatbread.", price: 39, featured: true, image: "/images/menu/Kebabs/Lamb Chop.jpg" },
      { name: "Chicken Casserole", description: "Slow-cooked traditional Turkish casserole with chicken, tomatoes, peppers, onions, and spices. Served with rice and flatbread.", price: 24, image: "/images/menu/Traditional Dishes/Chicken Guvec.png" },
      { name: "Beef Casserole", description: "Slow-cooked traditional Turkish casserole with beef, tomatoes, peppers, onions, and spices. Served with rice and flatbread.", price: 27, image: "/images/menu/Traditional Dishes/Beef Guvec.png" },
      { name: "Kofte for Kids", description: "Crafted with a blend of homemade meat, onions, and special spices. Served with French fries. Substitution: 1 Adana skewer, 1 lamb skewer, 1 chicken skewer, or 1 wing skewer.", price: 12, image: "/images/menu/Appetizer/kids kofte.jpg" },
      { name: "Chicken Shish Wrap", description: "Grilled marinated chicken skewers, lettuce, onion, and tomato wrapped in flatbread.", price: 14, image: "/images/menu/Wraps/Chicken Wrap.jpg" },
      { name: "Beef Doner Wrap", description: "Thinly sliced marinated beef doner, lettuce, onion, and tomato wrapped in flatbread.", price: 15, image: "/images/menu/Wraps/Doner Wrap.jpg" },
      { name: "Adana Wrap", description: "Minced beef kebab, lettuce, onion, and tomato wrapped in flatbread.", price: 15, image: "/images/menu/Wraps/Adana Wrap.jpg" },
    ],
  },
  {
    slug: "pides",
    name: "Pides",
    description:
      "Stone-oven Turkish flatbreads with savory toppings, baked to order.",
    imageSrc: "/images/photo-pide-board.jpg",
    imageAlt:
      "An assortment of stone-oven Turkish pides on a wooden board at Meet and Eat, topped with minced meat, diced beef, soujouk and mozzarella, and spinach and feta",
    items: [
      { name: "Lahmacun (XL 18\")", description: "Thin flatbread topped with a savory mixture of minced meat, vegetables, and spices, served with fresh parsley, sumac, onions, and lemon.", price: 20, featured: true, image: "/images/menu/Pides/Lahmacun.jpg" },
      { name: "Kiymali Pide", description: "Turkish flatbread topped with minced meat, onions, and aromatic spices, baked to perfection.", price: 20, image: "/images/menu/Pides/Ground Beef Pide.jpg" },
      { name: "Kusbasili Pide", description: "Flatbread topped with tender diced beef and aromatic spices, baked to perfection.", price: 23, image: "/images/menu/Pides/Kusbasili pide.jpg" },
      { name: "Doner Pide", description: "Flatbread filled with savory doner meat, baked to a golden finish.", price: 20, image: "/images/menu/Pides/Donerli pide.jpg" },
      { name: "Three-Section Meat Pide", description: "A rich and satisfying feast featuring a combination of minced meat, diced beef, and soujouk with mozzarella on pide.", price: 22, image: "/images/menu/Pides/Mix Meat Pide 2.png" },
      { name: "Soujouk and Mozzarella Pide", description: "Flatbread topped with savory sausage and melted mozzarella cheese, baked until golden.", price: 21, image: "/images/menu/Pides/Sucuklu pide.jpg" },
      { name: "Spinach & Feta Pide", description: "Flatbread topped with fresh spinach and feta cheese, enhanced with herbs and spices.", price: 17, dietary: ["vegetarian"], image: "/images/menu/Pides/Ispanakli Byz Peynirli.jpg" },
      { name: "Mozzarella Pide", description: "Flatbread topped with mozzarella cheese, baked until golden and crispy.", price: 17, dietary: ["vegetarian"], image: "/images/menu/Pides/Kasarli pide.jpg" },
    ],
  },
  {
    slug: "appetizers",
    name: "Appetizers & Salads",
    description:
      "Hot soups, fresh mezes, and seasonal salads to start the meal.",
    imageSrc: "/images/menu-appetizers-salads.png",
    imageAlt:
      "Meet and Eat appetizer menu — lentil soup, fries, cacik, ezme, eggplant puree, hummus, mix appetizer plate, and two seasonal salads (plain, chicken)",
    items: [
      { name: "Lentil Soup", description: "Hearty red lentil soup with onions, carrots, and spices, served with lemon and bread.", price: 8, altPrice: { label: "Half bowl", price: 5 }, image: "/images/menu/Soups/Corba.jpg" },
      { name: "Fries", description: "Crispy, golden French fries, perfectly seasoned and served hot.", price: 8, dietary: ["vegetarian"], image: "/images/menu/Appetizer/fries.jpg" },
      { name: "Cacik", description: "Yogurt with cucumber and garlic, seasoned with olive oil and mint.", price: 7, dietary: ["vegetarian", "contains-dairy"], image: "/images/menu/Appetizer/Cacik.jpg" },
      { name: "Ezme", description: "Finely chopped tomato, cucumber, and pepper with olive oil, pomegranate molasses, and red pepper flakes.", price: 7, dietary: ["vegan"], image: "/images/menu/Appetizer/Ezme.jpg" },
      { name: "Eggplant Puree", description: "Roasted eggplant blended with olive oil, garlic, and lemon for a smoky flavor.", price: 7, dietary: ["vegan"], image: "/images/menu/Appetizer/Eggplant pure.jpg" },
      { name: "Hummus", description: "Chickpeas blended with tahini, garlic, lemon juice, and olive oil for a smooth dip.", price: 7, dietary: ["vegan"], image: "/images/menu/Appetizer/humus.jpg" },
      { name: "Mix Appetizer", description: "A rich selection of five separate plates featuring ezme, eggplant puree, cacik, and hummus.", price: 19, dietary: ["vegetarian"], featured: true, image: "/images/menu/Appetizer/Mix meze 4.png" },
      { name: "Seasonal Salad", description: "A refreshing salad of lettuce, tomatoes, cucumbers, carrots, and parsley with a light dressing.", price: 9, dietary: ["vegan"], image: "/images/menu/Salads/Seasional Salad.jpg" },
      { name: "Grilled Chicken Salad", description: "Grilled chicken breast on a fresh seasonal salad with a light, refreshing dressing.", price: 14, image: "/images/menu/Salads/Chicken Salad.jpg" },
    ],
  },
  {
    slug: "desserts-beverages",
    name: "Desserts & Beverages",
    description:
      "Traditional Turkish sweets and drinks to finish the meal.",
    imageSrc: "/images/menu-desserts-beverages.png",
    imageAlt:
      "Meet and Eat dessert and beverage menu — kunefe and rice pudding desserts, plus Coke products, Sprite, Nestea, ginger ale, ayran, Uludag gazoz, juice, red turnip juice, mineral water, and Turkish tea",
    items: [
      { name: "Kunefe", description: "Shredded phyllo pastry layered with sweet cheese, baked until golden, soaked in syrup.", price: 11, dietary: ["vegetarian", "contains-dairy"], featured: true, image: "/images/menu/Deserts/Kunefe 2026.png" },
      { name: "Rice Pudding", description: "Traditional Turkish rice pudding, oven-baked with a caramelized top.", price: 5, dietary: ["vegetarian", "contains-dairy"], image: "/images/menu/Deserts/Sutlac 2026.png" },
      { name: "Coke", price: 3, compact: true },
      { name: "Coke Diet", price: 3, compact: true },
      { name: "Coke Zero", price: 3, compact: true },
      { name: "Sprite", price: 3, compact: true },
      { name: "Nestea", price: 3, compact: true },
      { name: "Ginger Ale", price: 3, compact: true },
      { name: "Ayran", description: "Traditional Turkish yogurt drink — savory, lightly salted.", price: 4, dietary: ["vegetarian", "contains-dairy"], compact: true },
      { name: "Uludag Gazoz", description: "Classic Turkish lemon-lime soft drink.", price: 3, compact: true },
      { name: "Juice", price: 3, compact: true },
      { name: "Red Turnip Juice", description: "Tangy fermented turnip juice (şalgam) — a Turkish staple.", price: 3, compact: true },
      { name: "Mineral Water", price: 3, compact: true },
      { name: "Turkish Tea", description: "Black tea served in a tulip-shaped glass, the traditional Turkish way.", price: 2, compact: true },
    ],
  },
];
