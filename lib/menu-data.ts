/**
 * Structured menu data — extracted from the printed menu page scans in
 * public/images/menu-*.png (May 2026).
 *
 * This is the source of truth until Sanity is wired up (Day 3). At that
 * point this file gets imported as a one-time seed and then deleted.
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
    slug: "appetizers",
    name: "Appetizers & Salads",
    description:
      "Hot soups, fresh mezes, and seasonal salads to start the meal.",
    imageSrc: "/images/menu-appetizers-salads.png",
    imageAlt:
      "Meet and Eat appetizer menu — lentil soup, fries, cacik, ezme, eggplant puree, hummus, mix appetizer plate, kofte for kids, and three seasonal salads (plain, chicken, tuna)",
    items: [
      { name: "Lentil Soup", description: "Hearty red lentil soup with onions, carrots, and spices, served with lemon and bread.", price: 6, altPrice: { label: "Half bowl", price: 5 }, image: "/images/menu/Soups/Lentil Soup.jpg" },
      { name: "Fries", description: "Crispy, golden French fries, perfectly seasoned and served hot.", price: 8, dietary: ["vegetarian"], image: "/images/menu/Appetizer/37 fries.jpg" },
      { name: "Cacik", description: "Yogurt with cucumber and garlic, seasoned with olive oil and mint.", price: 6, dietary: ["vegetarian", "contains-dairy"] },
      { name: "Ezme", description: "Finely chopped tomato, cucumber, and pepper with olive oil, pomegranate molasses, and red pepper flakes.", price: 6, dietary: ["vegan"] },
      { name: "Eggplant Puree", description: "Roasted eggplant blended with olive oil, garlic, and lemon for a smoky flavor.", price: 6, dietary: ["vegan"] },
      { name: "Hummus", description: "Chickpeas blended with tahini, garlic, lemon juice, and olive oil for a smooth dip.", price: 6, dietary: ["vegan"] },
      { name: "Mix Appetizer", description: "A rich selection of five separate plates featuring ezme, eggplant puree, cacik, and hummus.", price: 19, dietary: ["vegetarian"], featured: true, image: "/images/menu/Appetizer/39 Mix Mezze.jpg" },
      { name: "Kofte for Kids", description: "Crafted with a blend of homemade meat, onions, and special spices. Served with French fries. Substitution: 1 Adana skewer, 1 lamb skewer, 1 chicken skewer, or 1 wing skewer.", price: 11 },
      { name: "Seasonal Salad", description: "A refreshing salad of lettuce, tomatoes, cucumbers, carrots, and parsley with a light dressing.", price: 9, dietary: ["vegan"], image: "/images/menu/Salads/Seasonal_Salad.jpg" },
      { name: "Chicken on Seasonal Salad", description: "Grilled chicken breast on a fresh seasonal salad with a light, refreshing dressing.", price: 12, image: "/images/menu/Salads/Chicken on Seasonal Salad.jpg" },
      { name: "Tuna on Seasonal Salad", description: "Tender tuna on a fresh seasonal salad with a light, refreshing dressing.", price: 12, image: "/images/menu/Salads/Tuna on Seasonal Salad.jpg" },
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
      { name: "Fettucini Alfredo", description: "Creamy fettuccine alfredo with tender chicken slices and sauteed mushrooms.", price: 17, image: "/images/menu/Pasta/14 Fettucini.jpg" },
      { name: "Stuffed Eggplant", description: "Eggplant stuffed with a savory mix of tomatoes, peppers, and onions, accompanied by rice and flatbread.", price: 17, image: "/images/menu/Traditional Dishes/35 Karni Yarik.jpg" },
      { name: "Lamb Shank", description: "Slow-cooked lamb shank, seasoned with spices and topped with mozzarella, served with rice and flatbread.", price: 22, featured: true, image: "/images/menu/Traditional Dishes/36 Lamb Shank.jpg" },
      { name: "Spaghetti Bolognese", description: "Classic spaghetti paired with a hearty tomato-based Bolognese sauce made from ground beef.", price: 17, image: "/images/menu/Pasta/13 Spagetti.jpg" },
      { name: "Chicken Casserole", description: "Slow-cooked traditional Turkish casserole with chicken, tomatoes, peppers, onions, and spices. Served with rice and flatbread.", price: 25, image: "/images/menu/Traditional Dishes/7 Chicken Casserole.png" },
      { name: "Beef Casserole", description: "Slow-cooked traditional Turkish casserole with beef, tomatoes, peppers, onions, and spices. Served with rice and flatbread.", price: 26, image: "/images/menu/Traditional Dishes/6 Beef Casserole.png" },
      { name: "Lamb Chops", description: "Grilled, juicy lamb chops served with rice, onion and sour red cabbage salad, and flatbread.", price: 39, featured: true, image: "/images/menu/Kebabs/1 Lamb Chop.jpg" },
      { name: "Chicken Saute", description: "Chicken, peppers, onions, and tomatoes sauteed in a 'pot' pan with spices. Served with rice and flatbread.", price: 25, image: "/images/menu/Traditional Dishes/5 Chicken Saute.png" },
      { name: "Beef Saute", description: "Beef, peppers, onions, and tomatoes sauteed in a 'pot' pan with spices. Served with rice and flatbread.", price: 26, image: "/images/menu/Traditional Dishes/4 Beef Saute.png" },
      { name: "Chicken Shish Wrap", description: "Grilled marinated chicken skewers, lettuce, onion, and tomato wrapped in flatbread.", price: 13, image: "/images/menu/Wraps/31 Chicken Wrap.jpg" },
      { name: "Beef Doner Wrap", description: "Thinly sliced marinated beef doner, lettuce, onion, and tomato wrapped in flatbread.", price: 14, image: "/images/menu/Wraps/32 Doner Wrap.jpg" },
      { name: "Adana Wrap", description: "Minced beef kebab, lettuce, onion, and tomato wrapped in flatbread.", price: 15, image: "/images/menu/Wraps/33 Adana Wrap.jpg" },
    ],
  },
  {
    slug: "kebabs",
    name: "Kebabs",
    description:
      "Charcoal-grilled skewers and platters — our signature category.",
    imageSrc: "/images/photo-kebab-platter.jpg",
    imageAlt:
      "A mixed kebab platter at Meet and Eat featuring Adana, lamb shish, chicken shish, and beef doner kebabs with rice, fresh salad, and grilled peppers",
    items: [
      { name: "Beef Doner Kebab", description: "Thinly sliced marinated beef, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 23, featured: true },
      { name: "Iskender Kebab", description: "Marinated beef slices over pita bread, topped with tomato sauce and melted butter, served with yogurt.", price: 23, featured: true },
      { name: "Chicken Shish", description: "Grilled marinated chicken skewers, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 22, image: "/images/menu/Kebabs/18 Chicken.jpg" },
      { name: "Adana Kebab", description: "Spicy minced beef kebab, grilled and served with rice, onion, and sour red cabbage salad, and flatbread.", price: 23, featured: true },
      { name: "Beyti Kebab", description: "Grilled ground meat wrapped in flatbread, topped with tomato sauce and butter, served with yogurt.", price: 25, image: "/images/menu/Kebabs/9 Beyti.jpg" },
      { name: "Kofte (Meatballs)", description: "Seasoned minced meat patties, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 20, image: "/images/menu/Kebabs/3 Kofte (Meetballs).jpg" },
      { name: "Lamb Shish", description: "Grilled marinated lamb skewers, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 27 },
      { name: "Ali Nazik", description: "Tender lamb sauteed in butter and tomato sauce, served over a roasted eggplant puree with garlic yogurt.", price: 27, image: "/images/menu/Kebabs/8 Alinazik.jpg" },
      { name: "Chicken Wings", description: "Grilled marinated chicken wings, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 18, image: "/images/menu/Kebabs/17 Wings.jpg" },
      { name: "Mixed Kebab Platter", description: "A selection of Adana, chicken, and lamb shish kebabs, served with rice, onion, and sour red cabbage salad, and flatbread.", price: 35, image: "/images/menu/Kebabs/25 Mix Kebab.jpg" },
      { name: "Mixed Kebab Platter for 2-3", description: "Generous platter offering a variety of grilled meats, including 1 lamb shish, 1 chicken shish, 1 Adana, 2 wings, 2 kofte, and beef doner. Served with rice, onion, and sour red cabbage salad, and 2 fresh flatbreads.", price: 55, image: "/images/menu/Kebabs/Mixed Kebab Flatter for 2-3.jpg" },
      { name: "Mixed Kebab for Family for 4-5", description: "A generous platter offering a variety of grilled meats, including 1 lamb shish, 1 chicken shish, 1 Adana, 2 wings, 4 kofte, and beef doner. Served with rice, onion, and sour red cabbage salad, and 2 fresh flatbreads.", price: 85 },
    ],
  },
  {
    slug: "pides",
    name: "Pides",
    description:
      "Stone-oven Turkish flatbreads with savory toppings, baked to order.",
    imageSrc: "/images/photo-pide-board.jpg",
    imageAlt:
      "A four-section Turkish pide on a wooden board at Meet and Eat featuring chicken, sausage and mozzarella, spinach and feta, and ground meat",
    items: [
      { name: "Lahmacun (XL 18\")", description: "Thin flatbread topped with a savory mixture of minced meat, vegetables, and spices, served with fresh parsley, sumac, onions, and lemon.", price: 19, featured: true },
      { name: "Kiymali Pide", description: "Turkish flatbread topped with minced meat, onions, and aromatic spices, baked to perfection.", price: 19, image: "/images/menu/Pides/19 Ground Beef Pide.jpg" },
      { name: "Mevlana Pide", description: "Flatbread topped with spiced minced beef, a mix of vegetables, and feta cheese.", price: 20, image: "/images/menu/Pides/20 Mevlana.jpg" },
      { name: "Kusbasili Pide", description: "Flatbread topped with tender diced beef and aromatic spices, baked to perfection.", price: 25, image: "/images/menu/Pides/21 Kusbasili pide.jpg" },
      { name: "Doner Pide", description: "Flatbread filled with savory doner meat, baked to a golden finish.", price: 20, image: "/images/menu/Pides/10 Donerli pide.jpg" },
      { name: "Chicken Pide", description: "Flatbread topped with marinated chicken and fresh vegetables, baked to a crisp.", price: 17, image: "/images/menu/Pides/11 Chicken Pide.jpg" },
      { name: "Four-Section Pide", description: "A flatbread baked to perfection, divided into four delicious sections: chicken, sausage and mozzarella, spinach and feta, and ground meat.", price: 21 },
      { name: "Mix Meat Pide", description: "A rich and satisfying feast featuring a combination of minced meat, diced beef, and soujouk with mozzarella on pide.", price: 22, image: "/images/menu/Pides/12 Mix Pide.jpg" },
      { name: "Soujouk and Mozzarella Pide", description: "Flatbread topped with savory sausage and melted mozzarella cheese, baked until golden.", price: 20 },
      { name: "Mushroom Pide", description: "Flatbread topped with mushrooms, peppers, cheese, and butter, baked to perfection.", price: 17, dietary: ["vegetarian"], image: "/images/menu/Pides/Mushroom Pide.jpg" },
      { name: "Spinach & Feta Pide", description: "Flatbread topped with fresh spinach and feta cheese, enhanced with herbs and spices.", price: 17, dietary: ["vegetarian"], image: "/images/menu/Pides/Spinach and Feta Cheese Pide.jpg" },
      { name: "Mozzarella Pide", description: "Flatbread topped with mozzarella cheese, baked until golden and crispy.", price: 17, dietary: ["vegetarian"], image: "/images/menu/Pides/29 Mozerella pide.jpg" },
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
      { name: "Kunefe", description: "Shredded phyllo pastry layered with sweet cheese, baked until golden, soaked in syrup.", price: 10, dietary: ["vegetarian", "contains-dairy"], featured: true, image: "/images/menu/Deserts/42 Kunefe.png" },
      { name: "Rice Pudding", description: "Traditional Turkish rice pudding, oven-baked with a caramelized top.", price: 5, dietary: ["vegetarian", "contains-dairy"], image: "/images/menu/Deserts/40 Sutlac.png" },
      { name: "Coke", price: 2.5, compact: true },
      { name: "Coke Diet", price: 2.5, compact: true },
      { name: "Coke Zero", price: 2.5, compact: true },
      { name: "Sprite", price: 2.5, compact: true },
      { name: "Nestea", price: 2.5, compact: true },
      { name: "Ginger Ale", price: 2.5, compact: true },
      { name: "Ayran", description: "Traditional Turkish yogurt drink — savory, lightly salted.", price: 3.5, dietary: ["vegetarian", "contains-dairy"], compact: true },
      { name: "Uludag Gazoz", description: "Classic Turkish lemon-lime soft drink.", price: 2.5, compact: true },
      { name: "Juice", price: 3, compact: true },
      { name: "Red Turnip Juice", description: "Tangy fermented turnip juice (şalgam) — a Turkish staple.", price: 3, compact: true },
      { name: "Mineral Water", price: 3, compact: true },
      { name: "Turkish Tea", description: "Black tea served in a tulip-shaped glass, the traditional Turkish way.", price: 2, compact: true },
    ],
  },
];
