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
    axios.get('http://localhost:5000/results')
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



  // var groupedresult = [];
  // //var newcolumn = [];

  
  //  productoutput2.forEach(function (a) {
   
  //       if ( !this[a.label] && !this[a.productName] && !this[a.unit_price] && !this[a.unit_cost] ) {
  //           this[a.label] = { label: a.label, productName: a.productName, unit_price: a.unit_price, unit_cost: a.unit_cost ,quantity: 0 };
  //           groupedresult.push(this[a.label]);     
  //       }     
  //       this[a.label].quantity += Number(a.quantity);
  //       //newcolumn.push(this);

  //   }, Object.create(null));

    
  var groupedresult = [];
  

  function groupbykeys(arr, groupKeys, sumKeys){
    var  hash = Object.create(null);
 
      arr.forEach(function (o) {
       var key = groupKeys.map(function (k) { return o[k]; }).join('|');
         if (!hash[key]) {
           hash[key] = Object.keys(o).reduce((result, key)=> {
            result[key]=o[key]; 
            if(sumKeys.includes(key))
               result[key]=0;
            return result;
          }, { }); //map_(o) //{ shape: o.shape, color: o.color, used: 0, instances: 0 };
           groupedresult.push(hash[key]);
       }
       sumKeys.forEach(function (k) { hash[key][k] += Number(o[k]); });
   });
     
     }
   
  
groupbykeys(productoutput2,['label','productName' ,'unit_price' , 'unit_cost'],['quantity']);
    
  
  













  

    var newlist = [];

    groupedresult.map((b) => {
    var i = 0;

      productoutput2.map((c) => {

    
        if (b.label === c.label && b.productName === c.productName && b.unit_price === c.unit_price &&  b.unit_cost === c.unit_cost)
        {
          i += 1;
          //newlist.push(c);
          
        }
        
       
      
  
  });

    b.Count="Total - " + i; 
    newlist.push(b);


    
    });

    
function compareObjects(object1, object2, key) {
  const obj1 = object1[key].toUpperCase()
  const obj2 = object2[key].toUpperCase()

  if (obj1 > obj2) {
    return -1
  }
  if (obj1 < obj2) {
    return 1
  }
  return 0
}

newlist.sort((book1, book2) => {
  return compareObjects(book1, book2, 'Count')
})
   
      
      
  
  



    





this.setState({
  productoutput: newlist,
  columnheader: columnHeaderList,
  
  


});



  }
  // sortBylabelDesc() {
  //   this.setState(prevState => {
  //     this.state.orderlist.sort((a, b) => (b.label - a.label))
  // });
  // }
   
  
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
