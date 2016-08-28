import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { metadataTypes } from './metaTypes.ts';
import * as faker from 'faker';
import * as axios from 'axios';

@Injectable()
export class ComponentMetadataResolver {

    constructor(private http: Http) {

    }

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

    /**
     * Save the component custom metadata
     */
    saveCustomMetaData(host, port, componentPath, data) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let post_options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);

        this.http.post(
            `http://${host}:${port}/components/${componentPath}`,
            body,
            post_options)
            .subscribe(
            response => {
                console.log(response);
            },
            err => console.error(err),
            () => console.log('')
            );
    }
}