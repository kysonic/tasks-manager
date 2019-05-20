// @flow
import config from '../config';
import type {ResponseType} from '../flow-typed/app.flow';
import mockData from '../data/tasks.json';

const OK_STATUS = 'ok';

const FETCH_DEFAULT_HEADERS = new Headers();
const FETCH_DEFAULT_OPTIONS = {
    method: 'GET',
    headers: FETCH_DEFAULT_HEADERS,
    mode: 'cors',
    cache: 'default'
};

type ApiServiceArgumentsType = {
    baseUrl: string,
    developersName: string
};

class ApiService {
    baseUrl: string;
    developersName: string;

    constructor({baseUrl, developersName}: ApiServiceArgumentsType) {
        this.baseUrl = baseUrl;
        this.developersName = developersName;
    }

    buildFullUrl(path: string = '', query: Object) {
        let queryString = '';
        if (query) {
            for (let prop: string in query) {
                queryString+= `&${prop}=${query[prop]}`
            }
        }
        return `${this.baseUrl}${path}?developer=${this.developersName}${queryString}`;
    }

    delay(data: ResponseType): Promise<ResponseType> {
        return new Promise((resolve) => {
            setTimeout(()=> {
                resolve(data);
            }, 1500 + Math.random() * 1000);
        });
    }

    async get(query: Object = {}): Promise<ResponseType> {
        try {
            const response = await fetch(this.buildFullUrl('', query), FETCH_DEFAULT_OPTIONS);
            const responseJson = await response.json();
            if (responseJson.status !== OK_STATUS) {
                throw new Error(responseJson.message);
            }
            return responseJson;
        } catch (e) {
            return {
                status: 'error',
                message: e.message,
                isError: true
            }
        }
    }

    async post(path: string = '', data: Object = {}): Promise<ResponseType> {
        try {
            const formData = new FormData();
            Object.keys(data).sort().forEach((name: string): void => {
                formData.append(name, data[name]);
            });
            const fetchOptions = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
                method: 'POST',
                body: formData
            });
            const response = await fetch(this.buildFullUrl(path), fetchOptions);
            const responseJson = await response.json();
            if (responseJson.status !== OK_STATUS) {
                throw new Error(responseJson.message);
            }
            return responseJson;
        } catch (e) {
            return {
                status: 'error',
                message: e.message,
                isError: true
            }
        }
    }

    async mockGet(): Promise<ResponseType> {
        try {
            const data = await this.delay(mockData);
            if (data.status !== OK_STATUS) {
                throw new Error(data.message);
            }
            return data;
        } catch (e) {
            return {
                status: 'error',
                message: e.message,
                isError: true
            }
        }
    }
}

const apiService = new ApiService({...config});

export default apiService;
