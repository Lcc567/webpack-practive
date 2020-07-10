import './index.css'
import './style.less'
import avatar from './images/avatar.jpg';
import printMe from 'print'

fetch('/api/user').then(res => res.json()).then(data => {
    console.log('-------', data);
    
})

console.log(printMe, 'printMe');


// let img = new Image()
// img.src = avatar
// document.body.appendChild(img)


// const fn = (name) => {
//     console.log(name);
// }

// fn('lee')
// let a 
// console.log('aaa'.includes('a'), '+++++++++++++');

// @log
// class Person {
//     constructor() {
//         console.log('123');

//     }
//     state = {
//         a: 1
//     }
// }

// function log(target) {
//     console.log('----', target);
// }

// let p = new Person()
// console.log(p.state);
