import FormCheckEnum from './FormCheckEnum'

/**
 * Form check is a tool to check if a string match with wanted shape
 */
class FormCheck {

  value:string
  type:FormCheckEnum
  regex: RegExp

  /**
   * Constructor
   * @param value The string tested 
   * @param type `FormCheckEnum` type of check
   */
  constructor(value:string, type:FormCheckEnum) {
    this.value = value
    this.type = type
    this.regex = new RegExp("")
  }

  /**
   * True if `FormCheck.value` match with `FormCheckEnum` check type else return false.
   */
  get isValid():Boolean {
    switch(this.type) {
      case FormCheckEnum.url:
          this.regex = /(http(s)?:\/\/)((?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig
          break;
      default:
        return false
    }
    return !!this.value.match(this.regex)
  }
}

export default FormCheck