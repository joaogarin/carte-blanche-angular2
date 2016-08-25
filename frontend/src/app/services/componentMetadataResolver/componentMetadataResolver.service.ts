import {Injectable} from '@angular/core';
import { metadataTypes } from './metaTypes.ts';
import * as faker from 'faker';

@Injectable()
export class ComponentMetadataResolver {

    shortStrings: Object = {
        types: ['name', 'text'],
        value: 'words',
    };

    longStrings: Object = {
        types: ['description'],
        value: 'sentence',
    };

    images: Object = {
        types: ['image'],
        value: 'image',
    };

    metaData = [this.shortStrings, this.longStrings, this.images];

    getMetadata(type) {
        //get the right metadata for this type
        let metaValue = this.metaData.filter((item: any) => {
            let types: Array<Object> = item.types;
            return types.indexOf(type) > -1;
        }).map((val: any) => {
            return val.value;
        })[0];

        return this.getFakerData(metaValue);
    }

    /**
     * Use faker to generate metadata for the inputs
     * @param {type} 
     * the type of input to generate metadata for
     */
    getFakerData(type) {
        switch (type) {
            case 'sentence':
                return faker.lorem.sentence();
            case 'image':
                let width = Math.floor(Math.random() * (500 - 300 + 1) + 300);
                let height = Math.floor(Math.random() * (300 - 250 + 1) + 300);
                return faker.image.imageUrl(width, height);
            case 'words':
                return faker.lorem.words();
            default:
                return null;
        }
    }
}