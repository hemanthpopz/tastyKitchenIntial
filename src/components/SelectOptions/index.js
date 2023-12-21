import {Component} from 'react'

import OptionItem from '../OptionItem'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Sort by Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Sort by Lowest',
    value: 'Lowest',
  },
]

class SelectOptions extends Component {
  render() {
    const {onChangeSortValue, sortValue} = this.props

    const onChangeValue = event => {
      onChangeSortValue(event.target.value)
    }
    return (
      <select value={sortValue} onChange={onChangeValue}>
        {sortByOptions.map(eachOption => (
          <OptionItem eachOption={eachOption} />
        ))}
      </select>
    )
  }
}

export default SelectOptions
