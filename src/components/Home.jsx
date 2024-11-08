import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const Home = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:3000/articles');
              console.log(response.data.data);
              
              setArticles(response.data.data);  
            } catch (err) {
              console.log(err);
            }
          };
          console.log(articles);
          
          fetchData();
      }, []);
    return(
        <>
            <Navbar />
            <div className="flex gap-2">

            {
                articles.map((article, index) => (
                    <div className="p-2 bg-slate-200 rounded-lg min-w-1/4 w-1/4"  key={index}>
                        <p className="text-lg font-semibold">{article.title}</p>
                        <div className="" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}/>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default Home;