import db from './models/index.mjs';

const createNewTrip = async () => {
  try {
    const trip = await db.Trip.create({ name: process.argv[3] });
    console.log('success!');
    console.log(trip);
  } catch (error) {
    console.log(error);
  }
};

const createNewAttraction = async () => {
  try {
    const trip = await db.Trip.findOne({ where: { name: process.argv[3] } });
    const attraction = await db.Attraction.create({
      name: process.argv[4],
      tripId: trip.id,
    });
    console.log('success!');
    console.log('Trip ID: ', trip.id);
    console.log(attraction);
  } catch (error) {
    console.log(error);
  }
};

const getTripItinerary = async () => {
  try {
    const trip = await db.Trip.findOne({ where: { name: process.argv[3] } });
    const tripAttractions = await db.Attraction.findAll({ where: { tripId: trip.id } });
    console.log(tripAttractions.map((attraction) => attraction.name));
  } catch (error) {
    console.log(error);
  }
};

const createNewCategory = async () => {
  try {
    const category = await db.Category.create({ name: process.argv[3] });
    console.log('success!');
    console.log(category);
  } catch (error) {
    console.log(error);
  }
};

const createNewAttractionWithCategory = async () => {
  try {
    const trip = await db.Trip.findOne({ where: { name: process.argv[3] } });
    const category = await db.Category.findOne({ where: { name: process.argv[5] } });
    const attraction = await db.Attraction.create({
      name: process.argv[4],
      tripId: trip.id,
      categoryId: category.id,
    });
    console.log('success!');
    console.log('Trip ID: ', trip.id);
    console.log('Category ID: ', category.id);
    console.log(attraction);
  } catch (error) {
    console.log(error);
  }
};

const getAttractionsInTripInCategory = async () => {
  try {
    const trip = await db.Trip.findOne({ where: { name: process.argv[3] } });
    const category = await db.Category.findOne({ where: { name: process.argv[4] } });
    const tripAttractions = await db.Attraction.findAll({
      where: {
        tripId: trip.id,
        categoryId: category.id,
      },
    });
    console.log(tripAttractions.map((attraction) => attraction.name));
  } catch (error) {
    console.log(error);
  }
};

const getAllAttractionsInCategory = async () => {
  try {
    const category = await db.Category.findOne({ where: { name: process.argv[3] } });
    const tripAttractions = await db.Attraction.findAll({ where: { categoryId: category.id } });
    console.log(tripAttractions.map((attraction) => attraction.name));
  } catch (error) {
    console.log(error);
  }
};

switch (process.argv.length) {
  case 4:
    if (process.argv[2] === 'create') createNewTrip();
    else if (process.argv[2] === 'trip') getTripItinerary();
    else if (process.argv[2] === 'add-category') createNewCategory();
    else if (process.argv[2] === 'category-attractions') getAllAttractionsInCategory();
    break;
  case 5:
    if (process.argv[2] === 'add-attrac') createNewAttraction();
    else if (process.argv[2] === 'category-trip') getAttractionsInTripInCategory();
    break;
  case 6:
    if (process.argv[2] === 'add-attrac') createNewAttractionWithCategory();
    break;
  default:
    break;
}
