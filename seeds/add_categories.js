require('dotenv').config();

const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

const dbPassword = process.env.DATABASE_PASSWORD;
const dbUrl = process.env.DATABASE_URL.replace('<password>', dbPassword);

// Command to run the file: 'node seeds/add_categories.js'
// TODO STEPS TO PERFORM BEFORE EXECUTING THIS SEED FILE
// TODO 1. Comment All the Pre/Post Middlewares as they will make the server throw **ParallelSaveError**

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // This is to ensure the name uniqueness
    await Category.deleteMany({});

    console.log('Database Connected');

    await insertCategories(majorCategories);

    console.info('Collection Inserted Successfully\nBye!');
    process.exit(0);
  })
  .catch(console.error);

const insertCategories = async (categories, parentCategoryId = null) => {
  for (const categoryData of categories) {
    const data = {
      name: categoryData.name,
      image: categoryData.image,
    };

    const category = await Category.create(data);

    console.info(`Inserted ${category.name} successfully`);

    if (parentCategoryId) {
      const parentCategory = await Category.findById(parentCategoryId);
      parentCategory.subCategories.push(category._id);
      await parentCategory.save();
    }

    if (categoryData.subCategories && categoryData.subCategories.length > 0) {
      await insertCategories(categoryData.subCategories, category.id);
    }
  }
};

const majorCategories = [
  {
    name: 'Mobiles',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Mobile Phones',
        subCategories: [],
      },
      {
        name: 'Accessories',
        subCategories: [
          {
            name: 'Earphone',
            subCategories: [],
          },
          {
            name: 'Other Accessories',
            subCategories: [],
          },
          {
            name: 'Chargers',
            subCategories: [],
          },
          {
            name: 'Headphones',
            subCategories: [],
          },
          {
            name: 'Covers & Cases',
            subCategories: [],
          },
          {
            name: 'Power Banks',
            subCategories: [],
          },
          {
            name: 'Charging Cables',
            subCategories: [],
          },
          {
            name: 'Screens',
            subCategories: [],
          },
          {
            name: 'Mobile Stands',
            subCategories: [],
          },
          {
            name: 'Ring Lights',
            subCategories: [],
          },
          {
            name: 'Converters',
            subCategories: [],
          },
          {
            name: 'External Memory',
            subCategories: [],
          },
          {
            name: 'Selfie Sticks',
            subCategories: [],
          },
          {
            name: 'Screen Protectors',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Smart Watches',
        subCategories: [],
      },
      {
        name: 'Tablets',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Vehicles',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Cars',
        subCategories: [],
      },
      {
        name: 'Cars Accessories',
        subCategories: [],
      },
      {
        name: 'Spare Parts',
        subCategories: [],
      },
      {
        name: 'Buses, Vans & Trucks',
        subCategories: [],
      },
      {
        name: 'Rickshaw & Chingchi',
        subCategories: [],
      },
      {
        name: 'Tractors & Trailers',
        subCategories: [],
      },
      {
        name: 'Cars on Installments',
        subCategories: [],
      },
      {
        name: 'Other Vehicles',
        subCategories: [],
      },
      {
        name: 'Boats',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Property for Sale',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Land & Plots',
        subCategories: [],
      },
      {
        name: 'Houses',
        subCategories: [],
      },
      {
        name: 'Apartments & Flats',
        subCategories: [],
      },
      {
        name: 'Shops - Offices - Commercial Space',
        subCategories: [],
      },
      {
        name: 'Portions & Floors',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Property for Rent',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Houses for Rent',
        subCategories: [],
      },
      {
        name: 'Portions & Floors for Rent',
        subCategories: [],
      },
      {
        name: 'Apartments & Flats for Rent',
        subCategories: [],
      },
      {
        name: 'Shops - Offices - Commercial Space',
        subCategories: [],
      },
      {
        name: 'Rooms',
        subCategories: [],
      },
      {
        name: 'Vacation Rentals - Guest Houses',
        subCategories: [],
      },
      {
        name: 'Roommates & Paying Guests',
        subCategories: [],
      },
      {
        name: 'Land & Plots',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Electronics & Home',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Computers & Accessories',
        subCategories: [],
      },

      {
        name: 'TV - Video - Audio',
        subCategories: [],
      },
      {
        name: 'Other Home Appliances',
        subCategories: [],
      },
      {
        name: 'Generators, UPS & Power Solutions',
        subCategories: [],
      },
      {
        name: 'Kitchen Appliances',
        subCategories: [],
      },
      {
        name: 'AC & Coolers',
        subCategories: [],
      },
      {
        name: 'Cameras & Accessories',
        subCategories: [],
      },

      {
        name: 'Fridges & Freezers',
        subCategories: [],
      },
      {
        name: 'Games & Entertainment',
        subCategories: [],
      },
      {
        name: 'Washing Machines & Dryers',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Bikes',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Motorcycles',
        subCategories: [
          {
            name: 'Standard',
            subCategories: [],
          },
          {
            name: 'Others',
            subCategories: [],
          },
          {
            name: 'Sports & Heavy Bikes',
            subCategories: [],
          },
          {
            name: 'Electric Bikes',
            subCategories: [],
          },
          {
            name: 'Cafe Racers',
            subCategories: [],
          },
          {
            name: 'Trail',
            subCategories: [],
          },
          {
            name: 'Cruisers',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Bicycles',
        subCategories: [
          {
            name: 'Other Bicycles',
            subCategories: [],
          },
          {
            name: 'Road Bikes',
            subCategories: [],
          },
          {
            name: 'Mountain Bikes',
            subCategories: [],
          },
          {
            name: 'BMW Bikes',
            subCategories: [],
          },
          {
            name: 'Hybrid Bikes',
            subCategories: [],
          },
          {
            name: 'Folding Bikes',
            subCategories: [],
          },
          {
            name: 'Electric Bicycles',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Spare Parts',
        subCategories: [
          {
            name: 'Other Spare Parts',
            subCategories: [],
          },
          {
            name: 'Fuel Tanks',
            subCategories: [],
          },
          {
            name: 'Tyres & Tubes',
            subCategories: [],
          },
          {
            name: 'Exhausts',
            subCategories: [],
          },
          {
            name: 'Carburetors',
            subCategories: [],
          },
          {
            name: 'Lighting',
            subCategories: [],
          },
          {
            name: 'Seats',
            subCategories: [],
          },
          {
            name: 'Cylinders',
            subCategories: [],
          },
          {
            name: 'Chain, Covers & Sprockets',
            subCategories: [],
          },
          {
            name: 'Speedometers',
            subCategories: [],
          },
          {
            name: 'Side Mirrors',
            subCategories: [],
          },
          {
            name: 'Handle Bars & Grips',
            subCategories: [],
          },
          {
            name: 'Motorcycle Batteries',
            subCategories: [],
          },
          {
            name: 'Horns',
            subCategories: [],
          },
          {
            name: 'Stands',
            subCategories: [],
          },
          {
            name: 'Electronics',
            subCategories: [],
          },
          {
            name: 'Brakes',
            subCategories: [],
          },
          {
            name: 'Air Filters',
            subCategories: [],
          },
          {
            name: 'Plugs',
            subCategories: [],
          },
          {
            name: 'Switches',
            subCategories: [],
          },
          {
            name: 'Levers',
            subCategories: [],
          },
          {
            name: 'Clutches',
            subCategories: [],
          },
          {
            name: 'Pistons',
            subCategories: [],
          },
          {
            name: 'Bearings',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Bikes Accessories',
        subCategories: [
          {
            name: 'Other Bike Accessories',
            subCategories: [],
          },

          {
            name: 'Helmets',
            subCategories: [],
          },
          {
            name: 'Bike Covers',
            subCategories: [],
          },
          {
            name: 'Tail Boxes',
            subCategories: [],
          },
          {
            name: 'Safe Guards',
            subCategories: [],
          },
          {
            name: 'Bike Jackets',
            subCategories: [],
          },
          {
            name: 'Bicycle Air Pumps',
            subCategories: [],
          },
          {
            name: 'Bike Gloves',
            subCategories: [],
          },
          {
            name: 'Bike Locks',
            subCategories: [],
          },
          {
            name: 'Oils / Lubricants',
            subCategories: [],
          },
        ],
      },

      {
        name: 'ATV & Quads',
        subCategories: [],
      },
      {
        name: 'Scooters',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Business, Industrial & Agriculture',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Other Business & Industry',
        subCategories: [],
      },
      {
        name: 'Food & Restaurants',
        subCategories: [
          {
            name: 'Other Restaurant Equipments',
            subCategories: [],
          },
          {
            name: 'Food Display Counters',
            subCategories: [],
          },
          {
            name: 'Food Stalls',
            subCategories: [],
          },
          {
            name: 'Ovens & Tandoor',
            subCategories: [],
          },
          {
            name: 'Fryers',
            subCategories: [],
          },
          {
            name: 'Chillers',
            subCategories: [],
          },
          {
            name: 'Tables & Platforms',
            subCategories: [],
          },
          {
            name: 'Baking Equipments',
            subCategories: [],
          },
          {
            name: 'Ice Cream Machines',
            subCategories: [],
          },
          {
            name: 'Fruits & Vegetable Machines',
            subCategories: [],
          },
          {
            name: 'Delivery Bags',
            subCategories: [],
          },
          {
            name: 'Crockery & Cutlery',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Medical & Pharma',
        subCategories: [
          {
            name: 'Other Medical Supplies',
            subCategories: [],
          },
          {
            name: 'Patient MEds',
            subCategories: [],
          },
          {
            name: 'Wheelchairs',
            subCategories: [],
          },
          {
            name: 'Ultrasound Machines',
            subCategories: [],
          },
          {
            name: 'Oxygen Concentrators',
            subCategories: [],
          },
          {
            name: 'X-ray Machines',
            subCategories: [],
          },
          {
            name: 'Breast Pumps',
            subCategories: [],
          },
          {
            name: 'Blood Pressure Monitors',
            subCategories: [],
          },
          {
            name: 'Surgical Instruments',
            subCategories: [],
          },
          {
            name: 'Medicines',
            subCategories: [],
          },
          {
            name: 'Nebulizers',
            subCategories: [],
          },
          {
            name: 'Microscopes',
            subCategories: [],
          },
          {
            name: 'Glucometers',
            subCategories: [],
          },
          {
            name: 'Walkers',
            subCategories: [],
          },
          {
            name: 'Thermometers',
            subCategories: [],
          },
          {
            name: 'Hearing Aids',
            subCategories: [],
          },
          {
            name: 'Commode Chairs',
            subCategories: [],
          },
          {
            name: 'Pulse Oximeters',
            subCategories: [],
          },
          {
            name: 'Surgical Gloves',
            subCategories: [],
          },
          {
            name: 'Lighting - Medical',
            subCategories: [],
          },
          {
            name: 'Medical Scrubs',
            subCategories: [],
          },
          {
            name: 'Surgical Masks',
            subCategories: [],
          },
          {
            name: 'Sanitizers',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Trade & Industrial Machinery',
        subCategories: [
          {
            name: 'Other Business & Industrial Machines',
            subCategories: [],
          },
          {
            name: 'Sewing Machines',
            subCategories: [],
          },
          {
            name: 'Printing Machines',
            subCategories: [],
          },
          {
            name: 'Woodworking Machines',
            subCategories: [],
          },
          {
            name: 'Currency Counting Machines',
            subCategories: [],
          },
          {
            name: 'Molding Machines',
            subCategories: [],
          },
          {
            name: 'Air Compressors',
            subCategories: [],
          },
          {
            name: 'Welding Equipment',
            subCategories: [],
          },
          {
            name: 'Packaging Machines',
            subCategories: [],
          },
          {
            name: 'Lathe Machines',
            subCategories: [],
          },
          {
            name: 'Textile Machinery',
            subCategories: [],
          },
          {
            name: 'Industry Laser Machines',
            subCategories: [],
          },
          {
            name: 'Sealing Machines',
            subCategories: [],
          },
          {
            name: 'Paper Machines',
            subCategories: [],
          },
          {
            name: 'Plastic & Rubber Processing Machines',
            subCategories: [],
          },
          {
            name: 'Embroidery Machines',
            subCategories: [],
          },
          {
            name: 'Liquid Filling Machines',
            subCategories: [],
          },
          {
            name: 'Knitting Machines',
            subCategories: [],
          },
          {
            name: 'Marking Machines',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Business for Sale',
        subCategories: [
          {
            name: 'Other Business',
            subCategories: [],
          },
          {
            name: 'Grocery Stores',
            subCategories: [],
          },
          {
            name: 'Beauty Salons',
            subCategories: [],
          },
          {
            name: 'Hotels & Restaurants',
            subCategories: [],
          },
          {
            name: 'Mobile Shops',
            subCategories: [],
          },
          {
            name: 'Water Plants',
            subCategories: [],
          },
          {
            name: 'Pharmacies',
            subCategories: [],
          },
          {
            name: 'Snooker Clubs',
            subCategories: [],
          },
          {
            name: 'Auto Part Shops',
            subCategories: [],
          },
          {
            name: 'Cosmetic & Jewelery Shops',
            subCategories: [],
          },
          {
            name: 'Franchises',
            subCategories: [],
          },
          {
            name: 'Clinics',
            subCategories: [],
          },
          {
            name: 'Gyms',
            subCategories: [],
          },
          {
            name: 'Gift & Toy Shops',
            subCategories: [],
          },
          {
            name: 'Petrol Pumps',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Construction & Heavy Machinery',
        subCategories: [
          {
            name: 'Construction Material',
            subCategories: [],
          },
          {
            name: 'Other Heavy Equipments',
            subCategories: [],
          },
          {
            name: 'Drill Machines',
            subCategories: [],
          },
          {
            name: 'Water Pumps',
            subCategories: [],
          },
          {
            name: 'Pavers',
            subCategories: [],
          },
          {
            name: 'Air Compressors',
            subCategories: [],
          },
          {
            name: 'Concrete Mixers',
            subCategories: [],
          },
          {
            name: 'Loaders',
            subCategories: [],
          },
          {
            name: 'Construction Liters',
            subCategories: [],
          },
          {
            name: 'Motor Graders',
            subCategories: [],
          },
          {
            name: 'Excavators',
            subCategories: [],
          },
          {
            name: 'Cranes',
            subCategories: [],
          },
          {
            name: 'Concrete Clutters',
            subCategories: [],
          },
          {
            name: 'Compactors',
            subCategories: [],
          },
          {
            name: 'Road Roller',
            subCategories: [],
          },
          {
            name: 'Concrete Grinders',
            subCategories: [],
          },
          {
            name: 'Dump Truck',
            subCategories: [],
          },
          {
            name: 'Bulldozers',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Agriculture',
        subCategories: [
          {
            name: 'Farm, Machinery & Equipment',
            subCategories: [],
          },
          {
            name: 'Other Agriculture',
            subCategories: [],
          },
          {
            name: 'Plants & Trees',
            subCategories: [],
          },
          {
            name: 'Seeds',
            subCategories: [],
          },
          {
            name: 'Silage',
            subCategories: [],
          },
          {
            name: 'Crops',
            subCategories: [],
          },
          {
            name: 'Pesticides & Fertilizers',
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Services',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Other Services',
        subCategories: [],
      },
      {
        name: 'Tuitions & Academies',
        subCategories: [],
      },
      {
        name: 'Car Rentals',
        subCategories: [],
      },
      {
        name: 'Home & Office Repair',
        subCategories: [
          {
            name: 'Pest Control',
            subCategories: [],
          },
          {
            name: 'Other Repair Services',
            subCategories: [],
          },
          {
            name: 'Carpenters',
            subCategories: [],
          },
          {
            name: 'Electricians',
            subCategories: [],
          },
          {
            name: 'Painters',
            subCategories: [],
          },
          {
            name: 'Water Tank Cleaning',
            subCategories: [],
          },
          {
            name: 'Plumbers',
            subCategories: [],
          },
          {
            name: 'AC Services',
            subCategories: [],
          },
          {
            name: 'Geyser Services',
            subCategories: [],
          },
          {
            name: 'Deep Cleaning',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Web Development',
        subCategories: [],
      },
      {
        name: 'Domestic Help',
        subCategories: [
          {
            name: 'Maids',
            subCategories: [],
          },

          {
            name: 'Other Domestic Help',
            subCategories: [],
          },

          {
            name: 'Cooks',
            subCategories: [],
          },
          {
            name: 'Babysitters',
            subCategories: [],
          },
          {
            name: 'Nursing Staff',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Travel & Visa',
        subCategories: [],
      },
      {
        name: 'Electronics & Computer Repair',
        subCategories: [],
      },
      {
        name: 'Movers & Packers',
        subCategories: [],
      },
      {
        name: 'Drivers & Taxi',
        subCategories: [
          {
            name: 'Pick & Drop',
            subCategories: [],
          },
          {
            name: 'Drivers',
            subCategories: [],
          },
          {
            name: 'Carpool',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Event Services',
        subCategories: [],
      },
      {
        name: 'Farm & Fresh Food',
        subCategories: [],
      },
      {
        name: 'Consultancy Services',
        subCategories: [],
      },
      {
        name: 'Construction Services',
        subCategories: [],
      },
      {
        name: 'Health & Beauty',
        subCategories: [
          {
            name: 'Health Services',
            subCategories: [],
          },
          {
            name: 'Beauty & Spa',
            subCategories: [],
          },
          {
            name: 'Fitness Trainers',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Video & Photography',
        subCategories: [],
      },
      {
        name: 'Camera Installation',
        subCategories: [],
      },
      {
        name: 'Renting Services',
        subCategories: [],
      },
      {
        name: 'Architecture & Interior Design',
        subCategories: [],
      },
      {
        name: 'Car Services',
        subCategories: [],
      },
      {
        name: 'Catering & Restaurant',
        subCategories: [],
      },
      {
        name: 'Tailor Services',
        subCategories: [],
      },
      {
        name: 'Insurance Services',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Jobs',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Content Writing',
        subCategories: [],
      },
      {
        name: 'Online',
        subCategories: [],
      },
      {
        name: 'Other Jobs',
        subCategories: [],
      },
      {
        name: 'Part Time',
        subCategories: [],
      },
      {
        name: 'Education',
        subCategories: [],
      },
      {
        name: 'Sales',
        subCategories: [],
      },
      {
        name: 'Marketing',
        subCategories: [],
      },
      {
        name: 'Customer Service',
        subCategories: [],
      },
      {
        name: 'Restaurants & Hospitality',
        subCategories: [],
      },
      {
        name: 'Domestic Staff',
        subCategories: [],
      },
      {
        name: 'Medical',
        subCategories: [],
      },
      {
        name: 'Accounting & Finance',
        subCategories: [],
      },
      {
        name: 'IT & Networking',
        subCategories: [],
      },
      {
        name: 'Graphic Design',
        subCategories: [],
      },
      {
        name: 'Delivery Riders',
        subCategories: [],
      },
      {
        name: 'Hotels & Tourism',
        subCategories: [],
      },
      {
        name: 'Manufacturing',
        subCategories: [],
      },
      {
        name: 'Clerical & Administration',
        subCategories: [],
      },
      {
        name: 'Human Resources',
        subCategories: [],
      },
      {
        name: 'Real Estate',
        subCategories: [],
      },
      {
        name: 'Engineering',
        subCategories: [],
      },
      {
        name: 'Security',
        subCategories: [],
      },
      {
        name: 'Advertising & PR',
        subCategories: [],
      },
      {
        name: 'Internship',
        subCategories: [],
      },
      {
        name: 'Architecture & Interior Design',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Animals',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Hens',
        subCategories: [],
      },
      {
        name: 'Parrots',
        subCategories: [],
      },
      {
        name: 'Cats',
        subCategories: [],
      },
      {
        name: 'Dogs',
        subCategories: [],
      },
      {
        name: 'Pet Food & Accessories',
        subCategories: [
          {
            name: 'Hen Cogs',
            subCategories: [],
          },
          {
            name: 'Birds Accessories',
            subCategories: [],
          },
          {
            name: 'Other Animal Food & Accessories',
            subCategories: [],
          },
          {
            name: 'Incubators',
            subCategories: [],
          },
          {
            name: 'Aquariums',
            subCategories: [],
          },
          {
            name: 'Dog Accessories',
            subCategories: [],
          },
          {
            name: 'Cat Accessories',
            subCategories: [],
          },
          {
            name: 'Cat Food',
            subCategories: [],
          },
          {
            name: 'Birds Food',
            subCategories: [],
          },
          {
            name: 'Brooders',
            subCategories: [],
          },
          {
            name: 'Dog Food',
            subCategories: [],
          },
          {
            name: 'Fish Food',
            subCategories: [],
          },
          {
            name: 'Medicines',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Pigeons',
        subCategories: [],
      },
      {
        name: 'Livestock',
        subCategories: [
          {
            name: 'Goats',
            subCategories: [],
          },
          {
            name: 'Cows',
            subCategories: [],
          },
          {
            name: 'Sheep',
            subCategories: [],
          },
          {
            name: 'Buffalo',
            subCategories: [],
          },
          {
            name: 'Others',
            subCategories: [],
          },
          {
            name: 'Bulls',
            subCategories: [],
          },
          {
            name: 'Camels',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Other Birds',
        subCategories: [],
      },
      {
        name: 'Fish',
        subCategories: [],
      },
      {
        name: 'Finches',
        subCategories: [],
      },
      {
        name: 'Rabbits',
        subCategories: [],
      },
      {
        name: 'Doves',
        subCategories: [],
      },
      {
        name: 'Fertile Eggs',
        subCategories: [],
      },
      {
        name: 'Ducks',
        subCategories: [],
      },
      {
        name: 'Peacocks',
        subCategories: [],
      },
      {
        name: 'Horses',
        subCategories: [],
      },
      {
        name: 'Other Animals',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Furniture & Home Decor',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Sofa & Chairs',
        subCategories: [
          {
            name: 'Sofas',
            subCategories: [],
          },
          {
            name: 'Chairs',
            subCategories: [],
          },
          {
            name: 'Sofa Beds',
            subCategories: [],
          },
          {
            name: 'Sofa Covers',
            subCategories: [],
          },
          {
            name: 'Cushions',
            subCategories: [],
          },
          {
            name: 'Recliners',
            subCategories: [],
          },
          {
            name: 'Bean Bags',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Beds & Wardrobes',
        subCategories: [
          {
            name: 'Beds',
            subCategories: [],
          },
          {
            name: 'Wardrobes',
            subCategories: [],
          },
          {
            name: 'Bed Sheets',
            subCategories: [],
          },
          {
            name: 'Mattresses',
            subCategories: [],
          },
          {
            name: 'Other Bedding Accessories',
            subCategories: [],
          },
          {
            name: 'Blankets & Comforters',
            subCategories: [],
          },
          {
            name: 'Matters Covers',
            subCategories: [],
          },
          {
            name: 'Pillows & Cases',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Other Household Items',
        subCategories: [],
      },
      {
        name: 'Tables & Dining',
        subCategories: [],
      },
      {
        name: 'Home Decoration',
        subCategories: [
          {
            name: 'Other Decor Items',
            subCategories: [],
          },
          {
            name: 'Wall Hangings',
            subCategories: [],
          },
          {
            name: 'Lamps',
            subCategories: [],
          },
          {
            name: 'Wall Clocks',
            subCategories: [],
          },
          {
            name: 'Flooring',
            subCategories: [],
          },
          {
            name: 'Wall Lights',
            subCategories: [],
          },
          {
            name: 'Showpieces',
            subCategories: [],
          },
          {
            name: 'Handicrafts',
            subCategories: [],
          },
          {
            name: 'Artificial Flowers & Plants',
            subCategories: [],
          },
          {
            name: 'Vases',
            subCategories: [],
          },
          {
            name: 'Candies',
            subCategories: [],
          },
          {
            name: 'Chandeliers',
            subCategories: [],
          },
          {
            name: 'Decorative Trays',
            subCategories: [],
          },
          {
            name: 'Sculptures',
            subCategories: [],
          },
          {
            name: 'Indoor Fountains',
            subCategories: [],
          },
          {
            name: 'Tissue Boxes',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Office Furniture',
        subCategories: [
          {
            name: 'Other Office Furniture',
            subCategories: [],
          },
          {
            name: 'Office Tables',
            subCategories: [],
          },
          {
            name: 'Office Chairs',
            subCategories: [],
          },
          {
            name: 'Shelves & Racks',
            subCategories: [],
          },
          {
            name: 'Office Cabinets',
            subCategories: [],
          },
          {
            name: 'Office Sofas',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Garden & Outdoor',
        subCategories: [
          {
            name: 'Other Outdoor Items',
            subCategories: [],
          },
          {
            name: 'Artificial Grass',
            subCategories: [],
          },
          {
            name: 'Outdoor Chairs',
            subCategories: [],
          },
          {
            name: 'Tents & Shades',
            subCategories: [],
          },
          {
            name: 'Plants & Pots',
            subCategories: [],
          },
          {
            name: 'Outdoor Swings',
            subCategories: [],
          },
          {
            name: 'Outdoor Lights',
            subCategories: [],
          },
          {
            name: 'Outdoor Fountains',
            subCategories: [],
          },
          {
            name: 'Benches',
            subCategories: [],
          },
          {
            name: 'Outdoor Umbrellas',
            subCategories: [],
          },
          {
            name: 'Outdoor Tables',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Painting & Mirrors',
        subCategories: [
          {
            name: 'Paintings',
            subCategories: [],
          },
          {
            name: 'Mirrors',
            subCategories: [],
          },
          {
            name: 'Frames',
            subCategories: [],
          },
          {
            name: 'Painting Accessories',
            subCategories: [],
          },
          {
            name: 'Mirror Lights',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Curtains & Blinds',
        subCategories: [
          {
            name: 'Curtains',
            subCategories: [],
          },
          {
            name: 'Blinds',
            subCategories: [],
          },
          {
            name: 'Curtain Accessories',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Rugs & Carpets',
        subCategories: [
          {
            name: 'Carpets',
            subCategories: [],
          },
          {
            name: 'Rugs',
            subCategories: [],
          },
          {
            name: 'Mats',
            subCategories: [],
          },
          {
            name: 'Prayer Mats',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Bathroom Accessories',
        subCategories: [
          {
            name: 'Other Bathroom & Accessories',
            subCategories: [],
          },
          {
            name: 'Basins',
            subCategories: [],
          },
          {
            name: 'Vanity Units',
            subCategories: [],
          },
          {
            name: 'Toilets',
            subCategories: [],
          },
          {
            name: 'Bath Tubs',
            subCategories: [],
          },
          {
            name: 'Taps',
            subCategories: [],
          },
          {
            name: 'Bath Towels',
            subCategories: [],
          },
          {
            name: 'Shower Cabins',
            subCategories: [],
          },
          {
            name: 'Soap Dispensers',
            subCategories: [],
          },
          {
            name: 'Bath Cabinets',
            subCategories: [],
          },
        ],
      },
    ],
  },
  {
    name: 'Fashion & Beauty',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Clothes',
        subCategories: [
          {
            name: 'Eastern',
            subCategories: [],
          },
          {
            name: 'Western',
            subCategories: [],
          },

          {
            name: 'Kids Clothes',
            subCategories: [],
          },
          {
            name: 'Sports Clothes',
            subCategories: [],
          },
          {
            name: 'Hijabs & Abayas',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Wedding',
        subCategories: [
          {
            name: 'Bridals',
            subCategories: [],
          },
          {
            name: 'Formals',
            subCategories: [],
          },
          {
            name: 'Grooms',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Watches',
        subCategories: [],
      },

      {
        name: 'Footwear',
        subCategories: [],
      },

      {
        name: 'Skin & Hair',
        subCategories: [
          {
            name: 'Hair Care',
            subCategories: [],
          },
          {
            name: 'Skin Care',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Jewelery',
        subCategories: [],
      },

      {
        name: 'Bags',
        subCategories: [],
      },

      {
        name: 'Makeup',
        subCategories: [
          {
            name: 'Face',
            subCategories: [],
          },
          {
            name: 'Other Makeup Accessories',
            subCategories: [],
          },

          {
            name: 'Lips',
            subCategories: [],
          },
          {
            name: 'Eyes',
            subCategories: [],
          },
          {
            name: 'Nails',
            subCategories: [],
          },
          {
            name: 'Brushes',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Fashion Accessories',
        subCategories: [
          {
            name: 'Sunglasses',
            subCategories: [],
          },
          {
            name: 'Caps',
            subCategories: [],
          },

          {
            name: 'Belts',
            subCategories: [],
          },
          {
            name: 'Gloves',
            subCategories: [],
          },
          {
            name: 'Cuff links',
            subCategories: [],
          },

          {
            name: 'Socks',
            subCategories: [],
          },
          {
            name: 'Ties',
            subCategories: [],
          },
          {
            name: 'Scarves',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Fragrance',
        subCategories: [],
      },

      {
        name: 'Other Fashion',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Books, Sports & Hobbies',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Other Hobbies',
        subCategories: [],
      },

      {
        name: 'Gym & Fitness',
        subCategories: [],
      },
      {
        name: 'Sports Equipment',
        subCategories: [],
      },
      {
        name: 'Books & Magazines',
        subCategories: [
          {
            name: 'Books',
            subCategories: [],
          },
          {
            name: 'Stationery Items',
            subCategories: [],
          },

          {
            name: 'Calculators',
            subCategories: [],
          },
          {
            name: 'Magazines',
            subCategories: [],
          },

          {
            name: 'Dictionaries',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Musical Instruments',
        subCategories: [],
      },
    ],
  },
  {
    name: 'Kids',
    image:
      'https://storage.googleapis.com/olx-backend-400713.appspot.com/categories/profile-651746ec08a1b7cf9b481515.png?GoogleAccessId=firebase-adminsdk-ic6ep%40olx-backend-400713.iam.gserviceaccount.com&Expires=3253261336&Signature=UhtX353NqaeGw5B8cahR6RY5%2Bj211lafaeSzYm2gJm5YmFMYjZoaSRRB9Ikjl36pNoFcDBfObjUSFpsgoFknVK7WlVJOqkJEyGI1Ca2%2BEo%2B%2BuqMROKaONP1HNPghrVodSc%2BF7ccc841%2B4GBOrwBWsee5X%2FEvzbBst3StXTMWhHpTXXBNOg%2FmSx1tcdPonHAxUH1hVnfvYhkOihbBpDVF5ZewAIGtt3ieCPkWlbfdQUPYdXeD23K%2FBDZzkasC7Rw30oS%2Bo2XW6pLps%2FFrbtwNnwKzVXgE6nmhA7RBIG4U4bLQr84mCBDY1yFVIGLy4ggVSQTnE3MLchYjKxQg17NHqA%3D%3D',
    subCategories: [
      {
        name: 'Toys',
        subCategories: [],
      },
      {
        name: 'Kids Accessories',
        subCategories: [],
      },
      {
        name: 'Kids Vehicles',
        subCategories: [
          {
            name: 'Kids Cars',
            subCategories: [],
          },
          {
            name: 'Kids Cycles',
            subCategories: [],
          },
          {
            name: 'Kids Bikes',
            subCategories: [],
          },
          {
            name: 'Kids Scotties',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Kids Furniture',
        subCategories: [],
      },
      {
        name: 'Baby Gear',
        subCategories: [
          {
            name: 'Prams & Walkers',
            subCategories: [],
          },
          {
            name: 'Baby Cots',
            subCategories: [],
          },
          {
            name: 'Baby Carriers',
            subCategories: [],
          },
          {
            name: 'Car Seats',
            subCategories: [],
          },
          {
            name: 'Other Baby Gear',
            subCategories: [],
          },
          {
            name: 'Baby Swings',
            subCategories: [],
          },
          {
            name: 'High Chairs',
            subCategories: [],
          },
          {
            name: 'Baby Bouncers',
            subCategories: [],
          },
        ],
      },
      {
        name: 'Swings & Slides',
        subCategories: [],
      },
      {
        name: 'Kids Clothing',
        subCategories: [
          {
            name: 'Kids Clothes',
            subCategories: [],
          },

          {
            name: 'Kids Shoes',
            subCategories: [],
          },

          {
            name: 'Others',
            subCategories: [],
          },

          {
            name: 'Kids Costumes',
            subCategories: [],
          },

          {
            name: 'Kids Uniforms',
            subCategories: [],
          },
        ],
      },

      {
        name: 'Bath & Diapers',
        subCategories: [],
      },
    ],
  },
];
