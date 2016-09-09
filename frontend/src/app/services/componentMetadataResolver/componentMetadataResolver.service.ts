import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as faker from 'faker';

import { customMetadataToCode, codeToCustomMetadata, propsToVariation, addDataToVariation, variationsToProps } from './../../utils/index.ts';
import { fakerDataGenerator } from './../index.ts';

@Injectable()
export class ComponentMetadataResolver {

    constructor(
        public http: Http,
        public fakersevice: fakerDataGenerator
    ) { }

    getMetadata(type) {
        return this.fakersevice.getFakerData(type);
    }

    /**
     * Save the component custom metadata
     */
    saveCustomMetaData(host, port, componentPath, data, cb) {
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
                cb(response);
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
                    if (customMetadata.err || typeof customMetadata.metadata == 'undefined') {
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
        );
    }

    /**
     * Save a component variation
     * 
     * @param {string} host 
     * The host where the server is set
     * 
     * @param {string} port
     * the port where the server is running
     * 
     * @param {string} slug
     * the slug for the variation
     * 
     * @param {Object} props
     * The custom metadata inputs for the component
     * 
     * @param {string} componentPath
     * The component path
     * 
     * @param {function} cb
     * Callback to run after the http request was sent
     */
    saveVariation(host, port, name, slug, inputData, componentPath, cb) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let post_options = new RequestOptions({ headers: headers });

        const data = this.getVariationStringFromProps({
            props: this.getRandomValues(Object.assign({},inputData)),
            name,
        });
        let body = JSON.stringify({
            variation: `${slug}`,
            code: data,
        });

        this.http.post(
            `http://${host}:${port}/variations/${componentPath}`,
            body,
            post_options)
            .subscribe(
            response => {
                cb(response);
            },
            err => console.error(err),
            () => console.log('')
            );
    }

    /**
     * Get all variations of a given component
     * 
     * @param {string} host 
     * The host where the server is set
     * 
     * @param {string} port
     * the port where the server is running
     * 
     * @param {string} componentPath
     * The component path
     * 
     * @param {function} cb
     * Callback to run after the http request was sent
     * 
     */
    getVariations(host, port, componentPath, cb) {
        this.http.get(`http://${host}:${port}/variations/${componentPath}`).subscribe(
            (response: any) => {
                if (response.status == 200) {
                    const json = JSON.parse(response['_body']).data;
                    const variationPropsList = variationsToProps(json);
                    cb(variationPropsList);
                }
                else {
                    cb(false);
                }
            },
            (err) => {
                console.log(err);
            },
            () => { }
        );
    }

    getRandomValues(props) {
        //Call faker
        Object.keys(props).forEach(key => {
            // This has to be dynamic for every input
            props[key] = this.getMetadata(props[key]);
        });

        return props;
    }

    /**
     * Get the variation string from the props received
     */
    getVariationStringFromProps(data) {
        const {
            props,
            name,
        } = data;
        // Generate a human-readable JSON string from the props
        const propsString = propsToVariation(props);
        // Add the name to the data we save
        return addDataToVariation(propsString, { name });
    };

}