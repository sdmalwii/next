import Link from "next/link";

export default function Home() {
  return(
    
    <div className="container-home">
      
      <div className="topnav">
          <a href="/pemesanan">List Pemesanan</a>
          <a href="/pembeli">List Pembeli</a>
          <a href="/about">About Perfume</a>
        <p>Al-Alwi Perfume</p>
      </div>
      
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
     <h2 style={{color:"white",textAlign:"right", fontFamily:"Brush Script MT", paddingRight:"13%", fontSize:"40px" }}>
     "Fall, Stand, Learn, Adapt."</h2>
    
 <br />

      <p style={{color:"white",textAlign:"justify",fontFamily:"times",paddingLeft:"50%", paddingRight:"2%", fontSize:"17px"  }}>
      Parfum memiliki banyak manfaat terutama dalam hal aromaterapi, melepaskan stres, dan memberikan efek relaksasi. 
      Banyak wewangian tertentu yang biasa dimanfaatkan untuk kesehatan tubuh, Parfum ,selain melepas stress bisa juga 
      meningkatkan kepercayaan diri, juga bisa menguatkan ingatan dan menimbulkan perasaan bahagia bagi pemakai.</p>

    </div>

  )
}

