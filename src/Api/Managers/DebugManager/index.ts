import {AxiosResponse} from 'axios'

import ApiManager from '../../ApiManager'
import IApiCanceler from '../../bin/IApiCanceler';
import MethodEnum from '../../bin/MethodEnum';
import IDebugHistoryInformations from './bin/IDebugHistoryInformations';

/**
 * Class used to call debug route of the API
 */
class DebugManager {
  /**
   * Getting fasterize's informations about the url specified
   * @param url Url who we wnat informations
   * @param canceler Callback who give a request canceler function
   */
  static getInformationsAbout(url:string, canceler:IApiCanceler):Promise<AxiosResponse<IDebugHistoryInformations>>{
    return ApiManager.requester<IDebugHistoryInformations>(MethodEnum.get, `/?url=${encodeURI(url)}`, canceler)
  }
}

export default DebugManager;