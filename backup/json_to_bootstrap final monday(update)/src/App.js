import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';







class App extends Component {
  
  state = {
    columnheader:[],
    products: [],  
    productoutput: [],  
    columns: []
  } 
  

  componentDidMount() {
    axios.get('http://localhost:4000/results')
      .then(response => {
        this.setState({
          products: response.data
  

        });
        
        this.testFunction(this.state.products);

  
 
      });
  }

  testFunction(products)
  {
  const  productoutput2=[]
  var columnHeaderList=[]; 

  columnHeaderList.push("Count");

  products.map((p) => {
   
    const singlerow = {};
    singlerow["Count"] = "";
   
    Object.keys(p).map((keyheader) => {
    

      //+7
      singlerow[keyheader]=p[keyheader];

      if (!columnHeaderList.includes(keyheader))
      {
        columnHeaderList.push(keyheader);
      }
      
    
    
     });











productoutput2.push(singlerow);



   });



  var groupedresult = [];
  //var newcolumn = [];

  
    productoutput2.forEach(function (a) {
   
        if ( !this[a.label] && !this[a.productName] && !this[a.unit_price] && !this[a.unit_cost] ) {
            this[a.label] = { label: a.label, productName: a.productName, unit_price: a.unit_price, unit_cost: a.unit_cost ,quantity: 0 };
            groupedresult.push(this[a.label]);     
        }     
        this[a.label].quantity += Number(a.quantity);
        //newcolumn.push(this);

    }, Object.create(null));


    var newlist = [];

    groupedresult.map((b) => {
    var i = 0;

      productoutput2.map((c) => {

    
        if (b.label === c.label && b.productName === c.productName && b.unit_price === c.unit_price &&  b.unit_cost === c.unit_cost)
        {
          i += 1;
          newlist.push(c);
        }
        
     
  
  });

    b.Count="Total - " + i; 
    newlist.push(b);


    
    });

    
   
      
      
  
  



    //console.log(groupedresult);


   
//    var groups = ['label', 'productName', 'unit_price' , 'unit_cost'],
//     grouped = {};
   
//     productoutput2.forEach(function (a) {
//     groups.reduce(function (o, g, i) {                            // take existing object,
//         o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
//         return o[a[g]];                                           // at last, then an array
//     }, grouped).push(a);
// });

// console.log(grouped);

//    var cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],
//    result = cars.reduce(function (r, a) {
//        r[a.year] = r[a.year] || [];
//        r[a.year].push(a);
//        return r;
//    }, Object.create(null));
//  console.log(result);


// var people = [{ name: 'Pete', gender: 'Male', age: 22 }, { name: 'Samantha', gender: 'Female', age: 20 }, { name: 'Frank', gender: 'Male', age: 22 }, { name: 'Gary', gender: 'Male', age: 21 }, { name: 'Maria', gender: 'Female', age: 20 }, { name: 'Hannah', gender: 'Female', age: 21 }, { name: 'Pete', gender: 'Male', age: 20 }],
//     groups = ['gender', 'age'],
//     grouped = {};
//     document.write('<pre>' + JSON.stringify(people, 0, 4) + '</pre>');
// people.forEach(function (a) {
//     groups.reduce(function (o, g, i) {                            // take existing object,
//         o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
//         return o[a[g]];                                           // at last, then an array
//     }, grouped).push(a);
// });

// document.write('<pre>' + JSON.stringify(grouped, 0, 4) + '</pre>');





this.setState({
  productoutput: newlist,
  columnheader: columnHeaderList

});




  }
  

  
  generateHeader(){

  let res=[];
  var columnHeard2 =  this.state.columnheader;
  for(var i =0; i < columnHeard2.length; i++){

      res.push(<th key={columnHeard2[i]}>{columnHeard2[i]}</th>)
  }

  return res;
}


generateTableData(){


  let res=[];
 
  var data =  this.state.productoutput;
  var columnHeard2=  this.state.columnheader;


  data.map((c) => {

  res.push(<tr>
   {columnHeard2.map((Header)=> <td>{ !!(c[Header])?c[Header] : "" } </td> ) }   
  </tr>); 

})
 // !! null or empty value is there or not  
 // ? condition check true or false
 
 
return res;
}






  render() {

  
    return (

  <div> <table className="table  table-hover">
  <thead>
      <tr>

      {this.generateHeader()}
    
      </tr>
  </thead>
  <tbody>

  {this.generateTableData()}

  </tbody>
  </table>
</div>


    );
    
  }
}

export default App;
