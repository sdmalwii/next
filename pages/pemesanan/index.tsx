import axios from 'axios';
import { useState,useEffect } from "react";
import { stat } from "fs";
import Link from 'next/link';

// const client = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com/posts"
// });

const koneksiPemesanan = axios.create({
   baseURL: "http://127.0.0.1:5000/api/Pemesanan"
 }); 

export default function FormPemesanan() {
    const [pemesanan, setPemesanan] =  useState(null);
    const [no_pemesanan, setNo_pemesanan] = useState("");
    const [nama_pembeli, setNama_pembeli] = useState("");
    const [alamat, setAlamat] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");

  const handleSubmitAdd =  (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiPemesanan
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });    
 }

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = "/"+event.target.no_pemesanan.value;
      alert(address);
  //const formData = new FormData(event.target);
    const formData = {
      no_pemesanan: event.target.no_pemesanan.value,
      nama_pembeli: event.target.nama_pembeli.value,
      alamat: event.target.alamat.value
      }

  alert(formData);
  koneksiPemesanan
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

    const handleAdd = (event) => {
      setAdd("show");
      setbtnAdd("hide");
      setEdit("hide");   
}

    const handleCancelAdd = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
}

    const handleCancelEdit = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
      setNo_pemesanan("");
      setNama_pembeli("");
      setAlamat("");
}

    const handleDelete = (event) => {
      event.preventDefault();
      var no_pemesanan = event.target.value;
      koneksiPemesanan.delete(`/${no_pemesanan}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
          setPemesanan(
            pemesanan.filter((pemesanan) => {
               return pemesanan.no_pemesanan !== no_pemesanan;
            }))
       
          // Lakukan langkah-langkah lain setelah penghapusan data
        })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
    })
  }

      const handleEdit = (event) => {
        event.preventDefault();
        var no_pemesanan = event.target.value;
 
              const pmEdit =  pemesanan.filter((pemesanan) => {
                   return pemesanan.no_pemesanan == no_pemesanan;
        });
                    if(pmEdit!=null){
                      setNo_pemesanan(pmEdit[0].no_pemesanan);
                      setNama_pembeli(pmEdit[0].nama_pembeli);
                      setAlamat(pmEdit[0].alamat);
                      setAdd("hide");
                      setbtnAdd("hide");
                      setEdit("show");
          }
        }

    useEffect(() => {
      async function getPemesanan() {
        const response = await koneksiPemesanan.get("/").then(function (axiosResponse) {
            setPemesanan(axiosResponse.data.data);
         })
         .catch(function (error) {
         
          alert('error from parfum in api parfum: '+error);
         });;
          }
      getPemesanan();
    }, []);

  if(!pemesanan) {
    return (

      <div><center><h1>Tunggu yaa</h1></center></div>

    )
  }

  else{
    return (
      

      <center>
      <div className="button-pemesanan">
      <button className="back-pemesanan"><Link href="/">Kembali</Link></button>

      </div>
      <h1 style={{fontFamily: "Comic Sans MS",
                color:"black", 
                }}>Al-Alwi Perfume</h1>
      <p><i>Jl. Matraman No.6</i></p><br></br>

      <div>
      <title>Sadham Alwie_21570006</title>
      <button id="btnadd" onClick={handleAdd} className={statebutonadd} 
              style={{backgroundColor: "#32a877",
                      color:"white",
                      borderWidth:"1px",
                      padding:"13px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Tambah</button>

{/* Buat form Pembelian */}
       <form id="formadd-pemesanan" className={stateadd} onSubmit={handleSubmitAdd}><br></br>
       <h2 style={{color:"white"}}>Form Pemesanan</h2><br></br>

        <table border={0}>
            <tbody style={{color:"white",padding:"3px"}}>
        
        <tr>
            <td><label> Nomor Pemesanan : </label></td>
            <td><input type="text" id="no_pemesanan" name="no_pemesanan"/></td>
        </tr> 

        <tr>
            <td><label> Nama Pembeli : </label></td>
            <td><input type="text" id="nama_pembeli" name="nama_pembeli"/></td>
        </tr> 

        <tr>
            <td><label> Alamat Lengkap : </label></td>
            <td><textarea id="alamat" style={{resize:"none"}} name="alamat"></textarea></td>
        </tr> 
        
        <br ></br>

            </tbody>
        </table>

{/* buat tombol submit yang ada di form pembelian*/}
          <input type="submit"  
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                        }}/>

|

{/* buat tombol cancel yang ada di form pembelian*/}
          <input type="button" value="cancel" onClick={handleCancelAdd} 
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form>  
      
 
{/* Buat form Edit */}
<form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}><br></br>
          <h2 style={{color:"white"}}>Form Edit</h2><br></br>

        <table>
              <tbody style={{color:"white"}}>
        <tr>
            <td><label> Nomor Pemesanan : </label></td>
            <td><input type="text" id="no_pemesanan"  value={no_pemesanan} name="no_pemesanan"/></td>
        </tr>

        <tr>
            <td><label> Nama Pembeli : </label></td>
            <td><input type="text" id="nama_pembeli"  value={nama_pembeli} name="nama_pembeli"
               onChange={(e) => setNama_pembeli(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Alamat Lengkap : </label></td>
            {/* <td><input type="text" id="alamat"  value={alamat} name="alamat"
               onChange={(e) => setAlamat(e.target.value)}/></td> */}
            <td><textarea  id="alamat" style={{resize: "none"}} value={alamat} name="alamat" 
            onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
        
        <br ></br>

              </tbody>
          </table>

{/* buat tombol submit yang ada di form Edit*/}
          <input type="submit" 
                style={{padding:"3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                        }}/>

|

{/* buat tombol cancel yang ada di form Edit*/}
          <input type="button" value="cancel" onClick={handleCancelEdit}  
                style={{padding: "3px",
                        color:"white",
                        backgroundColor:"black",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form><br/><br/>
      
        <h3 style={{fontFamily:"times" }}>Tabel List Pemesanan</h3>
          
          <table className='dekorasi-pemesanan'>
              <thead>
                <tr>         
                <th>Nomor Pemesanan</th>
                <th>Nama Pembeli</th>
                <th>Alamat Lengkap</th>
                <th colSpan={2}>Opsi</th>
                </tr>
              </thead>
      
              <tbody>
              {pemesanan.map((pm) =>
                  <tr style={{textAlign:'center'}}> 
                    <td>{pm.no_pemesanan}</td>
                    <td>{pm.nama_pembeli}</td>
                    <td>{pm.alamat}</td>

{/* buat tombol edit */}
          <td><button onClick={handleEdit} value={pm.no_pemesanan} 
              style={{backgroundColor: "#e2e83f",
                      color:"white",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Edit</button></td>

{/* buat tombol hapus */}
          <td><button onClick={handleDelete} value={pm.no_pemesanan}
              style={{backgroundColor: "#ed3e3e",
                      color:"white",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Hapus</button></td>

                  </tr>
              )}
              </tbody>
    </table>
    </div>
    </center>     
            
    )
  }
  }