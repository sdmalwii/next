import '@/styles/globals.css'
import '@/styles/form.css'
import type { AppProps } from 'next/app'
import { ReactDOM } from 'react';


export default function MyApp({Component,pageProps}) {
  return <Component {...pageProps}/>
  }

  
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// 1). Your first component 

// function Profile() {
//     return (
//       <img
//         src="https://i.imgur.com/MK3eW3As.jpg"
//         alt="Katherine Johnson"
//       />
//     );
//   }
  
//   export default function Gallery() {
//     return (
//       <section>
//         <h1>Amazing scientists</h1>
//         <Profile />
//         <Profile />
//         <Profile />
//       </section>
//     );
//   }

// 2). Importing and exporting components 
// import Profile from './profile';

//  export default function Gallery() {
//   return (
//     <section>
//       <h1>Amazing scientists</h1>
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//       <Profile />
//     </section>
//   );
// }

// 3). Writing markup with JSX

// export default function TodoList() {
//   return (
//     <>
//     // This doesn't quite work!
//     <h1>Hedy Lamarr's Todos</h1>
//       <img
//         src="https://i.imgur.com/yXOvdOSs.jpg"
//         alt="Hedy Lamarr"
//         className="photo"
//       />
//       <ul>
//         <li>Invent new traffic lights</li>
//         <li>Rehearse a movie scene</li>
//         <li>Improve spectrum technology</li>
//       </ul>
//     </>
//   );
// }

// 4). JavaScript in JSX with curly braces

// const person = {
//   name: 'Gregorio Y. Zara',
//   theme: {
//     backgroundColor: 'black',
//     color: 'pink'
//   }
// };

// export default function TodoList() {
//   return (
//     <div style={person.theme}>
//       <h1>{person.name}'s Todos</h1>
//       <img
//         className="avatar"
//         src="https://i.imgur.com/7vQD0fPs.jpg"
//         alt="Gregorio Y. Zara"
//       />
//       <ul>
//         <li>Improve the videophone</li>
//         <li>Prepare aeronautics lectures</li>
//         <li>Work on the alcohol-fuelled engine</li>
//       </ul>
//     </div>
//   );
// }

// 5). Passing props to a component
 
// import { getImageUrl } from './utils'
// export default function Profile() {
//   return (
//     <Card>
//       <Avatar
//         size={100}
//         person={{
//           name: 'Katsuko Saruhashi',
//           imageId: 'YfeOqp2'
//         }}
//       />
//     </Card>
//   );
// }

// function Avatar({ person, size }) {
//   return (
//     <img
//       className="avatar"
//       src={getImageUrl(person)}
//       alt={person.name}
//       width={size}
//       height={size}
//     />
//   );
// }

// function Card({ children }) {
//   return (
//     <div className="card">
//       {children}
//     </div>
//   );
// }

// 6). Conditional rendering 
// function Item({ name, isPacked }) {
//     return (
//       <li className="item">
//         {name} {isPacked && '✔'}
//       </li>
//     );
//   }
  
//   export default function PackingList() {
//     return (
//       <section>
//         <h1>Sally Ride's Packing List</h1>
//         <ul>
//           <Item
//             isPacked={true}
//             name="Space suit"
//           />
//           <Item
//             isPacked={true}
//             name="Helmet with a golden leaf"
//           />
//           <Item
//             isPacked={false}
//             name="Photo of Tam"
//           />
//         </ul>
//       </section>
//     );
//   }
  

// 7).  Rendering lists 
// import { people } from './data';
// import { getImageUrl } from './utils';

// export default function List() {
//   const listItems = people.map(person =>
//     <li key={person.id}>
//       <img
//         src={getImageUrl(person)}
//         alt={person.name}
//       />
//       <p>
//         <b>{person.name}:</b>
//         {' ' + person.profession + ' '}
//         known for {person.accomplishment}
//       </p>
//     </li>
//   );
//   return (
//     <article>
//       <h1>Scientists</h1>
//       <ul>{listItems}</ul>
//     </article>
//   );
// }

// 8). Keeping components pure
// let guest = 0;

// function Cup() {
//   // Bad: changing a preexisting variable!
//   guest = guest + 1;
//   return <h2>Tea cup for guest #{guest}</h2>;
// }

// export default function TeaSet() {
//   return (
//     <>
//       <Cup />
//       <Cup />
//       <Cup />
//     </>
//   );
// }
