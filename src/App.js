import React,{useState} from 'react';
import './App.css';
const App=()=>{
  const[search,setSearch]=useState('');
  const [data,setData]=useState([]);
  const submitHandler=e=>{
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
response=>response.json()

    ).then(value=>setData(value.Search))
  }
  const downlaod=url=>{
    fetch(url).then(response=>{
      response.arrayBuffer().then(function(buffer){
        const url=window.URL.createObjectURL(new Blob([buffer]));
        const link=document.createElement("a");
        link.href=url;
        link.setAttribute("download","image.png");
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch(err=>{
      console.log(err);
    });
  };
return(
  <div>
    <center>
    <h1 className="headin">Search Your Favourite Movie</h1>
    <form onSubmit={submitHandler}>
      <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}className="inpu"/><br/> 
      <input type="submit" value="Search"/>
    </form>
    <div className="row grid-3">
    {data.map(movie=>
    <div className="col-md-4 nam" style={{border:"1px solid black",margin:"auto",width:"30%",margin:"2%"}}>
       <div class="card" style={{ width: '18rem' }}>
       <img src={movie.Poster} alt={movie.Title} class="card-img-top" />
       <div class="card-body">
        <h4 className="card-Title">{movie.Title}</h4>
        <a href="" className="btn btn-primary" variant="primary"onClick={()=>downlaod(movie.Poster)}>Download Poster</a>
       </div>
     </div>
     </div>
      )}
  </div>

    </center>
  </div>
)
}
export default App;