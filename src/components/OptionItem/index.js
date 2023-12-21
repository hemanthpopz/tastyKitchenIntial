import {Component} from 'react'

class OptionItem extends Component {
  render() {
    const {eachOption} = this.props

    return <option value={eachOption.value}>{eachOption.displayText}</option>
  }
}

export default OptionItem
