import {Injectable} from '@angular/core';
import { metadataTypes } from './metaTypes.ts';
import * as faker from 'faker';

@Injectable()
export class ComponentMetadataResolver {

    shortStrings: Object = {
        types: ['name', 'text'],
        values: ['Carte Blanche', 'Carte Blanche Angular2', 'Meet the new Carte Blanche', 'Angular2 Plugin']
    };

    longStrings: Object = {
        types: ['description'],
        values: ['Carte Blanche is a new Angular2 plugin on top of webpack',
            'Carte Blanche Angular2 based on webpack the ultimate plugin',
            'Meet the new Carte Blanche plugin the new way of developing components',
        ]
    };

    images: Object = {
        types: ['image'],
        values: ['http://localhost/groovy/dist/images/dashboardbanner.jpg',
            'http://localhost/groovy/dist/images/bgprofile.jpg',
            'http://localhost/groovy/dist/images/error-500.jpg',
            'http://localhost/groovy/dist/images/error-404.jpg',
        ]
    };

    metaData = [this.shortStrings, this.longStrings, this.images];

    getMetadata(type) {
        //get the right metadata for this type
        let metaValues = this.metaData.filter((item: any) => {
            let types: Array<Object> = item.types;
            return types.indexOf(type) > -1;
        }).map((val: any) => {
            console.log(val);
            return val.values;
        })[0];

        if (metaValues.length > 0) {
            let random = (Math.random() * metaValues.length);
            return metaValues[Math.floor(random)];
        }
    }

    getRandomData(type) {
        console.log(type);
        switch (type) {
            case 'string':
                console.log(faker.lorem.sentence());
                break;
            case 'avatar':
                console.log(faker.image.avatar());
                break;
        }
    }
}