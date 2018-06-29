// const countryList = Object.keys(data.countries);
// console.log(countryList);
// const systems = [];

// trying to parse the long and unpredictable strings of the government_type to make it more uniform for the government system model
// democracy, parliamentary

// try {
//   for (let i = 0; i < countryList.length; i++) {
//     if (data.countries[countryList[i]].data.government.government_type) {
//       systems.push(data.countries[countryList[i]].data.government.government_type);
//     }
//   }
// const democracies = systems.filter(country => country.includes('democracy')).map((x) => {
//   const split = x.split(' ');
//   return split;
// }).map((y) => {
//   let index = 0;
//   y.forEach((z, i) => {
//     if (z.includes('democracy')) {
//       index = i + 1;
//       return index;
//     }  
//   }, 0);
//   return y.slice(0, index).join(' ');
// });
// console.log(democracies);

// const dictatorships = systems.filter(country => country.includes('dictatorship')).map((x) => {
//   const split = x.split(' ');
//   return split;
// }).map((y) => {
//   let index = 0;
//   y.forEach((z, i) => {
//     if (z.includes('dictatorship')) {
//       index = i + 1;
//       return index;
//     }
//     return null;  
//   }, 0);
//   return y.slice(0, index).join(' ');
// });

// console.log(dictatorships);

//   const parliamentary = systems.filter(country => country.includes('parliamentary')).map((x) => {
//     const split = x.split(' ');
//     return split;
//   }).map((y) => {
//     let index = 0;
//     y.forEach((z, i) => {
//       if (z.includes('parliamentary')) {
//         index = i + 2;
//         return index;
//       }
//       return null;  
//     }, 0);
//     return y.slice(0, index).join(' ');
//   });

//   console.log(parliamentary.length);

//   const presidential = systems.filter(country => country.includes('communist')).map((x) => {
//     const split = x.split(' ');
//     return split;
//   }).map((y) => {
//     let index = 0;
//     y.forEach((z, i) => {
//       if (z.includes('communist')) {
//         index = i + 2;
//         return index;
//       }
//       return null;  
//     }, 0);
//     return y.slice(0, index).join(' ');
//   });
//   console.log(presidential);
// } catch (error) {
//   throw new HttpError(400, 'error in for loop');
// }

// parse government type for simpler sorting purposes
// const govSys = governmentInfo.government_type;
// switch (govSys) {
//   case govSys
// }
// let sys;
// if (govSys.indexOf('dictatorship') !== -1 || govSys.includes('single-party state')) {
//   sys = 'dictatorship';
// } else if (govSys.includes('democracy') || govSys.includes('democracy;')) {
//   sys = 'democracy';
// } else if (govSys.indexOf('republic') > -1) {
//   sys = 'republic';
// } else {
//   sys = 'unknown';
// }
