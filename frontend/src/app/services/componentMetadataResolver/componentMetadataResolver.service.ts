import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as faker from 'faker';

import { customMetadataToCode, codeToCustomMetadata } from './../../utils/index.ts';
import { fakerDataGenerator } from './../index.ts';

@Injectable()
export class ComponentMetadataResolver {

    constructor(
        public http: Http,
        @Inject(fakerDataGenerator) public fakersevice: fakerDataGenerator
    ) { }

    getMetadata(type) {
        return this.fakersevice.getFakerData(type);
    }

    /**
     * Save the component custom metadata
     */
    saveCustomMetaData(host, port, componentPath, data) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let post_options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            code: customMetadataToCode(data),
        });

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

    /**
     * Get the component metadata info
     */
    getCustomMetadata(host, port, componentPath, cb) {
        this.http.get(`http://${host}:${port}/components/${componentPath}`).subscribe(
            (response: any) => {
                if (response.status == 200) {
                    let data = JSON.parse(response['_body']);
                    const customMetadata: any = codeToCustomMetadata(data.data);
                    if (customMetadata.err) {
                        cb(false);
                    }
                    else {
                        cb(customMetadata);
                    }
                }
                else {
                    cb(false);
                }
            },
            (err) => {
                console.log(err)
            },
            () => { }
        );;
    }
}