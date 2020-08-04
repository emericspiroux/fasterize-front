import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import packageJSON from '../../package.json';
import CustomRedux from '../Redux'
import {Store} from 'redux'
import MethodEnum from './bin/MethodEnum';
import ApiCanceler from './bin/ApiCanceler';

class ApiManager {
    // baseUrl of the API
    static baseUrl:string = packageJSON.apiUrl
    // Singleton use to always have an ApiManager access with store loaded
    static shared:ApiManager;
    // Redux store to notify application about internet connection availability
    store:Store

    /**
     * Contructor
     * @param store Redux Store
     */
    constructor(store:Store){
        this.store = store
    }

    /**
     * Permit to specify server availability
     * @param isDown true if Api is down
     */
    setServerDown(isDown:boolean) {
        if (this.store) {
            CustomRedux.actions.api.setIsDown(this.store.dispatch, isDown)
            CustomRedux.actions.popup.addMessage(this.store.dispatch, "Oooops ! Server is down.")
        }
    }
    
    /**
     * Permit to specify internet availability
     * @param isTimeout true if internet connection is down
     */
    setServerTimeout(isTimeout:boolean) {
        if (this.store) {
            CustomRedux.actions.api.setIsTimeout(this.store.dispatch, isTimeout)
            CustomRedux.actions.popup.addMessage(this.store.dispatch, "No internet connection. Please check your internet connection and retry.")
        }
    }

    // redux dispatch getter 
    get dispatch() {
        return this.store.dispatch
    }

    /**
     * Check if the api is down or if it's the internet connection
     */
    static checkIfIsDown() {
        axios.get('https://api.github.com').then(() => {
            return ApiManager.shared.setServerDown(true)
        }).catch(() => {
            return ApiManager.shared.setServerTimeout(true)
        })
    }

    /**
     * Permit to request something to Api
     * @param method `MethodEnum` enumerator who describe HTTP method.
     * @param url Route path on `BaseUrl`. exemple : "/myroute?param1=toto"
     * @param cancelService `ApiCanceler` is a callback who returning a function to cancel current request
     */
    static requester<T>(method:MethodEnum, url:string, cancelService:ApiCanceler):Promise<AxiosResponse<T>>{
        return new Promise(async (success, fail) => {
            var config:AxiosRequestConfig = {
                baseURL: ApiManager.baseUrl,
                url,
                method
            };

            if (cancelService)
                config.cancelToken = new axios.CancelToken((cancelAction:Canceler) => {
                    cancelService(cancelAction)
                })

            try {
                let res = await axios(config)
                success(res)
            } catch (err) {
                console.error(`Error on request ${url} :`, err)
                if (err && !err.response && !err.status)
                    ApiManager.checkIfIsDown()
                else
                    fail(err.response.data)    
                fail(err)
            }
        })
    }
}

export default ApiManager
