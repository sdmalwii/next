import Link from "next/link";

export default function About() {
  return(
        
    <div className="wrapper">
    
    <div className="background-container">
                <div className="bg-1"></div>
                <div className="bg-2"></div>
        
            </div> 
            <div className="about-container">
                
                <div className="image-container"></div>
    
                <div className="text-container">
                    <h1>About Perfume</h1>
                    <p>Saat kita mencium wangi parfum, otak kita akan bekerja memutuskan apakah ini jenis wangi yang 
                      menyenangkan atau tidak. Kita akan melewati proses emosi yang kita rasakan saat mencium sebuah aroma terbentuk dari 
                      pengalaman kita semasa kecil. Ketika kita lahir, kita gak akan langsung suka dan gak suka pada aroma tertentu. Tapi, 
                      seiring bertambah usia dan melalui berbagai macam pengalaman, dengan sendirinya kita akan menumbuhkan perasaan suka 
                      terhadap berbagai aroma, dan dari sinilah kita belajar menemukan aroma yang paling membuat kita bahagia dan berbeda. </p>
                    <a href="/">Kembali</a></div>
                
            </div> 
        </div>
)
}