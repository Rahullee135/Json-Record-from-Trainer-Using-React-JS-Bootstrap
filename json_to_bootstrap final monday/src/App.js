import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
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


  products.map((p) => {
   
    const singlerow = {};
    Object.keys(p).map((keyheader) => {
    
    if(keyheader != "location")
    {
      //+7
      singlerow[keyheader]=p[keyheader];

      if (!columnHeaderList.includes(keyheader))
      {
        columnHeaderList.push(keyheader);
      }
      
    }
    
     });


const myarr = p.location.split(",");



var keyarray=[];
var valuearray=[];

const listItems = myarr.map((number) => {

const hyphen = number.split("-");

keyarray.push(hyphen[0]);
valuearray.push(hyphen[1]);


}

); 






const concatArr = (key1, value1) => key1.map(function (key, value) {
 
  //+3
  singlerow[key]=(value1[value]).toString();

  if (!columnHeaderList.includes(key))
  {
    columnHeaderList.push(key);
  }
  


});

concatArr(keyarray,valuearray);


productoutput2.push(singlerow);



   });
   


this.setState({
  productoutput: productoutput2,
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
   {columnHeard2.map((Header)=> <td>{ !!(c[Header])?c[Header] : "Nil" } </td> ) }   
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
