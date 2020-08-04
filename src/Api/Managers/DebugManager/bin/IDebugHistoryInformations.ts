
/**
 * API Response interface for api route : /
 * Used to fill `IDebugHistoryElement.details` attribute. 
 * */ 

interface IDebugHistoryInformations {
  plugged: boolean,
  statusCode: number,
  fstrzFlags?: string[],
  cloudfrontStatus?: string,
  cloudfrontPOP?: string
}

export default IDebugHistoryInformations