// import './style.less';
// import printMe from './print';
// import { cube } from './math';

console.log('process', process.env.NODE_ENV);

function getComponent() {

    // 在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
        var element = document.createElement('div')
        element.innerHTML = _.join(['hello', 'webpack'])
        return element
    }).catch(error => "a error")
}

getComponent().then(component => {
    document.body.appendChild(component)
})
// function component() {
//     let element = document.createElement('pre')
//     element.innerHTML = [
//         'hello webpack',
//         '5 cubed os equal to ' + cube(5)
//     ].join('\n\n')
//     element.addEventListener('click', printMe)
//     return element
// }

// if (process.env.NODE_ENV !== 'production') {
//     console.log('webpack run in development')
// }

// let element = component()
// document.body.appendChild(element)

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('accept the update printMe module')
//         document.body.removeChild(element)
//         element = component()
//         document.body.appendChild(element)
//     })
// }
