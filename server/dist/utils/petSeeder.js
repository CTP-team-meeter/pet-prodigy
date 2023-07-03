"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.seedPet = (model) => __awaiter(void 0, void 0, void 0, function* () {
    if (model.collection.collectionName === 'catbreeds') {
        const res = yield fetch('https://api.thecatapi.com/v1/breeds', {
            headers: {
                'x-api-key': process.env.VITE_CAT_API_KEY || '',
            },
        });
        const data = yield res.json();
        model.collection.drop();
        data.forEach((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const imgRes = yield fetch(`https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${cat.id}`, {
                headers: {
                    'x-api-key': process.env.VITE_CAT_API_KEY || '',
                },
            });
            const images = yield imgRes.json();
            const newCat = new model({
                name: cat.name,
                alt_names: cat.alt_names,
                imageURLs: images,
                origin: cat.origin,
                country_code: cat.country_code,
                life_span: cat.life_span,
                temperament: cat.temperament,
                wikipedia_url: cat.wikipedia_url,
                weight: cat.weight,
                height: cat.height,
                adaptability: cat.adaptability,
                affection_level: cat.affection_level,
                child_friendly: cat.child_friendly,
                dog_friendly: cat.dog_friendly,
                grooming: cat.grooming,
                intelligence: cat.intelligence,
                health_issues: cat.health_issues,
                social_needs: cat.social_needs,
                stranger_friendly: cat.stranger_friendly,
                vocalisation: cat.vocalisation,
                shedding_level: cat.shedding_level,
                energy_level: cat.energy_level,
                hypoallergenic: cat.hypoallergenic,
                description: cat.description,
            });
            newCat.save((err, res) => {
                console.log(err);
                console.log(res);
                if (!err) {
                    console.log('Seeding completed');
                }
            });
        }));
    }
    else if (model.collection.collectionName === 'dogbreeds') {
        const res2 = yield fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
                'x-api-key': process.env.DOG_API_KEY || '',
            },
        });
        const data2 = yield res2.json();
        data2.forEach((dog) => __awaiter(void 0, void 0, void 0, function* () {
            const imgRes = yield fetch(`https://api.thedogapi.com/v1/images/search?limit=5&breed_ids=${dog.id}`, {
                headers: {
                    'x-api-key': `${process.env.VITE_DOG_API_KEY}` || '',
                },
            });
            const images = yield imgRes.json();
            const newDog = new model({
                name: dog.name,
                alt_names: dog.alt_names,
                imageURLs: images,
                origin: dog.origin,
                country_code: dog.country_code,
                life_span: dog.life_span,
                temperament: dog.temperament,
            });
            newDog.save((err, res) => {
                console.log(err);
                console.log(res);
                if (!err) {
                    console.log('Seeding completed');
                }
            });
        }));
    }
});
