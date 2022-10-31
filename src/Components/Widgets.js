import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";
const Widgets = ()=>{

    const[term,setTerm] = useState('');
    const[search ,setSearchterm] = useState([]);

    
    useEffect(()=>{

        const search =async()=>{

            
            const {data} = await axios.get("https://en.wikipedia.org/w/api.php",{
            
            params: {
                action:'query',
                list :'search',
                origin:'*',
                format :'json',
                srsearch:term,
            }
        });    
        
            setSearchterm(data.query.search);
        
        }
        if(term && !search.length){
            search();
        }
        else{
        
        const venkat = setTimeout(()=>{
            if(term){
                search();
                }
        },500)

        return()=>{
        clearTimeout(venkat);
    }
} 
}, [term
]);


    const renderresults= search.map((items)=> {
        return(

                <div key={items.pageid} className="item">
                        <div className="right floated content">
                            <a
                                className="ui button"
                                href={`https://en.wikipedia.org?curid=${items.pageid}`}
                            >See more!</a>

                        </div>
                <div className="content">
                <div className="header"></div>
                    {items.title}
                </div>
                    <span dangerouslySetInnerHTML={{__html : items.snippet}}></span>
                </div>

  );
 }
);
    
    return(
    <div>
          <div className = "ui text container">
            <div className = "ui form">
                <label className="ui container"> Enter the search:</label>
                
                <input 
                 
                type = "text" 
                placeholder="search"
                onChange={(e)=>setTerm(e.target.value)}
                value = {term}
                />

                
                

            </div>
            
            </div>
            <div className="ui celled list">{renderresults}</div>
        </div>



    );


}
export default Widgets;