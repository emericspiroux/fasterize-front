import {Canceler} from 'axios'

/** 
 * Permit to receive a canceler for an Axios request. Useful when user change page and request not ended.
*/
interface IApiCanceler {
  (canceler:Canceler):void
}

export default IApiCanceler