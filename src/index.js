import React from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'

ReactDOM.render(<h1>{_.join(['a', 'b', 'c'])}</h1>, window.root)