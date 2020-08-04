import IDebugHistoryInformations from "../../Api/Managers/DebugManager/bin/IDebugHistoryInformations";

/**
 * Description of the IDebugHistoryElement. Displayed inside `DebugHistoryCell`
 * `IDebugHistoryElement.details` is `IDebugHistoryInformations` typed to match with API response.
 */
interface IDebugHistoryElement {
  date: string,
  url: string,
  isLoading: boolean,
  error?: any,
  details?: IDebugHistoryInformations
}

export default IDebugHistoryElement