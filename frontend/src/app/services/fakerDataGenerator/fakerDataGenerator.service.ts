import {Injectable} from '@angular/core';
import * as faker from 'faker';

@Injectable()
export class fakerDataGenerator {

    /**
     * Use faker to generate metadata for the inputs
     * @param {type} 
     * the type of input to generate metadata for
     */
    getFakerData(type) {
        switch (type) {
            case 'string':
                return faker.lorem.sentence();
            case 'sentence':
                return faker.lorem.sentence();
            case 'image':
                let width = Math.floor(Math.random() * (500 - 300 + 1) + 300);
                let height = Math.floor(Math.random() * (300 - 250 + 1) + 300);
                return faker.image.imageUrl(width, height);
            case 'avatar':
                return faker.image.avatar();
            case 'words':
                return faker.lorem.words();
            case 'phone':
                return faker.phone.phoneNumber();
            case 'name':
                return faker.name.findName();
            default:
                return null;
        }
    }
}