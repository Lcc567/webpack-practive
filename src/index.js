import './style.less';
import printMe from './print';
import { cube } from './math';

function component() {
    let element = document.createElement('pre')
    element.innerHTML = [
        'hello webpack',
        '5 cubed os equal to ' + cube(5)
    ].join('\n\n')
    return element
}

let element = component()
document.body.appendChild(element)

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('accept the update printMe module')
//         document.body.removeChild(element)
//         element = component()
//         document.body.appendChild(element)
//     })
// }
