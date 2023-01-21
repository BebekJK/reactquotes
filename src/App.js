import Axios from "axios";
import { useState } from "react";
import './App.css'


const displayCategory = ["character" , "education" , "family" , "friendship" , "future" , "happiness" , "inspirational" , "love" , "motivational" , "random"];


const getCategory = () => {
  const categoryList = [];

  Axios.get("https://api.quotable.io/tags")
    .then((res) => {    
      res.data.forEach(element => {
        categoryList.push(element.name);
      });
    }).catch((err) => {
      console.log("Error caught!!");
      console.log(err);
    })

    return categoryList;
}
function App(){
  const initialButtonState = [0,0,0,0,0,0,0,0,0,0];

  const initalButtonStyle = {
    border: "1px solid white",
    color: "white",
    borderRadius: "10px",
    margin: "5px 10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#002233",
  }
  const toggledButtonStyle = {
    borderRadius: "10px",
    margin: "5px 10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#002233",
    border: "2px solid cyan",
    color: "cyan",
    boxShadow: "0px 0px 10px 0px white",
  }


  const [quoteCategory , setQuoteCategory] = useState(null);
  const [buttonState , setButtonState] = useState(initialButtonState);
  const [quoteData , setQuoteData] = useState(null); 
  const categoryList = getCategory();
  const displayCategory = ["character" , "education" , "family" , "friendship" , "future" , "happiness" , "inspirational" , "love" , "motivational" , "random"];

  
  const getQuote = (category , index) => {
    setQuoteCategory(category);
    const url = `https://api.quotable.io/${(category === "random")?"random" : "quotes?tags=" + category}`;
    Axios.get(url)
    .then((res)=>{
      setQuoteData((category === "random")? res.data : res.data.results[Math.floor(Math.random() * res.data.count)]);
    }).catch((err) => {
      console.log("Error found");
    });


    const tempState = [...initialButtonState];
    tempState[index] = true;
    setButtonState(tempState);
  }

  const handleMouseEnter = (index) => {
    const tempState = [...buttonState];
    tempState[index] = true;
    setButtonState(tempState);
  }
  
  const handleMouseLeave = (index) => {
    const tempState = [...buttonState];
    tempState[index] = (displayCategory[index]==quoteCategory)? true: false;
    setButtonState(tempState);
  }
  
  return(

    <div className="container">
      <div className="flex-quote-container">
        <div className="quote-container">
          <h1>BEBEKJK QUOTE BANK</h1>
          <p>Hello there... What type of quote do you want?</p>

          <div className="button-container">
          {displayCategory.map((category , index) => {
            return (
              <button 
                onClick={() => getQuote(category , index)}
                className="category-button"
                key={"category-" + index}
                style={buttonState[index]? toggledButtonStyle: initalButtonStyle}
                onMouseEnter={()=>handleMouseEnter(index)}
                onMouseLeave={()=>handleMouseLeave(index)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          })}
          </div>

          {quoteData && (
              <>
                <h3>Here's your <span className="quote-category">{quoteCategory.toUpperCase()}</span> quote: </h3>
                <p className="quote">"{quoteData.content}" - <span className="quote-author">{quoteData.author}</span></p>
              </>
            )
          }
        </div>

        
      </div>
    </div>
  )
}

export default App;